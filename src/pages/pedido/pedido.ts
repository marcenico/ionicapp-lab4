import { Component } from '@angular/core';
import { NavController, NavParams, DateTime } from 'ionic-angular';
import { Pedidoventa, Pedidoventadetalle, Cliente } from '../../app/shared/sdk';
import { DbControllerProvider } from '../../providers/db-controller.provider';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { StringsRegex } from '../../wrappers/StringsRegex';
import { DatesExtension } from '../../wrappers/DatesExtension';
import { PedidoProvider } from '../../providers/pedido.provider';
import { DetalleProvider } from '../../providers/detalle.provider';
import moment from 'moment';
import { Seq } from '../../wrappers/Seq';
import { Pedidos } from '../../wrappers/Pedidos';

@Component({
  selector: 'page-pedido',
  templateUrl: 'pedido.html'
})
export class PedidoPage {

  form: FormGroup;
  id: string;
  action: string;
  isBigger: boolean = false;

  datesP: String = '';
  datesE: String = '';

  estados = [
    { id: 1, name: "Pendiente" },
    { id: 2, name: "Enviado" },
    { id: 3, name: "Entregado" },
    { id: 4, name: "Anulado" }
  ];

  private detallesParaBorrar: Pedidoventadetalle[] = [];
  private detallesParaActualizar: Pedidoventadetalle[] = [];
  private pedido: Pedidos = new Pedidos();
  private _clientes: Cliente[] = [];
  private _detalles: Pedidoventadetalle[] = [];


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private dbController: DbControllerProvider,
    private detalleProvider: DetalleProvider,
    private pedidoProvider: PedidoProvider,
    private formBuilder: FormBuilder
  ) {
    this.validarFormulario();
  }

  ionViewDidLoad() {
    this._clientes = this.dbController.getClienteLocal();
    this.id = this.navParams.get('id');
    this._detalles = this.navParams.get('detalles');
    this.pedido = this.navParams.get('pedidoForEdit');
    this.detallesParaBorrar = this.navParams.get('detallesParaBorrar');
    this.detallesParaActualizar = this.navParams.get('detallesParaActualizar');
    this.armarPedido();
  }

  armarPedido() {
    if (this.id == '') {
      this.action = "Nuevo Pedido";
      this.pedido.gastosEnvio = 0.0;
      this.pedido.nroPedido = 0;
      this.calcularSubTotalYMontoTotal();
    } else {
      this.action = "Actualizar Pedido";
      this.datesP = new Date(this.pedido.fechaPedido + ' UTC').toISOString();
      this.datesE = new Date(this.pedido.fechaEstimadaEntrega + ' UTC').toISOString();
      this.compararFechas()
      this.calcularSubTotalYMontoTotal();
    }

  }

  private validarFormulario() {
    this.form = this.formBuilder.group({
      nroPedido: new FormControl('', [Validators.required, Validators.pattern(StringsRegex.onlyIntegerNumbers)]),
      fechaDatePedido: new FormControl('', [Validators.required]),
      fechaDateEntrega: new FormControl('', [Validators.required]),
      gastosEnvio: new FormControl('', [Validators.required, Validators.pattern(StringsRegex.noNegative)]),
      estado: new FormControl('', [Validators.required]),
      entregado: new FormControl('', []),
      subTotal: new FormControl({ value: '', disabled: true }, []),
      montoTotal: new FormControl({ value: '', disabled: true }, []),
      cliente: new FormControl('', [Validators.required]),
    })
  }

  calcularSubTotalYMontoTotal() {
    let auxSubTotal = 0;
    for (let i = 0; i < this._detalles.length; i++) {
      auxSubTotal += this._detalles[i].subTotal;
    }
    this.pedido.subTotal = auxSubTotal;
    this.calcularMontoTotal();
  }

  calcularMontoTotal() {
    this.pedido.montoTotal = parseFloat(this.pedido.gastosEnvio.toString()) + parseFloat(this.pedido.subTotal.toString());
  }

  guardar() {
    if (this.id == '') {
      //Creando nuevo pedido
      this.pedidoProvider.createLocal(this.pedido)
        .then(() => {
          console.log("pedido creado");
          this.pedidoProvider.getLastInsertedId()
            .then(lastID => {
              let jsonString = JSON.stringify(lastID);
              let auxSeq = <Seq[]>JSON.parse(jsonString);
              this.pedido.id = auxSeq[0].seq;
              this.dbController.setPedidoLocal(this.pedido);
              this.detalleProvider.createManyLocal(this._detalles, this.pedido.id)
              this.navCtrl.popToRoot();
            })
            .catch(error => { console.log(error) })
        })
        .catch(error => { console.log(error) })
    } else {
      //Actualizando pedido
      this.pedidoProvider.updateLocal(this.pedido)
        .then(() => {
          console.log("pedido actualizado");
          this.pedidoProvider.getAllLocal()
            .then(pedidosLocal => {
              if (pedidosLocal != null && pedidosLocal.length > 0) {
                this.detalleProvider.updateMany(this.detallesParaActualizar)
                this.detalleProvider.deleteLocalMany(this.detallesParaBorrar);
                let jsonString = JSON.stringify(pedidosLocal);
                let auxPedidos = <Pedidos[]>JSON.parse(jsonString);
                this.dbController.setPedidoLocalArray(auxPedidos);
                this.navCtrl.popToRoot();
              }
            })
            .catch(error => { console.log(error); })
        })
        .catch(error => { console.log(error) })
    }
  }

  private compararFechas() {
    let number = DatesExtension.compareDate(this.pedido.fechaPedido, this.pedido.fechaEstimadaEntrega);
    this.isBigger = (number === -1);
  }


  setEntregado() {
    if (this.pedido.estado == "Entregado") {
      this.pedido.entregado = 1;
    } else {
      this.pedido.entregado = 0;
    }
  }

  setCliente(c: Cliente) {
    this.pedido.clienteId = c.id;
    this.pedido.domicilioId = c.domicilioId;
  }

  //#region CONTROL DE LA FECHA DE PEDIDO
  setDateP(date: DateTime, dateE: DateTime) {
    let year: string, month: string, day: string, hours: string, min: string;
    year = date.value.year.toString();
    month = (date.value.month < 10) ? `0${date.value.month}` : `${date.value.month}`;
    day = (date.value.day < 10) ? `0${date.value.day}` : `${date.value.day}`;
    hours = (date.value.hour < 10) ? `0${date.value.hour}` : `${date.value.hour}`;
    min = (date.value.minute < 10) ? `0${date.value.minute}` : `${date.value.minute}`;
    let dateTime = `${year}-${month}-${day}T${hours}:${min}:00`
    this.pedido.fechaPedido = moment(dateTime).toDate();
    dateE.min = dateTime;
    this.compararFechas();
  }
  //#endregion

  //#region CONTROL DE LA FECHA DE ENTREGA
  setDateE(date: DateTime) {
    let year: string, month: string, day: string, hours: string, min: string;
    year = date.value.year.toString();
    month = (date.value.month < 10) ? `0${date.value.month}` : `${date.value.month}`;
    day = (date.value.day < 10) ? `0${date.value.day}` : `${date.value.day}`;
    hours = (date.value.hour < 10) ? `0${date.value.hour}` : `${date.value.hour}`;
    min = (date.value.minute < 10) ? `0${date.value.minute}` : `${date.value.minute}`;
    let dateTime = `${year}-${month}-${day}T${hours}:${min}:00`
    this.pedido.fechaEstimadaEntrega = moment(dateTime).toDate();
    this.compararFechas();
  }
  //#endregion

  //#region MENSAJES DE VALIDACION
  validation_messages = {
    'requiredOnly': [
      { type: 'required', message: '* Este campo es requerido.' }
    ],
    'nroPedido': [
      { type: 'required', message: '* Este campo es requerido.' },
      { type: 'pattern', message: '* Solo numeros enteros' }
    ],
    'gastosEnvio': [
      { type: 'required', message: '* Este campo es requerido.' },
      { type: 'pattern', message: '* Solo numeros' }
    ]
  }
  //#endregion

}


import { Component } from '@angular/core';
import { NavController, NavParams, IonicApp, DateTime } from 'ionic-angular';
import { Pedidoventa, Pedidoventadetalle, Cliente } from '../../app/shared/sdk';
import { DbControllerProvider } from '../../providers/db-controller.provider';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { StringsRegex } from '../../wrappers/StringsRegex';
import { DatesExtension } from '../../wrappers/DatesExtension';
import { PedidoProvider } from '../../providers/pedido.provider';
import { DetalleProvider } from '../../providers/detalle.provider';
import moment from 'moment';
import { HomePage } from '../home/home';
import { last } from 'rxjs/operators';
import { Seq } from '../../wrappers/Seq';

@Component({
  selector: 'page-pedido',
  templateUrl: 'pedido.html'
})
export class PedidoPage {

  form: FormGroup;
  id: string;
  action: string;
  isNew: boolean = false;
  isBigger: boolean = false;
  seeTimePickerP: boolean = false;
  seeDatePickerP: boolean = true;
  seeTimePickerE: boolean = false;
  seeDatePickerE: boolean = true;

  showCalendar: boolean = false;
  showCalendar2: boolean = false;

  estados = [
    { id: 1, name: "Pendiente" },
    { id: 2, name: "Enviado" },
    { id: 3, name: "Entregado" },
    { id: 4, name: "Anulado" }
  ];

  private pedido: Pedidoventa = new Pedidoventa();
  private _clientes: Array<Cliente> = [];
  private _detalles: Array<Pedidoventadetalle> = [];
  private auxPedidos: Array<Pedidoventa> = [];
  private auxDetalles: Array<Pedidoventadetalle> = [];


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
    this._detalles = this.dbController.getDetalleLocal();
    this._clientes = this.dbController.getClienteLocal();
    this.auxPedidos = this.dbController.getPedidoLocal();
    this.auxDetalles = this.dbController.getDetalleLocal();

    this.id = this.navParams.get('id');
    this.armarPedido();
  }

  armarPedido() {
    if (this.id == '') {
      this.pedido.pedido_venta_detalle = this.dbController.getDetalleLocal();
      this.action = "Nuevo Pedido";
      this.pedido.gastosEnvio = 0.0;
      this.pedido.nroPedido = 0;
      this.calcularSubTotalYMontoTotal();
    } else {

    }

  }

  private validarFormulario() {
    this.form = this.formBuilder.group({
      nroPedido: new FormControl('', [Validators.required, Validators.pattern(StringsRegex.onlyIntegerNumbers)]),
      fechaDatePedido: new FormControl('', [Validators.required]),
      fechaTimePedido: new FormControl('', [Validators.required]),
      fechaDateEntrega: new FormControl('', [Validators.required]),
      fechaTimeEntrega: new FormControl('', [Validators.required]),
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
              this._detalles
                .map(detalle => {
                  let jsonString = JSON.stringify(lastID);
                  let auxSeq = <Seq[]>JSON.parse(jsonString);
                  console.log(auxSeq);
                  detalle.pedidoVentaId = auxSeq[0].seq;
                  console.log(detalle.pedidoVentaId);
                  this.detalleProvider.createLocal(detalle)
                    .then(() => {
                      console.log("detalle de pedido creado");
                      this.auxPedidos.push(this.pedido)
                      this.auxDetalles.push(detalle)
                      this.dbController.setPedidoLocal(this.auxPedidos);
                      this.dbController.setDetalleLocal(this.auxDetalles);
                      this.auxPedidos.slice(this.auxPedidos.length - 1, 1)
                      this.auxDetalles.splice(this.auxDetalles.length - 1, 1)
                      this.navCtrl.popToRoot();
                    })
                    .catch(error => { console.log(error) })
                })
            })
            .catch(error => { console.log(error) })
        })
        .catch(error => { console.log(error) })
    } else {
      //Actualizando pedido
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
  showTimePickerP(time: DateTime) {
    this.seeTimePickerP = true;
    this.seeDatePickerP = false;
    time.open();
  }

  hideTimePickerP(date: DateTime, time: DateTime, dateE: DateTime) {
    this.seeTimePickerP = false;
    this.seeDatePickerP = true;
    let year: string, month: string, day: string, hours: string, min: string;
    year = date.value.year.toString();
    month = (date.value.month < 10) ? `0${date.value.month}` : `${date.value.month}`;
    day = (date.value.day < 10) ? `0${date.value.day}` : `${date.value.day}`;
    hours = (time.value.hour < 10) ? `0${time.value.hour}` : `${time.value.hour}`;
    min = (time.value.minute < 10) ? `0${time.value.minute}` : `${time.value.minute}`;
    let dateTime = `${year}-${month}-${day}T${hours}:${min}:00`
    this.pedido.fechaPedido = moment(dateTime).toDate();
    dateE.min = dateTime;
    this.compararFechas();
  }
  //#endregion

  //#region CONTROL DE LA FECHA DE ENTREGA
  showTimePickerE(time: DateTime) {
    this.seeTimePickerE = true;
    this.seeDatePickerE = false;
    time.open();
  }

  hideTimePickerE(date: DateTime, time: DateTime) {
    this.seeTimePickerE = false;
    this.seeDatePickerE = true;
    let year: string, month: string, day: string, hours: string, min: string;
    year = date.value.year.toString();
    month = (date.value.month < 10) ? `0${date.value.month}` : `${date.value.month}`;
    day = (date.value.day < 10) ? `0${date.value.day}` : `${date.value.day}`;
    hours = (time.value.hour < 10) ? `0${time.value.hour}` : `${time.value.hour}`;
    min = (time.value.minute < 10) ? `0${time.value.minute}` : `${time.value.minute}`;
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


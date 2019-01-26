import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, IonicApp, ItemSliding, ModalController } from 'ionic-angular';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Pedidoventadetalle, Articulo, Pedidoventa } from '../../app/shared/sdk';
import { StringsRegex } from '../../wrappers/StringsRegex';
import { DbControllerProvider } from '../../providers/db-controller.provider';
import { PedidoPage } from '../pedido/pedido';

@IonicPage()
@Component({
  selector: 'page-detalle',
  templateUrl: 'detalle.html',
})
export class DetallePage {

  dForma: FormGroup;
  showForm: boolean = false;
  tieneDetalle: boolean = false;
  id: string = '';
  action: string;
  updateId: string = '';

  _detalles: Array<Pedidoventadetalle> = [];
  private articulos: Articulo[] = [];
  private detalle: Pedidoventadetalle;
  private aux: Pedidoventadetalle = new Pedidoventadetalle();

  private pedidoForEdit: Pedidoventa;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private dbController: DbControllerProvider,
    private formBuilder: FormBuilder,
  ) {
    this.id = this.navParams.get('id');
  }

  ionViewDidLoad() {
    this.articulos = this.dbController.getArticuloLocal();

    if (this.id == '' || this.id == null) {
      this.action = "Generar Pedido";
    } else {
      this.pedidoForEdit = this.navParams.get('pedido');
      console.log("PEDIDO PARA EDITAR", this.pedidoForEdit);
    }

    this.validarFormulario();

  }

  private validarFormulario() {
    this.dForma = this.formBuilder.group({
      cantidad: new FormControl('', [Validators.required, Validators.pattern(StringsRegex.greaterThanZero)]),
      descuento: new FormControl('', [Validators.required, Validators.pattern(StringsRegex.percentage)]),
      subTotal: new FormControl({ value: '', disabled: true }, [Validators.required]),
      articulo: new FormControl('', [Validators.required])

    })
  }

  private setDefaultForm() {
    this.detalle = new Pedidoventadetalle();
    this.detalle.pedidoventa = new Pedidoventa();
    this.detalle.cantidad = 1;
    this.detalle.subTotal = 0;
    this.detalle.porcentajeDescuento = 0;
    this.updateId = '';
  }

  private setFormValues(data: Pedidoventadetalle) {
    console.log(data);
    this.updateId = data.id.toString();
    this.dForma.get('cantidad').setValue(data.cantidad);
    this.dForma.get('descuento').setValue(data.porcentajeDescuento);
    this.dForma.get('subTotal').setValue(data.subTotal);
    this.setSelectedArticulo(data.articulo);
    this.detalle = data;
  }

  selectArticuloChange(selectedArticulo: Articulo) {
    this.detalle.articulo = selectedArticulo;
    this.calculateSubtotal();
  }

  private setSelectedArticulo(articulo: Articulo) {
    if (articulo != null) {
      this.dForma.get('articulo').setValue(articulo);
    } else {
      this.dForma.get('articulo').setValue(null);
    }
  }

  calculateSubtotal() {
    if (this.detalle.articulo == null) return;
    let subTotal = 0;
    let cantidad = this.detalle.cantidad
    let articulo = this.detalle.articulo;
    let precio = articulo.precioVenta + (articulo.precioVenta * articulo.iva);
    let descuento = precio * (this.detalle.porcentajeDescuento / 100);
    subTotal = (cantidad * precio) - descuento;
    this.detalle.subTotal = subTotal;
  }

  addDetalle() {
    if (this.updateId != '') {
      this.aux = this._detalles.find(x => x.id == parseInt(this.updateId));
      let index = this._detalles.indexOf(this.aux);
      this.detalle.id = parseInt(this.updateId);
      this._detalles[index] = this.detalle;
    } else {
      this.detalle.id = this._detalles.length + 1;
      this._detalles.push(this.detalle);
    }
    this.seeForm(false);
    this.updateId = '';
    console.log(this._detalles);
  }

  seeForm(v: boolean) {
    this.showForm = v;
    this.setDefaultForm();
    this.setSelectedArticulo(null);
  }

  deleteRow(refDetalle: Pedidoventadetalle, slidingItem: ItemSliding) {
    for (let i = 0; i < this._detalles.length; ++i) {
      if (this._detalles[i].id === refDetalle.id) {
        this._detalles.splice(i, 1);
      }
    }
    if (this._detalles.length <= 0) this.tieneDetalle = false;
    slidingItem.close();
  }

  editRow(refDetalle: Pedidoventadetalle, slidingItem: ItemSliding) {
    this.seeForm(true);
    this.aux = refDetalle;
    this.setFormValues(this.aux);
    slidingItem.close();
  }

  cancel() {
    this.detalle = this.aux;
    this.seeForm(false);
  }

  generatePedido() {
    this.dbController.setDetalleLocal(this._detalles);
    this.navCtrl.push(PedidoPage, {
      id: ''
    });
  }

  //#region MENSAJES DE VALIDACION
  validation_messages = {
    'cantidad': [
      { type: 'required', message: '* Este campo es requerido.' },
      { type: 'pattern', message: '* Numeros enteros mayores a 0.' }
    ],
    'descuento': [
      { type: 'required', message: '* Este campo es requerido.' },
      { type: 'pattern', message: '* Numeros entre 0 - 100' }
    ],
    'subTotal': [
      { type: 'required', message: '* Este campo es requerido.' }
    ]
  }
  //#endregion

}

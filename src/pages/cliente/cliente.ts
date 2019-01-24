import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ClienteProvider } from '../../providers/cliente.provider';
import { Cliente, Domicilio } from '../../app/shared/sdk';
import { DomicilioProvider } from '../../providers/domicilio.provider';
import { JsonObject, JsonProperty, JsonConvert } from "json2typescript";

@IonicPage()
@Component({
  selector: 'page-cliente',
  templateUrl: 'cliente.html',
})
export class ClientePage {

  searchTerm: any = '';
  itTried: boolean = false;
  canRetry: boolean = false;

  _clientes: Cliente[] = [];
  _domicilios: Domicilio[] = [];
  _auxClientes: Cliente[] = [];


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    private _clienteProvider: ClienteProvider,
    private _domicilioProvider: DomicilioProvider
  ) {
  }

  ionViewDidLoad() {
    this.getAll();
  }

  ionViewDidEnter() {
    console.log("ionViewDidEnter");
    if (this.itTried) {
      this.showToastTop(this._clientes);
    }
  }

  getAll() {


    this._domicilioProvider.getAll({ include: 'cliente' })
      .subscribe(data => {
        console.log("GET ALL CLIENTES ", data);
        this._domicilios = data;
        this.setArrayCliente(data);
        this._domicilioProvider.createLocal(this._domicilios, this._clientes, 0);

        this.itTried = true;
        this.canRetry = false;
        this.showToastTop(this._clientes);

      }, error => {
        console.log(error);

        this._clienteProvider.getAllLocal()
          .then((dataLocal) => {
            if (dataLocal == null || dataLocal.length <= 0) {
              console.log(dataLocal);
              this.itTried = true;
              this.canRetry = true;
              this.showToastTop(this._clientes)
            }
            else {
              this.setArrayClienteLocal(dataLocal);
            }

          }).catch(error => console.log(error));
      });


  }

  showToastTop(array: any) {
    if (array.length <= 0) {
      let position = 'top';

      let toast = this.toastCtrl.create({
        message: 'No hay registros CLIENTES / sin conexion',
        duration: 1000,
        position: position
      });

      toast.present(toast);

    }
  }

  setFilteredItems() {
    this._auxClientes = this._clientes.filter(x => x.razonSocial.toLowerCase().includes(this.searchTerm.toLowerCase()));
  }

  setArrayCliente(domicilios: Domicilio[]) {

    for (let i = 0; i < domicilios.length; i++) {
      if (domicilios[i].cliente != null) {
        this._clientes[i] = this._auxClientes[i] = domicilios[i].cliente;
      }
    }
  }

  setArrayClienteLocal(dataLocal: any[]) {
    let i = 0;
    dataLocal.map(
      (d) => {
        this._auxClientes[i++] = this._clientes[i++] = Object.assign(new Cliente, d);
      });
  }

}



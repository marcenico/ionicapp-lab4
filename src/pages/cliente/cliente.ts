import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Cliente, Domicilio } from '../../app/shared/sdk';
import { DbControllerProvider } from '../../providers/db-controller.provider';

@IonicPage()
@Component({
  selector: 'page-cliente',
  templateUrl: 'cliente.html',
})
export class ClientePage {

  searchTerm: any = '';
  itTried: boolean = false;

  _clientes: Cliente[] = [];
  _domicilios: Domicilio[] = [];
  _auxClientes: Cliente[] = [];


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    private dbController: DbControllerProvider
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
    if (this.dbController.getClienteLocal() == null || this.dbController.getClienteLocal().length <= 0) {
      this.itTried = true;
      this.showToastTop(this._clientes)
    } else {
      this._auxClientes = this._clientes = [];
      this._auxClientes = this._clientes = this.dbController.getClienteLocal();
    }
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

}



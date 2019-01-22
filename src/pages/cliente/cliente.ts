import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ClienteProvider } from '../../providers/cliente.provider';
import { Cliente } from '../../app/shared/sdk';

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
  _auxClientes: Cliente[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    private _clienteProvider: ClienteProvider
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
    this._clienteProvider.getAll()
      .subscribe(data => {
        console.log("GET ALL CLIENTES ", data);
        this._auxClientes = this._clientes = data;
        this.itTried = true;
        this.canRetry = false;
        this.showToastTop(this._clientes);
      }, error => {
        this.itTried = true;
        this.canRetry = true;
        this.showToastTop(this._clientes)
      });
  }

  showToastTop(array: any) {
    if (array.length <= 0) {
      let position = 'top';

      let toast = this.toastCtrl.create({
        message: 'No hay registros clientes / sin conexion',
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


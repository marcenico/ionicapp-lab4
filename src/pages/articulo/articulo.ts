import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Articulo } from '../../app/shared/sdk';
import { DbControllerProvider } from '../../providers/db-controller.provider';


@IonicPage()
@Component({
  selector: 'page-articulo',
  templateUrl: 'articulo.html',
})
export class ArticuloPage {

  searchTerm: any = '';
  itTried: boolean = false;

  _articulos: Articulo[] = [];
  _auxArticulos: Articulo[] = [];

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
      this.showToastTop(this._articulos);
    }
  }

  getAll() {
    if (this.dbController.getArticuloLocal() == null || this.dbController.getArticuloLocal().length <= 0) {
      this.itTried = true;
      this.showToastTop(this._articulos)
    } else {
      this._auxArticulos = this._articulos = [];
      this._auxArticulos= this._articulos = this.dbController.getArticuloLocal();
    }
  }


  showToastTop(array: any) {
    if (array.length <= 0) {
      let position = 'top';
      let toast = this.toastCtrl.create({
        message: 'No hay registros ARTICULOS / sin conexion',
        duration: 1000,
        position: position
      });
      toast.present(toast);
    }
  }

  setFilteredItems() {
    this._auxArticulos = this._articulos.filter(x => x.denominacion.toLowerCase().includes(this.searchTerm.toLowerCase()));
  }


}

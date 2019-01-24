import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Articulo } from '../../app/shared/sdk';
import { ArticuloProvider } from '../../providers/articulo.provider';

/**
 * Generated class for the ArticuloPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-articulo',
  templateUrl: 'articulo.html',
})
export class ArticuloPage {

  searchTerm: any = '';
  itTried: boolean = false;
  canRetry: boolean = false;

  _articulos: Articulo[] = [];
  _auxArticulos: Articulo[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    private _articuloProvider: ArticuloProvider
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
    this._articuloProvider.getAll({ include: 'rubro' })
      .subscribe(data => {
        console.log("GET ALL ARTICULOS ", data);
        this._auxArticulos = this._articulos = data;
        this.itTried = true;
        this.canRetry = false;
        this.showToastTop(this._articulos);
      }, error => {
        this.itTried = true;
        this.canRetry = true;
        this.showToastTop(this._articulos);
      });
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

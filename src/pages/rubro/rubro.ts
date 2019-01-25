import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Rubro } from '../../app/shared/sdk';
import { RubroProvider } from '../../providers/rubro.provider';
import { DbControllerProvider } from '../../providers/db-controller.provider';

@IonicPage()
@Component({
  selector: 'page-rubro',
  templateUrl: 'rubro.html',
})
export class RubroPage {

  searchTerm: any = '';
  itTried: boolean = false;

  _rubros: Rubro[] = [];
  _auxRubros: Rubro[] = [];

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
      this.showToastTop(this._rubros);
    }
  }

  getAll() {
    if (this.dbController.getRubroLocal() == null || this.dbController.getRubroLocal().length <= 0) {
      this.itTried = true;
      this.showToastTop(this._rubros)
    } else {
      this._auxRubros = this._rubros = [];
      this._auxRubros = this._rubros = this.dbController.getRubroLocal();
    }
  }

  showToastTop(array: any) {
    if (array.length <= 0) {
      let position = 'top';
      let toast = this.toastCtrl.create({
        message: 'No hay registros RUBROS / sin conexion',
        duration: 1000,
        position: position
      });
      toast.present(toast);
    }
  }

  setFilteredItems() {
    this._auxRubros = this._rubros.filter(x => x.denominacion.toLowerCase().includes(this.searchTerm.toLowerCase()));
  }

}

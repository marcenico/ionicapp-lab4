import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Rubro } from '../../app/shared/sdk';
import { RubroProvider } from '../../providers/rubro.provider';

@IonicPage()
@Component({
  selector: 'page-rubro',
  templateUrl: 'rubro.html',
})
export class RubroPage {

  searchTerm: any = '';
  itTried: boolean = false;
  canRetry: boolean = false;

  _rubros: Rubro[] = [];
  _auxRubros: Rubro[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    private _rubroProvider: RubroProvider
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
    this._rubroProvider.getAll()
      .subscribe(data => {
        console.log("GET ALL CLIENTES ", data);
        this._auxRubros = this._rubros = data;
        this.itTried = true;
        this.canRetry = false;
        this.showToastTop(this._rubros);
      }, error => {
        this.itTried = true;
        this.canRetry = true;
        this.showToastTop(this._rubros)
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
    this._auxRubros = this._rubros.filter(x => x.denominacion.toLowerCase().includes(this.searchTerm.toLowerCase()));
  }

}

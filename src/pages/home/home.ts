import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading } from 'ionic-angular';
import { DbControllerProvider } from '../../providers/db-controller.provider';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    private dbProvider: DbControllerProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  importarData() {
    this.dbProvider.getDataFromServer()
    
  }


}

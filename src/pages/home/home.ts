import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { DbControllerProvider } from '../../providers/db-controller.provider';
import { PedidoPage } from '../pedido/pedido';
import { DetallePage } from '../detalle/detalle';
import { Pedidoventa } from '../../app/shared/sdk';
import { PedidosPage } from '../pedidos/pedidos';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    private dbController: DbControllerProvider
  ) {
  }

  ionViewDidLoad() {
  }

  importarData() {
    this.dbController.getDataFromServer()

  }

  seeFormPedidos() {
    this.navCtrl.push(DetallePage, {
      id: ''
    });
    // const modal = this.modalCtrl.create(DetallePage);
    // modal.present();
  }
  
  seePedidos() {
    this.navCtrl.push(PedidosPage);
    // const modal = this.modalCtrl.create(DetallePage);
    // modal.present();
  }


}

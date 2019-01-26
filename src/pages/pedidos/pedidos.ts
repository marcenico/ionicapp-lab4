import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ItemSliding, ToastController } from 'ionic-angular';
import { Pedidoventa, PedidoventaApi, Pedidoventadetalle } from '../../app/shared/sdk';
import { DbControllerProvider } from '../../providers/db-controller.provider';
import { DetallePage } from '../detalle/detalle';

@IonicPage()
@Component({
  selector: 'page-pedidos',
  templateUrl: 'pedidos.html',
})
export class PedidosPage {

  _pedidos: Array<Pedidoventa> = [];
  _detalles: Array<Pedidoventadetalle> = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public dbController: DbControllerProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PedidosPage');
    this._pedidos = this.dbController.getPedidoLocal();
    this._detalles = this.dbController.getDetalleLocal();
    if (undefined !== this._pedidos && undefined !== this._detalles) {
      this.asociarDetallesAlPedido();
    } else {
      this.showToastTop();
    }
  }

  asociarDetallesAlPedido() {
    for (const p of this._pedidos) {
      for (const d of this._detalles) {
        if (p.id == d.pedidoVentaId) {
          p.pedido_venta_detalle.push(d);
        }
      }
    }
  }

  deleteRow(pedido: Pedidoventa, slidingItem: ItemSliding) {
    for (let i = 0; i < this._pedidos.length; ++i) {
      if (this._pedidos[i].id === pedido.id) {
        this._pedidos.splice(i, 1);
      }
    }
    if (this._pedidos.length <= 0) {
      console.log("MENSAJE DE ALERTA, ya no tienes regitros de pedidos");
    }
    slidingItem.close();
  }

  editRow(pedido: Pedidoventa, slidingItem: ItemSliding) {
    slidingItem.close();
    this.navCtrl.push(DetallePage, {
      id: 'new',
      pedido: pedido
    })
  }

  showToastTop() {
    let position = 'top';
    let toast = this.toastCtrl.create({
      message: 'No hay registros Pedidos / sin conexion',
      duration: 2000,
      position: position
    });
    toast.present(toast);
  }


}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ItemSliding, ToastController, AlertController, LoadingController, Loading } from 'ionic-angular';
import { Pedidoventa, PedidoventaApi, Pedidoventadetalle } from '../../app/shared/sdk';
import { DbControllerProvider } from '../../providers/db-controller.provider';
import { DetallePage } from '../detalle/detalle';
import { PedidoProvider } from '../../providers/pedido.provider';
import { DetalleProvider } from '../../providers/detalle.provider';
import { Pedidos } from '../../wrappers/Pedidos';

@IonicPage()
@Component({
  selector: 'page-pedidos',
  templateUrl: 'pedidos.html',
})
export class PedidosPage {
  loader: Loading;
  _pedidos: Pedidos[] = [];
  _detalles: Pedidoventadetalle[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public dbController: DbControllerProvider,
    public pedidoProvider: PedidoProvider,
    public detalleProvider: DetalleProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PedidosPage');
    this._pedidos = this.dbController.getPedidoLocal();
    if (this._pedidos.length == 0) this.showToastTop();
    this.detalleProvider.getAllLocal()
      .then(data => {
        let jsonString = JSON.stringify(data);
        let auxDetalles = <Pedidoventadetalle[]>JSON.parse(jsonString);
        this.dbController.setDetalleLocalArray(auxDetalles);
        this._detalles = this.dbController.getDetalleLocal();
      })
  }

  deleteRow(pedido: Pedidos, slidingItem: ItemSliding) {
    slidingItem.close();

    this.pedidoProvider.deleteLocal(pedido)
      .then(() => {
        console.log("Pedido borrado con exito", pedido);
        for (let i = 0; i < this._pedidos.length; ++i) {
          if (this._pedidos[i].id === pedido.id) {
            this._pedidos.splice(i, 1);
          }
        }
        if (this._pedidos.length <= 0) {
          console.log("MENSAJE DE ALERTA, ya no tienes regitros de pedidos");
        }
      })
      .catch(error => console.log(error))
  }

  editRow(pedido: Pedidos, slidingItem: ItemSliding) {
    slidingItem.close();
    this.navCtrl.push(DetallePage, {
      id: pedido.id,
      pedido: pedido
    })
  }

  migrarPedido(pedido: Pedidos, slidingItem: ItemSliding) {
    slidingItem.close();
    let detallesAmigrar = this._detalles.filter(d => d.pedidoVentaId == pedido.id)
    let nroDeMigracion: number = 1; //cero o uno 
    if (pedido.migrado == 0) {
      this.presentLoading();
      this.pedidoProvider.createInServer(pedido)
        .subscribe(pedidoCreado => {
          console.log("Pedido creados en el server");
          this.detalleProvider.createInServer(detallesAmigrar, pedidoCreado.id)
            .subscribe(() => {
              console.log("Detalles creados en el server");

              //#region Cambia el valor de la migracion en la base de datos local
              this.pedidoProvider.updateMigrarPedido(pedido, nroDeMigracion)
                .then(() => {
                  pedido.migrado = 1;
                  console.log("Migracion existosa");
                  this.showAlertMigracion('La migracion ha sido exitosa!', 'Pedido migrado con exito');
                })
                .catch(error => { console.log(error) })
              //#endregion

            }, () => {
              this.showAlertMigracion('Ocurrio un error!', 'Error al intentar migrar el pedido, intente nuevamente');
            })
        }, () => {
          this.showAlertMigracion('Ocurrio un error!', 'Error al intentar migrar el pedido, intente nuevamente');
        });

    } else {
      this.presentLoading();
      this.showAlertMigracion('Error!', 'Este pedido ya ha sido migrado');
    }
  }

  seeFormPedidos() {
    this.navCtrl.push(DetallePage, {
      id: ''
    });
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

  showAlertMigracion(title: string, mensaje: string) {
    this.loader.dismiss();
    const alert = this.alertCtrl.create({
      title: title,
      subTitle: mensaje,
      buttons: ['OK']
    });
    alert.present();
  }

  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Espere...",
    });
    this.loader.present();
  }

  ponerMigracionEnCero(pedido: Pedidos) {
    this.pedidoProvider.updateMigrarPedido(pedido, 0)
      .then(() => {
        console.log("Migracion de pedido actualizado a ", 0);
      })
      .catch(error => console.error(error));
  }

}


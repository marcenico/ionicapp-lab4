import { Injectable } from '@angular/core';
import { SQLiteObject, SQLite } from '@ionic-native/sqlite';
import { RubroProvider } from './rubro.provider';
import { ArticuloProvider } from './articulo.provider';
import { DomicilioProvider } from './domicilio.provider';
import { ClienteProvider } from './cliente.provider';
import { PedidoProvider } from './pedido.provider';
import { DetalleProvider } from './detalle.provider';
import { Rubro, Articulo, Domicilio, Cliente, Pedidoventadetalle } from '../app/shared/sdk';
import { LoadingController, Loading, AlertController } from 'ionic-angular';
import { Pedidos } from '../wrappers/Pedidos';

@Injectable()
export class DbControllerProvider {

  loader: Loading;
  rubros: Rubro[] = [];
  articulos: Articulo[] = [];
  domicilios: Domicilio[] = [];
  clientes: Cliente[] = [];
  pedidos: Pedidos[] = [];
  detalles: Pedidoventadetalle[] = [];

  constructor(
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public _sqlite: SQLite,
    public _rubroProvider: RubroProvider,
    public _articuloProvider: ArticuloProvider,
    public _domicilioProvider: DomicilioProvider,
    public _clienteProvider: ClienteProvider,
    public _pedidoProvider: PedidoProvider,
    public _detalleProvider: DetalleProvider,
  ) {
  }

  public createDatabase() {
    let _db: SQLiteObject = null;
    return this._sqlite.create({
      name: 'finalL4.db',
      location: 'default' // the location field is required
    })
      .then((db) => {
        _db = db;
        this._rubroProvider.setDatabase(_db);
        return this._rubroProvider.createTableLocal();
      })
      .then(() => {
        this._articuloProvider.setDatabase(_db);
        return this._articuloProvider.createTableLocal();
      })
      .then(() => {
        this._domicilioProvider.setDatabase(_db);
        return this._domicilioProvider.createTableLocal();
      })
      .then(() => {
        this._clienteProvider.setDatabase(_db);
        return this._clienteProvider.createTableLocal();
      })
      .then(() => {
        this._pedidoProvider.setDatabase(_db);
        return this._pedidoProvider.createTableLocal();
      })
      .then(() => {
        this._detalleProvider.setDatabase(_db);
        return this._detalleProvider.createTableLocal();
      });

  }

  getDataFromServer() {
    this.presentLoading();
    this.getRubrosFromServer();
  }

  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Espere...",
    });
    this.loader.present();
  }

  showAlert() {
    this.loader.dismiss();
    const alert = this.alertCtrl.create({
      title: 'Error!!',
      subTitle: 'No tienes conexion o posible que no hayan registros cargados!',
      buttons: ['OK']
    });
    alert.present();
  }

  showAlertDataImported() {
    this.loader.dismiss();
    const alert = this.alertCtrl.create({
      title: 'Exito!!',
      subTitle: 'Los registros han sido importados!',
      buttons: ['OK']
    });
    alert.present();
  }

  showAlertLocal() {
    this.loader.dismiss();
    const alert = this.alertCtrl.create({
      title: 'No tienes pedidos cargados!!',
      subTitle: 'No se encontraron registros de pedidos',
      buttons: ['OK']
    });
    alert.present();
  }

  //#region GET RUBROS
  getRubrosFromServer() {
    this._rubroProvider.getAll()
      .subscribe(rubrosServer => {
        this.setRubroLocal(rubrosServer);
        this._rubroProvider.createLocal(this.getRubroLocal());
        // this.loader.dismiss();
        this.getArticulosFromServer();
      }, error => {
        console.log(error);
        this.getRubrosLocal()
      });
  }

  getRubrosLocal() {
    this._rubroProvider.getAllLocal()
      .then(rubroLocal => {
        if (rubroLocal != null && rubroLocal.length > 0) {
          let jsonString = JSON.stringify(rubroLocal);
          let auxRubros = <Rubro[]>JSON.parse(jsonString);
          this.setRubroLocal(auxRubros)
          this.getArticulosFromServer();
          // this.loader.dismiss();
        } else {
          this.showAlert();
        }
      })
      .catch(error => {
        console.log(error);
        this.showAlert();
        this.getPedidosLocal();
      })
  }
  //#endregion

  //#region GET ARTICULOS
  getArticulosFromServer() {
    this._articuloProvider.getAll()
      .subscribe(articuloServer => {
        this.setArticuloLocal(articuloServer);
        this._articuloProvider.createLocal(this.getArticuloLocal());
        this.getClientesFromServer();
      }, error => {
        console.log(error);
        this.getArticulosLocal();
      });
  }

  getArticulosLocal() {
    this._articuloProvider.getAllLocal()
      .then(articuloLocal => {
        if (articuloLocal != null && articuloLocal.length > 0) {
          let jsonString = JSON.stringify(articuloLocal);
          let auxArticulos = <Articulo[]>JSON.parse(jsonString);
          console.log(auxArticulos);
          this.setArticuloLocal(auxArticulos)
          this.getClientesFromServer();
        } else {
          this.showAlert();
        }
      })
      .catch(error => {
        console.log(error);
        this.showAlert();
        this.getPedidosLocal();
      })
  }
  //#endregion

  //#region GET CLIENTES
  getClientesFromServer() {
    this._domicilioProvider.getAll({ include: 'cliente' })
      .subscribe(domicilioServer => {
        this.setDomicilioLocal(domicilioServer);
        let auxClientes: Cliente[] = [];
        for (const d of domicilioServer) {
          if (d.cliente != null) {
            auxClientes.push(d.cliente);
          }
        }
        this.setClienteLocal(auxClientes)
        this._domicilioProvider.createLocal(this.getDomicilioLocal(), this.getClienteLocal(), 0);
        this.showAlertDataImported();
        this.getPedidosLocal();
      }, error => {
        console.log(error);
        this.getClientesLocal();
      });
  }

  getClientesLocal() {
    this._clienteProvider.getAllLocal()
      .then(clienteLocal => {
        if (clienteLocal != null && clienteLocal.length > 0) {
          let jsonString = JSON.stringify(clienteLocal);
          let auxClientes = <Cliente[]>JSON.parse(jsonString);
          this.setClienteLocal(auxClientes)
          this.getPedidosLocal();
        } else {
          this.showAlert();
        }
      })
      .catch(error => {
        console.log(error);
        this.showAlert();
        this.getPedidosLocal();
      })
  }
  //#endregion

  //#region GET PEDIDOS 
  getPedidosLocal() {
    this._pedidoProvider.getAllLocal()
      .then(pedidosLocal => {
        if (pedidosLocal != null && pedidosLocal.length > 0) {
          let jsonString = JSON.stringify(pedidosLocal);
          let auxPedidos = <Pedidos[]>JSON.parse(jsonString);
          this.setPedidoLocalArray(auxPedidos);
          this.getDetallesLocal();
        } else {
          this.showAlertLocal();
        }
      })
      .catch(error => {
        console.log(error);
        this.showAlertLocal();
      })
  }
  //#endregion

  //#region GET DETALLES 
  getDetallesLocal() {
    this._detalleProvider.getAllLocal()
      .then(detallesLocal => {
        if (detallesLocal != null && detallesLocal.length > 0) {
          let jsonString = JSON.stringify(detallesLocal);
          let auxDetalles = <Pedidoventadetalle[]>JSON.parse(jsonString);
          this.setDetalleLocalArray(auxDetalles);
          this.loader.dismiss()
        } else {
          this.showAlertLocal();
        }
      })
      .catch(error => {
        console.log(error);
        this.showAlertLocal();
      })
  }
  //#endregion

  //#region GETTERS AND SETTERS
  setRubroLocal(rubroLocal: Rubro[]) {
    this.rubros = rubroLocal;
    console.log("RUBROS SETEADOS ", this.rubros);
  }

  getRubroLocal() {
    if (this.rubros != null)
      return this.rubros;
  }

  setArticuloLocal(articuloLocal: Articulo[]) {
    this.articulos = articuloLocal;
    for (const articulo of this.articulos) {
      let rubro = this.getRubroLocal().find(r => r.id == articulo.rubroId);
      articulo.rubro = rubro;
    }
    console.log("ARTICULOS SETEADOS ", this.articulos);
  }

  getArticuloLocal() {
    if (this.articulos != null)
      return this.articulos;
  }

  setDomicilioLocal(domicilioLocal: Domicilio[]) {
    this.domicilios = domicilioLocal;
    console.log("DOMICILIOS SETEADOS ", this.domicilios);
  }

  getDomicilioLocal() {
    if (this.domicilios != null)
      return this.domicilios;
  }

  setClienteLocal(clienteLocal: Cliente[]) {
    this.clientes = clienteLocal;
    console.log("CLIENTES SETEADOS ", this.clientes);
  }

  getClienteLocal() {
    if (this.clientes != null)
      return this.clientes;
  }

  setPedidoLocalArray(pedidoLocal: Pedidos[]) {
    this.pedidos = pedidoLocal;
    console.log("PEDIDOS LOCALES CARGADOS ", this.pedidos);
  }

  setPedidoLocal(pedidoLocal: Pedidos) {
    this.pedidos.push(pedidoLocal);
    console.log("PEDIDO CARGADO ", this.pedidos);
  }

  setUpdatePedidoLocal(pedidoLocal: Pedidos) {
    for (let i = 0; i < this.pedidos.length; i++) {
      if (this.pedidos[i].id == pedidoLocal.id)
        this.pedidos[i] = pedidoLocal;
    }
  }

  getPedidoLocal() {
    if (this.pedidos != null)
      return this.pedidos;
  }

  setDetalleLocalArray(detallesLocal: Pedidoventadetalle[]) {
    this.detalles = detallesLocal;
    console.log("DETALLES SETEADOS ", this.detalles);
  }

  getDetalleLocal() {
    if (this.detalles != null)
      return this.detalles;
  }
  //#endregion

}

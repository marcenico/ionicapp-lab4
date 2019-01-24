import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { RubroProvider } from '../providers/rubro.provider';
import { ArticuloProvider } from '../providers/articulo.provider';
import { ClienteProvider } from '../providers/cliente.provider';
import { PedidoProvider } from '../providers/pedido.provider';
import { DetalleProvider } from '../providers/detalle.provider';
import { DomicilioProvider } from '../providers/domicilio.provider';
import { queryTables } from '../wrappers/queryTables';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = TabsPage;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public _rubroProvider: RubroProvider,
    public _articuloProvider: ArticuloProvider,
    public _domicilioProvider: DomicilioProvider,
    public _clienteProvider: ClienteProvider,
    public _pedidoProvider: PedidoProvider,
    public _detalleProvider: DetalleProvider,
    public _sqlite: SQLite
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      // splashScreen.hide();
      this.createDatabase();
    });
  }

  private createDatabase() {
    let _db: SQLiteObject = null;
    this._sqlite.create({
      name: 'finalL4.db',
      location: 'default' // the location field is required
    })
      .then((db) => {
        _db = db;
        this._rubroProvider.setDatabase(db);
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
      })
      .then(() => {
        this.splashScreen.hide();
        // this.rootPage = 'HomePage';
      })
      .catch(error => {
        console.error(error);
      });
  }

  // private createDatabase() {
  //   this._sqlite.create({
  //     name: 'finalL4.db',
  //     location: 'default' // the location field is required
  //   })
  //     .then((db) => {
  //       this.createTable(db, queryTables.tables, 0);
  //     })
  //     .then(() => {
  //       this.splashScreen.hide();
  //       this.rootPage = 'PedidoPage';
  //     })
  //     .catch(error => {
  //       console.error(error);
  //     });
  // }

  // createTable(db: SQLiteObject, tables: String[], index: number) {
  //   if (index < tables.length) {
  //     db.executeSql(`${tables[index]}`, [])
  //       .then(() => {
  //         console.log('Executed: ', tables[index]);
  //         index++;
  //         this.createTable(db, tables, index);
  //       }).catch(e => console.log(e));
  //   }
  // }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { Pedidoventadetalle, PedidoventadetalleApi } from '../app/shared/sdk';
import { Observable } from 'rxjs';

@Injectable()
export class DetalleProvider {

  // public properties

  db: SQLiteObject = null;

  constructor(public http: HttpClient, private detalleApi: PedidoventadetalleApi) { }

  // public methods
  setDatabase(db: SQLiteObject) {
    if (this.db === null) {
      this.db = db;
    }
  }

  createInServer(data: Pedidoventadetalle[], pedidoId: number): Observable<Pedidoventadetalle[]> {
    for (const d of data) {
      d.id = null;
      d.pedidoVentaId = pedidoId;
    }
    return this.detalleApi.createMany(data);
  }

  createManyLocal(detalles: Pedidoventadetalle[], pedidoVentaId: number) {
    for (const d of detalles) {
      d.id = null;
      let sql = `INSERT INTO pedidoventadetalle(cantidad, subTotal, porcentajeDescuento, articuloId, pedidoVentaId) VALUES (?,?,?,?,?)`
      this.db.executeSql(sql, [d.cantidad, d.subTotal, d.porcentajeDescuento, d.articulo.id, pedidoVentaId])
        .then(() => console.log("EXECUTED CREADO DETALLE"))
        .catch(error => console.log(error));
    }


  }

  createTableLocal() {
    console.log("creando tabla detalle");
    let sql =
      `CREATE TABLE IF NOT exists pedidoventadetalle (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        cantidad	int ( 11 ) NOT NULL DEFAULT '1',
        subTotal	double NOT NULL,
        porcentajeDescuento	double NOT NULL,
        articuloId	int ( 10 ) NOT NULL,
        pedidoVentaId	int ( 10 ) NOT NULL,
        CONSTRAINT pedidoVentaId FOREIGN KEY (pedidoVentaId) REFERENCES pedidoventa(id) ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT articuloId FOREIGN KEY (articuloId) REFERENCES articulo(id) ON DELETE NO ACTION ON UPDATE CASCADE
      )`;
    this.db.executeSql(sql, [])
      .then(() => console.log("creada tabla detalle"))
      .catch(error => console.log(error));
  }


  deleteLocal(id: number[]) {
    let sql = 'DELETE FROM pedidoventadetalle WHERE id=?';
    return this.db.executeSql(sql, [id]);

  }

  deleteLocalMany(detalleABorrar: Pedidoventadetalle[]) {
    if (detalleABorrar.length <= 0) {
      console.log("Nada para borrar");
    }
    for (const d of detalleABorrar) {
      let sql = 'DELETE FROM pedidoventadetalle WHERE id=?';
      this.db.executeSql(sql, [d.id])
        .then(() => console.log("Borrado con exito ", d))
        .catch(error => console.log(error));
    }
  }

  getAllLocal() {
    let sql = 'SELECT * FROM pedidoventadetalle';
    return this.db.executeSql(sql, [])
      .then(response => {
        let detalle = [];
        for (let index = 0; index < response.rows.length; index++) {
          detalle.push(response.rows.item(index));
        }
        return Promise.resolve(detalle);
      })
      .catch(error => Promise.reject(error));
  }

  getLocalById(pedidoId: number) {
    let sql = `SELECT * FROM pedidoventadetalle WHERE pedidoVentaId = ${pedidoId}`;
    return this.db.executeSql(sql, [])
      .then(response => {
        let detalle = [];
        for (let index = 0; index < response.rows.length; index++) {
          detalle.push(response.rows.item(index));
        }
        return Promise.resolve(detalle);
      })
      .catch(error => Promise.reject(error));
  }

  updateMany(detalles: Pedidoventadetalle[]) {
    for (const d of detalles) {
      let sql = 'UPDATE pedidoventadetalle SET cantidad =?, subTotal =?, porcentajeDescuento =?, articuloId =?, pedidoVentaId =? WHERE id =?';
      this.db.executeSql(sql, [d.cantidad, d.subTotal, d.porcentajeDescuento, d.articuloId, d.pedidoVentaId, d.id])
        .then(() => console.log("Actualizado con exito ", d))
        .catch(error => console.error(error))
    }
  }

  getLastInsertedId() {
    let sql = "SELECT seq FROM sqlite_sequence WHERE name='pedidoventadetalle'";
    return this.db.executeSql(sql, [])
      .then(response => {
        let seq = [];
        for (let index = 0; index < response.rows.length; index++) {
          seq.push(response.rows.item(index));
        }
        return Promise.resolve(seq);
      })
      .catch(error => Promise.reject(error));
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { Pedidoventadetalle } from '../app/shared/sdk';

@Injectable()
export class DetalleProvider {

  // public properties

  db: SQLiteObject = null;

  constructor(public http: HttpClient) { }

  // public methods
  setDatabase(db: SQLiteObject) {
    if (this.db === null) {
      this.db = db;
    }
  }

  createLocal(d: Pedidoventadetalle) {
    let sql = 'INSERT INTO pedidoventadetalle(cantidad, subTotal, porcentajeDescuento, articuloId, pedidoVentaId) VALUES(?,?,?,?,?)';
    return this.db.executeSql(sql, [d.cantidad, d.subTotal, d.porcentajeDescuento, d.articuloId, d.pedidoVentaId]);
  }

  createTableLocal() {
    console.log("creando tabla detalle");
    let sql =
      `CREATE TABLE IF NOT exists pedidoventadetalle (
      id int(10) NOT NULL,
      cantidad int(11) NOT NULL DEFAULT '1',
      subTotal double NOT NULL,
      porcentajeDescuento double NOT NULL,
      articuloId int(10) NOT NULL,
      pedidoVentaId int(10) NOT NULL,
      PRIMARY KEY (id),
      CONSTRAINT articuloId FOREIGN KEY (articuloId) REFERENCES articulo (id) ON DELETE NO ACTION ON UPDATE CASCADE,
      CONSTRAINT pedidoVentaId FOREIGN KEY (pedidoVentaId) REFERENCES pedidoventa (id) ON DELETE CASCADE ON UPDATE CASCADE
    )`;
    return this.db.executeSql(sql, []);
  }

  deleteLocal(d: Pedidoventadetalle) {
    let sql = 'DELETE FROM pedidoventadetalle WHERE id=?';
    return this.db.executeSql(sql, [d.id]);
  }

  getAllLocal() {
    let sql = 'SELECT * FROM pedidoventadetalle INNER JOIN articulo ON pedidoventadetalle.articuloId = articulo.id';
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

  getAllById(pedidoId: any) {
    let sql = `SELECT * FROM pedidoventadetalle WHERE pedidoVentaId=${pedidoId} INNER JOIN articulo ON pedidoventadetalle.articuloId = articulo.id`;
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

  update(d: Pedidoventadetalle) {
    let sql = `UPDATE pedidoventadetalle SET cantidad=?, subTotal=?, porcentajeDescuento=?, articuloId=?, pedidoVentaId=? WHERE id=?`;
    return this.db.executeSql(sql, [d.cantidad, d.subTotal, d.porcentajeDescuento, d.articuloId, d.pedidoVentaId, d.id]);
  }

}

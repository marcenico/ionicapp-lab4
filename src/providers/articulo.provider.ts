import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ArticuloApi, LoopBackFilter, Articulo } from '../app/shared/sdk';
import { Observable } from 'rxjs';
import { SQLiteObject } from '@ionic-native/sqlite';

@Injectable()
export class ArticuloProvider {

  db: SQLiteObject = null;

  constructor(
    private articuloApi: ArticuloApi
    ) {
  }

  // public methods
  setDatabase(db: SQLiteObject) {
    if (this.db === null) {
      this.db = db;
    }
  }

  getAll(filtro: LoopBackFilter = {}): Observable<Articulo[]> {
    return this.articuloApi.find(filtro);
  }

  getOne(id: number): Observable<Articulo> {
    let filter: any = { where: { id: id }, include: 'rubro' };
    return this.articuloApi.findOne(filter);
  }

  getById(id: number): Observable<Articulo> {
    return this.articuloApi.findById(id);
  }

  create(a: Articulo) {
    let sql = 'INSERT INTO articulo(denominacion, codigo, precioCompra,  precioVenta, iva, createdAt , updatedAt, rubroId) VALUES(?,?,?,?,?,?,?,?)';
    return this.db.executeSql(sql, [a.denominacion, a.codigo, a.precioCompra, a.precioVenta, a.iva, a.createdAt, a.updatedAt, a.rubroId]);
  }

  createTableLocal() {
    console.log("creando tabla articulo");
    let sql =
    `CREATE TABLE IF NOT exists articulo (
      id int(10) NOT NULL,
      denominacion varchar(45) NOT NULL,
      codigo varchar(45) NOT NULL,
      precioCompra double NOT NULL,
      precioVenta double NOT NULL,
      iva double NOT NULL,
      createdAt timestamp NULL DEFAULT NULL,
      updatedAt timestamp NULL DEFAULT NULL,
      rubroId int(10) NOT NULL,
      PRIMARY KEY (id),
      CONSTRAINT rubroId FOREIGN KEY (rubroId) REFERENCES rubro (id) ON DELETE CASCADE
    )`;
    return this.db.executeSql(sql, []);
  }

  deleteLocal(a: Articulo) {
    let sql = `DELETE FROM articulo WHERE id=?`;
    return this.db.executeSql(sql, [a.id]);
  }

  getAllLocal() {
    let sql = `SELECT * FROM articulo INNER JOIN articulo ON articulo.rubroId = rubro.id`;
    return this.db.executeSql(sql, [])
      .then(response => {
        let articulo = [];
        for (let index = 0; index < response.rows.length; index++) {
          articulo.push(response.rows.item(index));
        }
        return Promise.resolve(articulo);
      })
      .catch(error => Promise.reject(error));
  }

  updateLocal(a: Articulo) {
    let sql = `UPDATE articulo SET denominacion=?, codigo=?, precioCompra=?,  precioVenta=?, iva=?, createdAt=?, updatedAt=?, rubroId=? WHERE id=?`;
    return this.db.executeSql(sql, [a.denominacion, a.codigo, a.precioCompra, a.precioVenta, a.iva, a.createdAt, a.updatedAt, a.rubroId]);
  }

}

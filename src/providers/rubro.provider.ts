import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RubroApi, LoopBackFilter, Rubro } from '../app/shared/sdk';
import { Observable } from 'rxjs';
import { SQLiteObject } from '@ionic-native/sqlite';

@Injectable()
export class RubroProvider {

  db: SQLiteObject = null;

  constructor(
    public http: HttpClient,
    private rubroApi: RubroApi
  ) {
  }

  // public methods
  setDatabase(db: SQLiteObject) {
    if (this.db === null) {
      this.db = db;
    }
  }

  getAll(filtro: LoopBackFilter = {}): Observable<Rubro[]> {
    // { include: 'rubroPadre' }
    return this.rubroApi.find(filtro);
  }

  getOne(id: number): Observable<Rubro> {
    let filter: any = { where: { id: id } };
    return this.rubroApi.findOne(filter);
  }

  getById(id: number): Observable<Rubro> {
    return this.rubroApi.findById(id);
  }

  createLocal(r: Rubro) {
    let sql = 'INSERT INTO rubro(codigo, denominacion, created_at,  updated_at, rubro_padre_id) VALUES(?,?,?,?,?)';
    return this.db.executeSql(sql, [r.codigo, r.denominacion, r.createdAt, r.updatedAt, r.rubroPadreId]);
  }

  createTableLocal() {
    console.log("creando tabla rubro");
    let sql =
    `CREATE TABLE IF NOT exists rubro (
        id int(10) NOT NULL,
        codigo varchar(45) NOT NULL,
        denominacion varchar(45) NOT NULL,
        created_at timestamp NULL DEFAULT NULL,
        updated_at timestamp NULL DEFAULT NULL,
        rubro_padre_id int(10) DEFAULT NULL,
        PRIMARY KEY (id),
        CONSTRAINT rubro_padre_id FOREIGN KEY (rubro_padre_id) REFERENCES rubro (id) ON DELETE NO ACTION ON UPDATE NO ACTION
      )`;
    return this.db.executeSql(sql, []);
  }

  deleteLocal(r: Rubro) {
    let sql = `DELETE FROM rubro WHERE id=?`;
    return this.db.executeSql(sql, [r.id]);
  }

  getAllLocal() {
    let sql = 'SELECT * FROM rubro';
    return this.db.executeSql(sql, [])
      .then(response => {
        let rubro = [];
        for (let index = 0; index < response.rows.length; index++) {
          rubro.push(response.rows.item(index));
        }
        return Promise.resolve(rubro);
      })
      .catch(error => Promise.reject(error));
  }

  getAllWithRubroPadreLocal() {
    let sql = 'SELECT * FROM rubro INNER JOIN rubro ON rubro.rubro_padre_id = rubro.id';
    return this.db.executeSql(sql, [])
      .then(response => {
        let rubro = [];
        for (let index = 0; index < response.rows.length; index++) {
          rubro.push(response.rows.item(index));
        }
        return Promise.resolve(rubro);
      })
      .catch(error => Promise.reject(error));
  }

  getAllById(id: any) {
    let sql = `SELECT * FROM rubro WHERE id=${id}`;
    return this.db.executeSql(sql, [])
      .then(response => {
        let pedido = [];
        for (let index = 0; index < response.rows.length; index++) {
          pedido.push(response.rows.item(index));
        }
        return Promise.resolve(pedido);
      })
      .catch(error => Promise.reject(error));
  }

  updateLocal(r: Rubro) {
    let sql = `UPDATE rubro SET codigo=?, denominacion=?, created_at=?,  updated_at=?, rubro_padre_id=? WHERE id=?`;
    return this.db.executeSql(sql, [r.codigo, r.denominacion, r.createdAt, r.updatedAt, r.rubroPadreId, r.id]);
  }

}

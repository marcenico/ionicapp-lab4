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

  createLocal(rubros: Rubro[]) {

    for (const r of rubros) {
      let sql = 'INSERT INTO rubro(id, codigo, denominacion, createdAt,  updatedAt, rubroPadreId) VALUES(?,?,?,?,?,?)';
      this.db.executeSql(sql, [r.id, r.codigo, r.denominacion, r.createdAt, r.updatedAt, r.rubroPadreId])
        .then(() => {
          console.log("EXECUTED CREATED ", r)
        }).catch(error => {
          console.log(error);
        });
    }

  }

  createTableLocal() {
    
    let sql =
      `CREATE TABLE IF NOT exists rubro (
        id int(10) NOT NULL,
        codigo varchar(45) NOT NULL,
        denominacion varchar(45) NOT NULL,
        createdAt timestamp NULL DEFAULT NULL,
        updatedAt timestamp NULL DEFAULT NULL,
        rubroPadreId int(10) DEFAULT NULL,
        PRIMARY KEY (id),
        CONSTRAINT rubroPadreId FOREIGN KEY (rubroPadreId) REFERENCES rubro (id) ON DELETE NO ACTION ON UPDATE NO ACTION
      )`;
    this.db.executeSql(sql, [])
    .then(()=> console.log("creada tabla rubro"))
    .catch(error => console.log(error));
    
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
    let sql = 'SELECT * FROM rubro INNER JOIN rubro ON rubro.rubroPadreId = rubro.id';
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

  getByIdLocal(id: any) {
    let sql = `SELECT rubro.* FROM rubro WHERE id=${id}`;
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

  updateLocal(r: Rubro) {
    let sql = `UPDATE rubro SET id=?, codigo=?, denominacion=?, createdAt=?,  updatedAt=?, rubroPadreId=? WHERE id=?`;
    return this.db.executeSql(sql, [r.id, r.codigo, r.denominacion, r.createdAt, r.updatedAt, r.rubroPadreId, r.id]);
  }

}

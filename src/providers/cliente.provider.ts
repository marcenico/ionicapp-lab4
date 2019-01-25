import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ClienteApi, LoopBackFilter, Cliente } from '../app/shared/sdk';
import { Observable } from 'rxjs';
import { SQLiteObject } from '@ionic-native/sqlite';

@Injectable()
export class ClienteProvider {

  db: SQLiteObject = null;

  constructor(
    public http: HttpClient,
    private clienteApi: ClienteApi
  ) {
  }

  // public methods
  setDatabase(db: SQLiteObject) {
    if (this.db === null) {
      this.db = db;
    }
  }

  getAll(filtro: LoopBackFilter = {}): Observable<Cliente[]> {
    return this.clienteApi.find(filtro);
  }

  getOne(filtro: LoopBackFilter = {}): Observable<Cliente> {
    return this.clienteApi.findOne(filtro);
  }

  getById(id: number): Observable<Cliente> {
    return this.clienteApi.findById(id);
  }

  createLocal(clientes: Cliente[]) {
    for (const c of clientes) {
      let sql = 'INSERT INTO cliente(id, razonSocial, cuit, saldo,  domicilioId) VALUES(?,?,?,?)';
      this.db.executeSql(sql, [c.id, c.razonSocial, c.cuit, c.saldo, c.domicilioId])
        .then(() => console.log("EXECUTED CREADO ", c)
        ).catch(error => console.log(error));
    }
  }

  createTableLocal() {
    console.log("creando tabla cliente");
    let sql =
      `CREATE TABLE IF NOT exists cliente (
      id int(10) NOT NULL,
      razonSocial varchar(45) NOT NULL,
      cuit varchar(45) NOT NULL,
      saldo double DEFAULT '0',
      domicilioId int(10) NOT NULL,
      PRIMARY KEY (id),
      CONSTRAINT domicilioId FOREIGN KEY (domicilioId) REFERENCES domicilio (id) ON UPDATE CASCADE
    )`;
    this.db.executeSql(sql, [])
    .then(()=> console.log("creada tabla cliente"))
    .catch(error => console.log(error));
  }

  deleteLocal(p: Cliente) {
    let sql = `DELETE FROM cliente WHERE id=?`;
    return this.db.executeSql(sql, [p.id]);
  }

  getAllLocal() {
    let sql = 'SELECT * FROM cliente';
    return this.db.executeSql(sql, [])
      .then(response => {
        let cliente = [];
        for (let index = 0; index < response.rows.length; index++) {
          cliente.push(response.rows.item(index));
        }
        return Promise.resolve(cliente);
      })
      .catch(error => Promise.reject(error));
  }

  updateLocal(c: Cliente) {
    let sql = `UPDATE cliente SET id=? razonSocial=?, cuit=?, saldo=?,  domicilioId=? WHERE id=?`;
    return this.db.executeSql(sql, [c.id, c.razonSocial, c.cuit, c.saldo, c.domicilioId, c.id]);
  }



}

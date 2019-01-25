import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { DomicilioApi, Domicilio, LoopBackFilter, Cliente } from '../app/shared/sdk';
import { Observable } from 'rxjs';
import { ClienteProvider } from './cliente.provider';

/*
  Generated class for the DomicilioProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DomicilioProvider {

  db: SQLiteObject = null;

  constructor(
    public http: HttpClient,
    private domicilioApi: DomicilioApi,
    private _clienteProvider: ClienteProvider
  ) {
  }

  // public methods
  setDatabase(db: SQLiteObject) {
    if (this.db === null) {
      this.db = db;
    }
  }

  getAll(filtro: LoopBackFilter = {}): Observable<Domicilio[]> {
    return this.domicilioApi.find(filtro);
  }

  getOne(id: string): Observable<Domicilio> {
    let idNumber = parseInt(id);
    let filter: any = { where: { id: idNumber }, include: 'cliente' };
    return this.domicilioApi.findOne(filter);
  }

  getById(id: number): Observable<Domicilio> {
    return this.domicilioApi.findById(id);
  }

  create(data: Domicilio): Observable<Domicilio> {
    return this.domicilioApi.create(data);
  }

  createClienteWithDomicilio(id: number, cliente: Cliente): Observable<Domicilio> {
    return this.domicilioApi.createCliente(id, cliente);
  }

  updateClienteWithDomicilio(id: number, data: Domicilio): Observable<Domicilio> {
    return this.domicilioApi.updateCliente(id, data.cliente);
  }

  update(data: Domicilio): Observable<Domicilio> {
    return this.domicilioApi.patchAttributes(data.id, data);
  }

  delete(data: Domicilio): Observable<Domicilio> {
    return this.domicilioApi.deleteById(data.id);
  }


  createLocal(d: Domicilio[], c: Cliente[], index: number) {
    if (index < d.length) {
      let sqlDomicilio = 'INSERT INTO domicilio(id, calle, numero, localidad,  latitud, longitud) VALUES(?,?,?,?,?,?)';
      let sqlCliente = 'INSERT INTO cliente(id, razonSocial, cuit, saldo,  domicilioId) VALUES(?,?,?,?,?)';

      this.db.executeSql(sqlDomicilio, [d[index].id, d[index].calle, d[index].numero, d[index].localidad, d[index].latitud, d[index].longitud])
        .then(() => {
          console.log('Executed: ', d[index]);

          this.db.executeSql(sqlCliente, [c[index].id, c[index].razonSocial, c[index].cuit, c[index].saldo, c[index].domicilioId])
            .then(() => {
              console.log('Executed: ', c[index]);
              index++;
              this.createLocal(d, c, index);
            }).catch(e => console.log(e));

        }).catch(e => console.log(e));
    }
  }

  createTableLocal() {
    console.log("creando tabla domicilio");
    let sql =
      `CREATE TABLE IF NOT exists domicilio (
      id int(10) NOT NULL,
      calle varchar(45) NOT NULL,
      numero varchar(45) NOT NULL,
      localidad varchar(45) NOT NULL,
      latitud decimal(10,8) NOT NULL,
      longitud decimal(11,8) NOT NULL,
      created_at timestamp NULL DEFAULT NULL,
      updated_at timestamp NULL DEFAULT NULL,
      PRIMARY KEY (id)
    )`;
    this.db.executeSql(sql, [])
    .then(()=> console.log("creada tabla domicilio"))
    .catch(error => console.log(error));
  }

  deleteLocal(d: Domicilio) {
    let sql = `DELETE FROM domicilio WHERE id=?`;
    return this.db.executeSql(sql, [d.id]);
  }

  getAllLocal() {
    let sql = 'SELECT * FROM domicilio';
    return this.db.executeSql(sql, [])
      .then(response => {
        let domicilio: Domicilio[] = [];
        for (let index = 0; index < response.rows.length; index++) {
          domicilio.push(response.rows.item(index));
        }
        return Promise.resolve(domicilio);
      })
      .catch(error => Promise.reject(error));
  }

  updateLocal(d: Domicilio) {
    let sql = `UPDATE domicilio SET id=? calle=?, numero=?, localidad=?,  latitud=?, longitud=? WHERE id=?`;
    return this.db.executeSql(sql, [d.id, d.calle, d.numero, d.localidad, d.latitud, d.longitud]);
  }


}

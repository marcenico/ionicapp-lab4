import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ClienteApi, LoopBackFilter, Cliente } from '../../app/shared/sdk';
import { Observable } from 'rxjs';

/*
  Generated class for the ClienteProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ClienteProvider {

  constructor(
    public http: HttpClient,
    private clienteApi: ClienteApi
    ) {
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

  // create(data: Domicilio):Observable<Domicilio> {
  //   return this.domService.create(data);
  // }

  update(data: Cliente, id: string): Observable<Cliente> {
    return this.clienteApi.patchAttributes(id, data);
  }

  delete(data: Cliente): Observable<Cliente> {
    return this.clienteApi.deleteById(data.id);
  }


}

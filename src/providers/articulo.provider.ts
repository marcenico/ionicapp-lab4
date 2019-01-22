import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ArticuloApi, LoopBackFilter, Articulo } from '../app/shared/sdk';
import { Observable } from 'rxjs';

/*
  Generated class for the ArticuloProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ArticuloProvider {

  constructor(
    public http: HttpClient,
    private articuloApi: ArticuloApi
    ) {
    console.log('Hello ArticuloProvider Provider');
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

}

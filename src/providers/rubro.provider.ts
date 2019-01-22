import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RubroApi, LoopBackFilter, Rubro } from '../app/shared/sdk';
import { Observable } from 'rxjs';

/*
  Generated class for the RubroProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RubroProvider {

  constructor(
    public http: HttpClient,
    private rubroApi: RubroApi
    ) {
  }

  getAll(filtro: LoopBackFilter = {}): Observable<Rubro[]> {
    return this.rubroApi.find(filtro);
  }

  getOne(filtro: LoopBackFilter = {}): Observable<Rubro> {
    return this.rubroApi.findOne(filtro);
  }

  getById(id: number): Observable<Rubro> {
    return this.rubroApi.findById(id);
  }

}

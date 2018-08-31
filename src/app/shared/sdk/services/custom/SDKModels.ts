/* tslint:disable */
import { Injectable } from '@angular/core';
import { User } from '../../models/User';
import { Articulo } from '../../models/Articulo';
import { Cliente } from '../../models/Cliente';
import { Domicilio } from '../../models/Domicilio';
import { Migrations } from '../../models/Migrations';
import { Pedidoventa } from '../../models/Pedidoventa';
import { Pedidoventadetalle } from '../../models/Pedidoventadetalle';
import { PasswordResets } from '../../models/PasswordResets';
import { Rubro } from '../../models/Rubro';
import { Users } from '../../models/Users';

export interface Models { [name: string]: any }

@Injectable()
export class SDKModels {

  private models: Models = {
    User: User,
    Articulo: Articulo,
    Cliente: Cliente,
    Domicilio: Domicilio,
    Migrations: Migrations,
    Pedidoventa: Pedidoventa,
    Pedidoventadetalle: Pedidoventadetalle,
    PasswordResets: PasswordResets,
    Rubro: Rubro,
    Users: Users,
    
  };

  public get(modelName: string): any {
    return this.models[modelName];
  }

  public getAll(): Models {
    return this.models;
  }

  public getModelNames(): string[] {
    return Object.keys(this.models);
  }
}

/* tslint:disable */
import {
  Cliente,
  Pedidoventa
} from '../index';

declare var Object: any;
export interface DomicilioInterface {
  "id"?: number;
  "calle": string;
  "numero": string;
  "localidad": string;
  "latitud": number;
  "longitud": number;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  cliente_domicilio?: Cliente;
  pedido_venta_domicilio?: Pedidoventa;
}

export class Domicilio implements DomicilioInterface {
  "id": number;
  "calle": string;
  "numero": string;
  "localidad": string;
  "latitud": number;
  "longitud": number;
  "createdAt": Date;
  "updatedAt": Date;
  cliente_domicilio: Cliente;
  pedido_venta_domicilio: Pedidoventa;
  constructor(data?: DomicilioInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Domicilio`.
   */
  public static getModelName() {
    return "Domicilio";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Domicilio for dynamic purposes.
  **/
  public static factory(data: DomicilioInterface): Domicilio{
    return new Domicilio(data);
  }
  /**
  * @method getModelDefinition
  * @author Julien Ledun
  * @license MIT
  * This method returns an object that represents some of the model
  * definitions.
  **/
  public static getModelDefinition() {
    return {
      name: 'Domicilio',
      plural: 'Domicilios',
      path: 'Domicilios',
      idName: 'id',
      properties: {
        "id": {
          name: 'id',
          type: 'number'
        },
        "calle": {
          name: 'calle',
          type: 'string'
        },
        "numero": {
          name: 'numero',
          type: 'string'
        },
        "localidad": {
          name: 'localidad',
          type: 'string'
        },
        "latitud": {
          name: 'latitud',
          type: 'number'
        },
        "longitud": {
          name: 'longitud',
          type: 'number'
        },
        "createdAt": {
          name: 'createdAt',
          type: 'Date'
        },
        "updatedAt": {
          name: 'updatedAt',
          type: 'Date'
        },
      },
      relations: {
        cliente_domicilio: {
          name: 'cliente_domicilio',
          type: 'Cliente',
          model: 'Cliente',
          relationType: 'hasOne',
                  keyFrom: 'id',
          keyTo: 'domicilioId'
        },
        pedido_venta_domicilio: {
          name: 'pedido_venta_domicilio',
          type: 'Pedidoventa',
          model: 'Pedidoventa',
          relationType: 'hasOne',
                  keyFrom: 'id',
          keyTo: 'domicilioId'
        },
      }
    }
  }
}

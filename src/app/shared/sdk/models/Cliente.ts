/* tslint:disable */
import {
  Pedidoventa
} from '../index';

declare var Object: any;
export interface ClienteInterface {
  "id"?: number;
  "razonSocial": string;
  "cuit": string;
  "saldo"?: number;
  "domicilioId": number;
  pedido_venta_cliente?: Pedidoventa;
}

export class Cliente implements ClienteInterface {
  "id": number;
  "razonSocial": string;
  "cuit": string;
  "saldo": number;
  "domicilioId": number;
  pedido_venta_cliente: Pedidoventa;
  constructor(data?: ClienteInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Cliente`.
   */
  public static getModelName() {
    return "Cliente";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Cliente for dynamic purposes.
  **/
  public static factory(data: ClienteInterface): Cliente{
    return new Cliente(data);
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
      name: 'Cliente',
      plural: 'Clientes',
      path: 'Clientes',
      idName: 'id',
      properties: {
        "id": {
          name: 'id',
          type: 'number'
        },
        "razonSocial": {
          name: 'razonSocial',
          type: 'string'
        },
        "cuit": {
          name: 'cuit',
          type: 'string'
        },
        "saldo": {
          name: 'saldo',
          type: 'number'
        },
        "domicilioId": {
          name: 'domicilioId',
          type: 'number'
        },
      },
      relations: {
        pedido_venta_cliente: {
          name: 'pedido_venta_cliente',
          type: 'Pedidoventa',
          model: 'Pedidoventa',
          relationType: 'hasOne',
                  keyFrom: 'id',
          keyTo: 'clienteId'
        },
      }
    }
  }
}

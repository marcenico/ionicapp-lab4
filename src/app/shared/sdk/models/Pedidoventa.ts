/* tslint:disable */

declare var Object: any;
export interface PedidoventaInterface {
  "id"?: number;
  "nroPedido": number;
  "fechaPedido": Date;
  "fechaEstimadaEntrega"?: Date;
  "gastosEnvio": number;
  "estado": string;
  "entregado": number;
  "subTotal": number;
  "montoTotal": number;
  "clienteId": number;
  "domicilioId": number;
}

export class Pedidoventa implements PedidoventaInterface {
  "id": number;
  "nroPedido": number;
  "fechaPedido": Date;
  "fechaEstimadaEntrega": Date;
  "gastosEnvio": number;
  "estado": string;
  "entregado": number;
  "subTotal": number;
  "montoTotal": number;
  "clienteId": number;
  "domicilioId": number;
  constructor(data?: PedidoventaInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Pedidoventa`.
   */
  public static getModelName() {
    return "Pedidoventa";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Pedidoventa for dynamic purposes.
  **/
  public static factory(data: PedidoventaInterface): Pedidoventa{
    return new Pedidoventa(data);
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
      name: 'Pedidoventa',
      plural: 'Pedidoventa',
      path: 'Pedidoventa',
      idName: 'id',
      properties: {
        "id": {
          name: 'id',
          type: 'number'
        },
        "nroPedido": {
          name: 'nroPedido',
          type: 'number'
        },
        "fechaPedido": {
          name: 'fechaPedido',
          type: 'Date'
        },
        "fechaEstimadaEntrega": {
          name: 'fechaEstimadaEntrega',
          type: 'Date'
        },
        "gastosEnvio": {
          name: 'gastosEnvio',
          type: 'number'
        },
        "estado": {
          name: 'estado',
          type: 'string'
        },
        "entregado": {
          name: 'entregado',
          type: 'number'
        },
        "subTotal": {
          name: 'subTotal',
          type: 'number'
        },
        "montoTotal": {
          name: 'montoTotal',
          type: 'number'
        },
        "clienteId": {
          name: 'clienteId',
          type: 'number'
        },
        "domicilioId": {
          name: 'domicilioId',
          type: 'number'
        },
      },
      relations: {
      }
    }
  }
}

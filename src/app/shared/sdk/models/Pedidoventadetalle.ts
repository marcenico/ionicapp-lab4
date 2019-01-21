/* tslint:disable */
import {
  Pedidoventa,
  Articulo
} from '../index';

declare var Object: any;
export interface PedidoventadetalleInterface {
  "id"?: number;
  "cantidad": number;
  "subTotal": number;
  "porcentajeDescuento": number;
  "articuloId": number;
  "pedidoVentaId": number;
  pedidoventa?: Pedidoventa;
  articulo?: Articulo;
}

export class Pedidoventadetalle implements PedidoventadetalleInterface {
  "id": number;
  "cantidad": number;
  "subTotal": number;
  "porcentajeDescuento": number;
  "articuloId": number;
  "pedidoVentaId": number;
  pedidoventa: Pedidoventa;
  articulo: Articulo;
  constructor(data?: PedidoventadetalleInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Pedidoventadetalle`.
   */
  public static getModelName() {
    return "Pedidoventadetalle";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Pedidoventadetalle for dynamic purposes.
  **/
  public static factory(data: PedidoventadetalleInterface): Pedidoventadetalle{
    return new Pedidoventadetalle(data);
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
      name: 'Pedidoventadetalle',
      plural: 'Pedidoventadetalles',
      path: 'Pedidoventadetalles',
      idName: 'id',
      properties: {
        "id": {
          name: 'id',
          type: 'number'
        },
        "cantidad": {
          name: 'cantidad',
          type: 'number'
        },
        "subTotal": {
          name: 'subTotal',
          type: 'number'
        },
        "porcentajeDescuento": {
          name: 'porcentajeDescuento',
          type: 'number'
        },
        "articuloId": {
          name: 'articuloId',
          type: 'number'
        },
        "pedidoVentaId": {
          name: 'pedidoVentaId',
          type: 'number'
        },
      },
      relations: {
        pedidoventa: {
          name: 'pedidoventa',
          type: 'Pedidoventa',
          model: 'Pedidoventa',
          relationType: 'belongsTo',
                  keyFrom: 'pedidoVentaId',
          keyTo: 'id'
        },
        articulo: {
          name: 'articulo',
          type: 'Articulo',
          model: 'Articulo',
          relationType: 'belongsTo',
                  keyFrom: 'articuloId',
          keyTo: 'id'
        },
      }
    }
  }
}

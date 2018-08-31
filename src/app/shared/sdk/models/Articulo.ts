/* tslint:disable */

declare var Object: any;
export interface ArticuloInterface {
  "id": number;
  "denominacion": string;
  "codigo": string;
  "preciocompra": number;
  "precioventa": number;
  "iva": number;
  "rubroId": number;
  "createdAt"?: Date;
  "updatedAt"?: Date;
}

export class Articulo implements ArticuloInterface {
  "id": number;
  "denominacion": string;
  "codigo": string;
  "preciocompra": number;
  "precioventa": number;
  "iva": number;
  "rubroId": number;
  "createdAt": Date;
  "updatedAt": Date;
  constructor(data?: ArticuloInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Articulo`.
   */
  public static getModelName() {
    return "Articulo";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Articulo for dynamic purposes.
  **/
  public static factory(data: ArticuloInterface): Articulo{
    return new Articulo(data);
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
      name: 'Articulo',
      plural: 'Articulos',
      path: 'Articulos',
      idName: 'id',
      properties: {
        "id": {
          name: 'id',
          type: 'number'
        },
        "denominacion": {
          name: 'denominacion',
          type: 'string'
        },
        "codigo": {
          name: 'codigo',
          type: 'string'
        },
        "preciocompra": {
          name: 'preciocompra',
          type: 'number'
        },
        "precioventa": {
          name: 'precioventa',
          type: 'number'
        },
        "iva": {
          name: 'iva',
          type: 'number'
        },
        "rubroId": {
          name: 'rubroId',
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
      }
    }
  }
}

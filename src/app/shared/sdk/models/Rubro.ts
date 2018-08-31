/* tslint:disable */

declare var Object: any;
export interface RubroInterface {
  "id": number;
  "codigo": string;
  "denominacion": string;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  "rubroPadreId"?: number;
}

export class Rubro implements RubroInterface {
  "id": number;
  "codigo": string;
  "denominacion": string;
  "createdAt": Date;
  "updatedAt": Date;
  "rubroPadreId": number;
  constructor(data?: RubroInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Rubro`.
   */
  public static getModelName() {
    return "Rubro";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Rubro for dynamic purposes.
  **/
  public static factory(data: RubroInterface): Rubro{
    return new Rubro(data);
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
      name: 'Rubro',
      plural: 'Rubros',
      path: 'Rubros',
      idName: 'id',
      properties: {
        "id": {
          name: 'id',
          type: 'number'
        },
        "codigo": {
          name: 'codigo',
          type: 'string'
        },
        "denominacion": {
          name: 'denominacion',
          type: 'string'
        },
        "createdAt": {
          name: 'createdAt',
          type: 'Date'
        },
        "updatedAt": {
          name: 'updatedAt',
          type: 'Date'
        },
        "rubroPadreId": {
          name: 'rubroPadreId',
          type: 'number'
        },
      },
      relations: {
      }
    }
  }
}

/* tslint:disable */

declare var Object: any;
export interface MigrationsInterface {
  "id"?: number;
  "migration": string;
  "batch": number;
}

export class Migrations implements MigrationsInterface {
  "id": number;
  "migration": string;
  "batch": number;
  constructor(data?: MigrationsInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Migrations`.
   */
  public static getModelName() {
    return "Migrations";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Migrations for dynamic purposes.
  **/
  public static factory(data: MigrationsInterface): Migrations{
    return new Migrations(data);
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
      name: 'Migrations',
      plural: 'Migrations',
      path: 'Migrations',
      idName: 'id',
      properties: {
        "id": {
          name: 'id',
          type: 'number'
        },
        "migration": {
          name: 'migration',
          type: 'string'
        },
        "batch": {
          name: 'batch',
          type: 'number'
        },
      },
      relations: {
      }
    }
  }
}

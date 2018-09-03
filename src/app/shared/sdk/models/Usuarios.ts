/* tslint:disable */

declare var Object: any;
export interface UsuariosInterface {
  "id"?: number;
  "name": string;
  "email": string;
  "password": string;
  "rememberToken"?: string;
  "createdAt"?: Date;
  "updatedAt"?: Date;
}

export class Usuarios implements UsuariosInterface {
  "id": number;
  "name": string;
  "email": string;
  "password": string;
  "rememberToken": string;
  "createdAt": Date;
  "updatedAt": Date;
  constructor(data?: UsuariosInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Usuarios`.
   */
  public static getModelName() {
    return "Usuarios";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Usuarios for dynamic purposes.
  **/
  public static factory(data: UsuariosInterface): Usuarios{
    return new Usuarios(data);
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
      name: 'Usuarios',
      plural: 'Usuarios',
      path: 'Usuarios',
      idName: 'id',
      properties: {
        "id": {
          name: 'id',
          type: 'number'
        },
        "name": {
          name: 'name',
          type: 'string'
        },
        "email": {
          name: 'email',
          type: 'string'
        },
        "password": {
          name: 'password',
          type: 'string'
        },
        "rememberToken": {
          name: 'rememberToken',
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
      },
      relations: {
      }
    }
  }
}

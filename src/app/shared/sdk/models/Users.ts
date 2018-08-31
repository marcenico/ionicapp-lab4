/* tslint:disable */

declare var Object: any;
export interface UsersInterface {
  "id": number;
  "name": string;
  "email": string;
  "password": string;
  "rememberToken"?: string;
  "createdAt"?: Date;
  "updatedAt"?: Date;
}

export class Users implements UsersInterface {
  "id": number;
  "name": string;
  "email": string;
  "password": string;
  "rememberToken": string;
  "createdAt": Date;
  "updatedAt": Date;
  constructor(data?: UsersInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Users`.
   */
  public static getModelName() {
    return "Users";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Users for dynamic purposes.
  **/
  public static factory(data: UsersInterface): Users{
    return new Users(data);
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
      name: 'Users',
      plural: 'Users',
      path: 'Users',
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

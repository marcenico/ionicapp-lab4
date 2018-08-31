/* tslint:disable */

declare var Object: any;
export interface PasswordResetsInterface {
  "email": string;
  "token": string;
  "createdAt": Date;
  "id"?: number;
}

export class PasswordResets implements PasswordResetsInterface {
  "email": string;
  "token": string;
  "createdAt": Date;
  "id": number;
  constructor(data?: PasswordResetsInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `PasswordResets`.
   */
  public static getModelName() {
    return "PasswordResets";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of PasswordResets for dynamic purposes.
  **/
  public static factory(data: PasswordResetsInterface): PasswordResets{
    return new PasswordResets(data);
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
      name: 'PasswordResets',
      plural: 'PasswordResets',
      path: 'PasswordResets',
      idName: 'id',
      properties: {
        "email": {
          name: 'email',
          type: 'string'
        },
        "token": {
          name: 'token',
          type: 'string'
        },
        "createdAt": {
          name: 'createdAt',
          type: 'Date'
        },
        "id": {
          name: 'id',
          type: 'number'
        },
      },
      relations: {
      }
    }
  }
}

import { AddressModel } from './address.model';

export class UserModel {
  public id: number;
  public firstname: string;
  public lastname: string;
  public phone: string;
  public email: string;
  public address: AddressModel;
  public avatar: string;

  constructor (data: any = {}) {
    console.log('bmbmbmbmbm')
    this.id = data.id || void 0;
    this.firstname = data.firstname || void 0;
    this.lastname = data.lastname || void 0;
    this.phone = data.phone || void 0;
    this.email = data.email || void 0;
    this.firstname = data.firstname || void 0;
    this.avatar = data.avatar || void 0;
    console.log('?')
    console.log(new AddressModel(data.address))
    this.address = data.address ? new AddressModel(data.address) : void 0;
  }
}

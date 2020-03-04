import { AddressModel } from './address.model';

export class UserModel {

  public id: number;
  public firstname: string;
  public lastname: string;
  public phone: string;
  public email: string;
  public birthday: Date;
  public address: AddressModel;
  public avatar: any;

  public constructor(data: any = {}) {
    this.id = data.id || undefined;
    this.firstname = data.firstname || undefined;
    this.lastname = data.lastname || undefined;
    this.phone = data.phone || undefined;
    this.email = data.email || undefined;
    this.birthday = new Date(data.birthday) || undefined;
    this.avatar = data.avatar || undefined;
    this.address = data.address ? new AddressModel(data.address) : undefined;
  }

}

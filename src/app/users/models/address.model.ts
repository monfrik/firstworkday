import { StateModel } from './state.model';

export class AddressModel {

  public state: StateModel;
  public city: string;
  public street: string;
  public zipcode: string;

  public constructor(data: any = {}) {
    this.state = data.state ? new StateModel(data.state) : undefined;
    this.city = data.city || undefined;
    this.street = data.street || undefined;
    this.zipcode = data.zipcode || undefined;
  }

}

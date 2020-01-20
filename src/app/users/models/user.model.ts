export class UserModel {
  public id: number;
  public firstname: string;
  public lastname: string;
  public phone: string;
  public email: string;
  public adress: AdressModel;
  public avatar: string;

  constructor (data: any = {}) {
    this.id = data.id || void 0;
    this.firstname = data.firstname || void '';
    this.lastname = data.lastname || void '';
    this.phone = data.phone || void '';
    this.email = data.email || void '';
    this.firstname = data.firstname || void '';
    this.avatar = data.avatar || void '';
    this.adress = data.adress || void new AdressModel;
  }
}

export class AdressModel {
  public state: StateModel;
  public city: string;
  public street: string;
  public zipcode: string | number;

  constructor (data: any = {}) {
    this.state = new StateModel(data.state);
    this.city = data.phone || void '';
    this.street = data.email || void '';
    this.zipcode = data.firstname || void '';
  }
}

export class StateModel {
  public shortname: string;
  public name: string;
  
  constructor (data: any = {}) {
    this.shortname = data.shortname || void '';
    this.name = data.name || void '';
  }
}
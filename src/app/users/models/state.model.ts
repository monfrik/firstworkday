export class StateModel {
  public shortname: string;
  public name: string;
  
  constructor (data: any = {}) {
    this.shortname = data.shortname || void 0;
    this.name = data.name || void 0;
  }
}

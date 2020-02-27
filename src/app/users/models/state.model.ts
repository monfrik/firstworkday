export class StateModel {

  public shortname: string;
  public name: string;

  public constructor(data: any = {}) {
    this.shortname = data.shortname || undefined;
    this.name = data.name || undefined;
  }

}

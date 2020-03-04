export interface IFormStepperData {
  firstFormGroup: IFirstFormGroup;
  secondFormGroup: ISecondFormGroup;
  thirdFormGroup: IThirdFormGroup;
}

export interface IFirstFormGroup {
  firstname: string;
  lastname: string;
  phone: string;
  email: string;
  birthday: Date;
}

export interface ISecondFormGroup {
  name: string;
  shortname: string;
  city: string;
  street: string;
  zipcode: string;
}

export interface IThirdFormGroup {
  avatar: any;
}

import { FormGroup } from '@angular/forms';

import { statesNameType, statesShortNameType } from '@utils';

export interface IFormsGroup {
  personalInfoForm: FormGroup;
  addressInfoForm: FormGroup;
  additionalInfoForm: FormGroup;
}

export interface IFormsGroupValue {
  personalInfoForm: IPersonalInfo;
  addressInfoForm: IAddressInfo;
  additionalInfoForm: IAdditionalInfo;
}

export interface IPersonalInfo {
  firstname: string;
  lastname: string;
  phone: string;
  email: string;
  birthday: Date;
}

export interface IAddressInfo {
  state: statesNameType;
  stateshort: statesShortNameType;
  city: string;
  street: string;
  zipcode: string;
}

export interface IAdditionalInfo {
  avatar: string;
}

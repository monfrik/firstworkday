import { IPhoneCountryFormat } from './phone-country-format.interface';

export interface IPhoneGroup {
  phone: string;
  countryFormat: IPhoneCountryFormat;
}

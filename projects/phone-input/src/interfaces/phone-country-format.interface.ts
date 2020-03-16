import { CountryCode } from 'libphonenumber-js';


export interface IPhoneCountryFormat {
  country: CountryCode;
  callingCode: string;
}

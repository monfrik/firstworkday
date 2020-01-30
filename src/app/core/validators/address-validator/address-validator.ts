export class AddressValidator {
  static getValidatorErrorMessage(validatorName: string) {
    let config = {
      required: 'Required',
      invalidCity: 'Invalid city',
      invalidStreet: 'Invalid street',
      invalidZipcode: 'Invalid zip code',
    };

    return config[validatorName];
  }
  
  static cityValidator(control) {
    if (!control.value) {
      return { invalidName: true };
    }
    if (
      !control.value.match(
        /^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]+$/
      )
    ) {
      return { invalidCity: true };
    }
    return null;
  }

  static streetValidator(control) {
    if (!control.value) {
      return { invalidName: true };
    }
    if (
      !control.value.match(
        /^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]+$/
      )
    ) {
      return { invalidStreet: true };
    }
    return null;
  }

  static zipcodeValidator(control) {
    if (!control.value) {
      return { invalidName: true };
    }
    if (!control.value.match(/^([0-9]{3})\-([0-9]{3})$/)) {
      return { invalidZipcode: true };
    }
    return null;
  }

}
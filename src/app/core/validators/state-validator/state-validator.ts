export class StateValidator {
  static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
    let config = {
      required: 'Required',
      invalidState: 'Invalid state',
      invalidShortname: 'Invalid state abbr.',
    };

    return config[validatorName];
  }
  
  static nameValidator(control) {
    if (
      !control.value.match(
        /^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]+$/
      )
    ) {
      return { invalidName: true };
    }
    return null;
  }

  static shortnameValidator(control) {
    if (!control.value.match(/^([A-Z]{2})$/)) {
      return { invalidShortname: true };
    }
    return null;
  }

}
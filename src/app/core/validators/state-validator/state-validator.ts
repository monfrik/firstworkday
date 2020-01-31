export class StateValidator {
  static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
    const config = {
      required: 'Required',
      invalidState: 'Invalid state',
      invalidShortname: 'Invalid state abbr. State abbr. template - AA',
    };

    return config[validatorName];
  }

  static nameValidator(control) {
    if (!control.value) {
      return { invalidName: true };
    }
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
    if (!control.value) {
      return { invalidName: true };
    }
    if (!control.value.match(/^([A-Z]{2})$/)) {
      return { invalidShortname: true };
    }
    return null;
  }
}

export class UserValidator {
  static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
    const config = {
      required: 'Required',
      invalidEmailAddress: 'Invalid email address',
      invalidName: 'Invalid name. Name can only contain: a-z, A-Z, 0-9, `',
      invalidPhone: 'Invalid phone. Phone template: (000)-000-0000',
    };

    return config[validatorName];
  }

  static nameValidator(control: any = {}) {
    if (!control.value) {
      return { invalidName: true };
    }
    if (
      !control.value.match(
        /^[a-zA-Z0-9`]{1,100}$/
      )
    ) {
      return { invalidName: true };
    }
    return null;
  }

  static emailValidator(control: any = {}) {
    if (!control.value) {
      return { invalidName: true };
    }
    if (
      !control.value.match(
        new RegExp([
          "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*",
          '@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?'
        ].join(''))
      )
    ) {
      return { invalidEmailAddress: true };
    }
    return null;
  }

  static phoneValidator(control: any = {}) {
    if (!control.value) {
      return { invalidName: true };
    }
    if (
      !control.value.match(
        /(\([0-9]{3}\))\ ([0-9]{3})\-([0-9]{2}\-?[0-9]{2})/
      )
    ) {
      return { invalidPhone: true };
    }
    return null;
  }
}

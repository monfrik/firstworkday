import {
  Component,
  Input,
  EventEmitter,
  Output,
  OnInit,
} from '@angular/core';
import { Validators, FormControl } from '@angular/forms';

import { FileUploadValidators } from '@iplab/ngx-file-upload';

import { UserValidator } from '@core/validators/user-validator';
import { AddressValidator } from '@core/validators/address-validator';
import { StateValidator } from '@core/validators/state-validator';
import { UsersService } from '../../services/users';
import { UserModel } from '../../models/user.model';
import { AddressModel } from '../../models/address.model';
import { StateModel } from '../../models/state.model';


@Component({
  selector: 'app-form-stepper',
  templateUrl: './form-stepper.component.html',
  styleUrls: ['./form-stepper.component.scss'],
  providers: [ UsersService ],
})

export class FormStepperComponent implements OnInit{

  @Input()
  public formGroup;

  @Output()
  public updateStepper = new EventEmitter();

  public ngOnInit(): void {
    this.formGroup.controls.firstFormGroup.addControl('firstname', new FormControl('', [Validators.required, UserValidator.nameValidator]))
    this.formGroup.controls.firstFormGroup.addControl('lastname', new FormControl('', [Validators.required, UserValidator.nameValidator]))
    this.formGroup.controls.firstFormGroup.addControl('phone', new FormControl('', [Validators.required, UserValidator.phoneValidator]))
    this.formGroup.controls.firstFormGroup.addControl('email', new FormControl('', [Validators.required, UserValidator.emailValidator]))
  } 
  
  public onUpdateFirstStep(data): void {
    console.log('onUpdateFirstStep', data);
    this.updateStepper.emit(data);
  }

  public submit(): void {}

  public get firstFormGroup() {
    return this.formGroup.controls.firstFormGroup;
  }

  public get secondFormGroup() {
    return this.formGroup.controls.secondFormGroup;
  }
  
  public get thirdFormGroup() {
    return this.formGroup.controls.thirdFormGroup;
  }

}
// this.userValidations = {
//   firstname: ['', [Validators.required, UserValidator.nameValidator]],
//   lastname: ['', [Validators.required, UserValidator.nameValidator]],
//   phone: ['', [Validators.required, UserValidator.phoneValidator]],
//   email: ['', [Validators.required, UserValidator.emailValidator]],
//   avatar: [[], [Validators.required, FileUploadValidators.filesLimit(1)]],
//   address: {
//     state: {
//       name: ['', [Validators.required, StateValidator.nameValidator]],
//       shortname: ['', [Validators.required, StateValidator.shortnameValidator]],
//     },
//     city: ['', [Validators.required, AddressValidator.cityValidator]],
//     street: ['', [Validators.required, AddressValidator.streetValidator]],
//     zipcode: ['', [Validators.required, AddressValidator.zipcodeValidator]],
//   }
// }
// this.userData = {
//   firstname: '',
//   lastname: '',
//   phone: '',
//   email: '',
//   avatar: [],
//   address: {
//     state: {
//       name: '',
//       shortname: '',
//     },
//     city: '',
//     street: '',
//     zipcode: '',
//   }
// }
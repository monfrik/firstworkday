import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl
} from '@angular/forms';

import { FileUploadValidators } from '@iplab/ngx-file-upload';

import { UsersService } from '../../services/users';
import { UserModel } from '../../models/user.model';
import { AddressModel } from '../../models/address.model';
import { StateModel } from '../../models/state.model';
import { UserValidator } from '@core/validators/user-validator';
import { AddressValidator } from '@core/validators/address-validator';
import { StateValidator } from '@core/validators/state-validator';


@Component({
  selector: 'app-form-stepper',
  templateUrl: './form-stepper.component.html',
  styleUrls: ['./form-stepper.component.scss'],
  providers: [ UsersService ],
})

export class FormStepperComponent {

  @Input()
  public firstFormGroup: FormGroup;
  
  @Input()
  public secondFormGroup: FormGroup;

  @Input()
  public thirdFormGroup: FormGroup;

  @Output()
  public formSubmit = new EventEmitter();

  public submit(): void {
    this.formSubmit.emit({
      firstFormGroup: this.firstFormGroup,
      secondFormGroup: this.secondFormGroup,
      thirdFormGroup: this.thirdFormGroup
    })
  }

}

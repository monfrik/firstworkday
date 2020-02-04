import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { ZIPCODE_MASK } from '@app/utils';


@Component({
  selector: 'app-second-step',
  templateUrl: './second-step.component.html',
  styleUrls: ['./second-step.component.scss']
})

export class SecondStepComponent {

  public mask: (string | RegExp)[] = ZIPCODE_MASK;

  @Input()
  public formGroup: FormGroup;

}

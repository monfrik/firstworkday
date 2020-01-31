import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'app-second-step',
  templateUrl: './second-step.component.html',
  styleUrls: ['./second-step.component.scss']
})

export class SecondStepComponent {

  public mask: Array<string | RegExp> = [/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];

  @Input()
  public formGroup: FormGroup;

}

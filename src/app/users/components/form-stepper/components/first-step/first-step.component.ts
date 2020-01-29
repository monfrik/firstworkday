import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

import { FormGroup } from '@angular/forms';


@Component({
  selector: 'app-first-step',
  templateUrl: './first-step.component.html',
  styleUrls: ['./first-step.component.scss']
})

export class FirstStepComponent implements OnInit {
  
  public mask: Array<string | RegExp> = ['+1 (', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]

  @Input()
  public formGroup: FormGroup;

  @Output()
  public updateFirstStep = new EventEmitter();

  public ngOnInit(): void {
    this.onValueChanges();
  }

  public onValueChanges(): void {
    this.formGroup.valueChanges
      .subscribe( val => {
        console.log('first step change', val);
        this.updateFirstStep.emit(val);
      });
  }

}

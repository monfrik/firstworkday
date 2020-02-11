import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

import {
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';

import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

import { MatAutocompleteSelectedEvent, MatChipInputEvent } from '@angular/material';

import { UserModel } from '@app/users/models';

import {
  PHONE_PATTERN,
  STATE_PATTERN,
  NAME_PATTERN,
  PHONE_MASK,
  STATES,
} from '@app/utils';


@Component({
  selector: 'app-table-filter',
  templateUrl: './table-filter.component.html',
  styleUrls: ['./table-filter.component.scss']
})

export class TableFilterComponent implements OnInit {

  @Input()
  public data: UserModel[] = [];

  @Output()
  public applyFilter = new EventEmitter;

  public filtersForm: FormGroup;
  public filteredUsers: Observable<UserModel[]>;
  public users: UserModel[] = [];
  
  public states = STATES;

  public dateStart = new Date(-8640000000000);
  public dateEnd = new Date();
  public currentDate = new Date();

  public constructor(
    private readonly _formBuilder: FormBuilder,
  ) {}

  public ngOnInit(): void {
    this._initialisationForm();
    this._formSubscribe();
  }

  public get submitColor(): string {
    if (this.filtersForm.invalid && (this.filtersForm.dirty || this.filtersForm.touched)) {
      return 'warn';
    }
    return '';
  }

  public add(event: MatChipInputEvent): void {
    event.input.value = '';
    this.filtersForm.get('userName').setValue('');
  }

  public remove(user: UserModel): void {
    const index = this.users.indexOf(user);
    if (index >= 0) {
      this.users.splice(index, 1);
    }
  }

  public selected(event: MatAutocompleteSelectedEvent): void {
    this.users.push(this.data[event.option.value-1]);
    this.filtersForm.get('userName').setValue('');
  }

  public changeDate(): void {
    if (this.filtersForm.value.dateStart) {
      this.dateStart.setTime(this.filtersForm.value.dateStart.getTime());
    }
    if (this.filtersForm.value.dateEnd) {
      this.dateEnd.setTime(this.filtersForm.value.dateEnd.getTime());
    }
  }

  public submit(): void {
    if (this.filtersForm.touched && this.filtersForm.valid) {
      const usersId = this.users.map(element => element.id);
      const currentState = this.filtersForm.get('state').value;
      const {dateStart, dateEnd, phone} = this.filtersForm.value;
      const state = STATES.find(element => element.name === currentState);

      const emitData = {
        state: state ? state.shortname : '',
        usersId,
        phone,
        dateStart,
        dateEnd,
      }
      
      this.applyFilter.emit(emitData);
    }
  }

  private _initialisationForm(): void {
    this.filtersForm = this._formBuilder.group({
      userName: ['', [Validators.pattern(NAME_PATTERN)]],
      phone: ['', [Validators.pattern(/^\d{1,10}$/)]],
      state: ['', [Validators.pattern(STATE_PATTERN)]],
      dateStart: [null],
      dateEnd: [null],
    });
  }

  private _formSubscribe(): void {
    this.filteredUsers = this.filtersForm.valueChanges
      .pipe(
        startWith(null),
        map((formData: any | null) => {
          if (formData) {
            return this._filter(formData.userName);
          }
          if (this.data) {
            return this.data.slice();
          }
          return [];
        })
      );
  }

  private _filter(value: string): UserModel[] {
    const filterValue = value.toString().toLowerCase();

    return this.data.filter((user: UserModel) => {
      const userName = user.firstname.toLowerCase() + ' ' + user.lastname.toLowerCase();
      return userName.indexOf(filterValue) > -1;
    });
  }

}

import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import {
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';

import { Observable, Subject } from 'rxjs';
import { startWith, map, takeUntil } from 'rxjs/operators';

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

  public dateStart: Date;
  public dateEnd = new Date();
  public currentDate = new Date();

  private _destroyed$ = new Subject<void>();

  public constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _route: ActivatedRoute,
  ) {}

  public ngOnInit(): void {
    this._initialisationForm();
    this._formSubscribe();
    this._initFiltres();
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

  // public changeDate(): void {
  //   if (this.filtersForm.value.dateStart) {
  //     this.dateStart.setTime(this.filtersForm.value.dateStart.getTime());
  //   }
  //   if (this.filtersForm.value.dateEnd) {
  //     this.dateEnd.setTime(this.filtersForm.value.dateEnd.getTime());
  //   }
  // }

  public resetForm(): void {
    this.filtersForm.reset();
    const emitData = {
      usersId: [],
      state: '',
      phone: '',
      dateStart: '',
      dateEnd: '',
    }
    this.applyFilter.emit(emitData);
  }

  public submit(): void {
    if (this.filtersForm.valid) {
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
    // this.filteredUsers = this.filtersForm.valueChanges
    //   .pipe(
    //     startWith(null),
    //     map((formData: any | null) => {
    //       console.log('formData', formData);
    //       console.log('1')
    //       if (formData) {
    //         console.log('2')
    //         if (this.dateStart !== formData.dateStart) {
    //           console.log('3')
    //           this.dateStart = formData.dateStart;
    //         }
    //         if (this.dateEnd !== formData.dateEnd) {
    //           console.log('4')
    //           this.dateEnd = formData.dateEnd;
    //         }
    //         return this._filter(formData.userName);
    //       }
    //       if (this.data) {
    //         return this.data.slice();
    //       }
    //       return [];
    //     })
    //   );

      this.filtersForm.get('dateStart')
      .valueChanges
      .pipe(
        takeUntil(this._destroyed$)
      )
      .subscribe((value: Date)=> {
        debugger;
        if (!this.dateStart && value) {
          this.dateStart = value
        }
        if (!!value && this.dateStart.getTime() !== value.getTime()) {
          this.dateStart = value;
        }
      });

      this.filtersForm.get('dateEnd')
      .valueChanges
      .pipe(
        takeUntil(this._destroyed$)
      )
      .subscribe((value: Date)=> {
        if (!this.dateEnd && value) {
          this.dateEnd = value
        }
        if (!!value && this.dateEnd.getTime() !== value.getTime()) {
          this.dateEnd = value;
        }
      });
  }

  private _filter(value: string): UserModel[] {
    let filterValue = '';
    if (value) {
      filterValue = value.toString().toLowerCase();
    }

    return this.data.filter((user: UserModel) => {
      const userName = user.firstname.toLowerCase() + ' ' + user.lastname.toLowerCase();
      return userName.indexOf(filterValue) > -1;
    });
  }

  private _initFiltres(): void {
    const {usersId, phone, state, dateStart, dateEnd} = this._route.snapshot.queryParams;
    this.filtersForm.patchValue({
      phone,
      state,
      dateStart,
      dateEnd
    });
    if (usersId) {
      if (typeof(usersId) === 'string') {
        this.users.push(this.data[parseInt(usersId)-1]);
      } else {
        usersId.forEach((idUser) => {
          this.users.push(this.data[idUser-1]);
        });
      }
    }
    
  }

}

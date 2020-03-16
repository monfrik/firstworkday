import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnDestroy,
  ChangeDetectionStrategy,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';

import { MatAutocompleteSelectedEvent, MatChipInputEvent } from '@angular/material';

import { Subject } from 'rxjs';
import {
  map,
  takeUntil,
  startWith,
  filter
} from 'rxjs/operators';

import { UserModel } from '@app/users/models';
import { IRouterParams } from '@app/core/interfaces';

import {
  STATE_PATTERN,
  NAME_PATTERN,
  STATES,
} from '@utils';


@Component({
  selector: 'app-table-filter',
  templateUrl: './table-filter.component.html',
  styleUrls: ['./table-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class TableFilterComponent implements OnInit, OnDestroy {

  @Input()
  set users(users: UserModel[]) {
    this._allUsers = users;
    this.filteredUsers = users || null;
  }

  @Output()
  public readonly applyFilter = new EventEmitter<IRouterParams>();

  public filtersForm: FormGroup;
  public filteredUsers: UserModel[];
  public _allUsers: UserModel[];
  public selectedUsers: UserModel[] = [];

  public readonly states = STATES;

  public dateStart: Date;
  public dateEnd = new Date();
  public readonly currentDate = new Date();

  private readonly _destroyed$ = new Subject<void>();

  public constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _activatedRoute: ActivatedRoute,
  ) {}

  get submitColor(): string {
    return this.filtersForm.invalid && (this.filtersForm.dirty || this.filtersForm.touched)
    ? 'warn'
    : '';
  }

  public ngOnInit(): void {
    this._initialisationForm();
    this._formSubscribe();
    this._initFiltres();
  }

  public ngOnDestroy(): void {
    this._destroyed$.next();
    this._destroyed$.complete();
  }

  public onMatChipInputTokenEnd(event: MatChipInputEvent): void {
    event.input.value = '';
    this.filtersForm.get('userName').setValue('');
  }

  public onRemoveUserFromChipList(user: UserModel): void {
    const index = this.selectedUsers.indexOf(user);
    if (index >= 0) {
      this.selectedUsers.splice(index, 1);
    }
  }

  public onOptionSelected(event: MatAutocompleteSelectedEvent): void {
    const selectedUser = this._allUsers[event.option.value - 1];
    this.selectedUsers.push(selectedUser);
    this.filtersForm.get('userName').setValue('');
  }

  public resetForm(): void {
    this.filtersForm.reset();
    this.selectedUsers = [];
    const emitData = {
      usersId: [],
      state: '',
      phone: '',
      dateStart: '',
      dateEnd: '',
    };
    this.applyFilter.emit(emitData);
  }

  public submit(): void {
    if (this.filtersForm.invalid) {
      return;
    }

    const { dateStart, dateEnd, phone, state } = this.filtersForm.value;

    const usersId = this.selectedUsers.map((selectedUser) => +selectedUser.id);

    const emitData = {
      state,
      usersId,
      phone,
      dateStart,
      dateEnd,
    };

    this.applyFilter.emit(emitData);
  }

  public trackByFn(index: number): number {
    return index;
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
    this.filtersForm.get('userName')
      .valueChanges
      .pipe(
        takeUntil(this._destroyed$),
        startWith(null),
      )
      .subscribe({
        next: (userName: string) => {
          this.filteredUsers = this._filterUsersByName(userName);
        },
        error: () => {},
        complete: () => {},
      });

    this.filtersForm.get('dateStart')
      .valueChanges
      .pipe(
        takeUntil(this._destroyed$),
        filter((dateStart) => !!dateStart),
        map((dateStart: Date | string): Date => {
          return new Date(dateStart);
        }),
      )
      .subscribe({
        next: (dateStart: Date): void => {
          this.dateStart = dateStart;
        },
        error: () => {},
        complete: () => {},
      });

    this.filtersForm.get('dateEnd')
      .valueChanges
      .pipe(
        filter((dateEnd) => !!dateEnd),
        map((dateEnd: Date | string): Date => {
          return new Date(dateEnd);
        }),
        takeUntil(this._destroyed$),
      )
      .subscribe({
        next: (dateEnd: Date): void => {
          this.dateEnd = dateEnd;
        },
        error: () => {},
        complete: () => {},
      });
  }

  private _filterUsersByName(value: any): UserModel[] {
    if (typeof value !== 'string') {
      return this._allUsers;
    }

    const filterValue = value.toLowerCase();

    return this._allUsers.filter((user: UserModel): boolean => {
      const userName = `${user.firstname.toLowerCase()} ${user.lastname.toLowerCase()}`;
      return userName.indexOf(filterValue) > -1;
    });
  }

  private _initFiltres(): void {
    const { usersId, phone, state, dateStart, dateEnd } = this._activatedRoute.snapshot.queryParams;

    this.filtersForm.patchValue({
      phone,
      dateStart,
      dateEnd,
      state,
    });

    if (usersId) {
      if (typeof usersId === 'string') {
        this.selectedUsers.push(this._allUsers[+usersId - 1]);
      } else {
        usersId.forEach((idUser: string): void => {
          this.selectedUsers.push(this._allUsers[+idUser - 1]);
        });
      }
    }
  }

}

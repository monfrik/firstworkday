import {
  Component,
  Input,
  OnInit
} from '@angular/core';

import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';

import { UserModel } from '@app/users/models';

import { Observable } from 'rxjs';
import { startWith, map, tap } from 'rxjs/operators';

import {
  PHONE_PATTERN,
  STATE_PATTERN,
  NAME_PATTERN,
} from '@app/utils';


@Component({
  selector: 'app-table-filter',
  templateUrl: './table-filter.component.html',
  styleUrls: ['./table-filter.component.scss']
})

export class TableFilterComponent implements OnInit {

  @Input()
  public data: UserModel[];

  public filtersForm: FormGroup;
  public filteredData: Observable<UserModel[]>;

  public constructor(
    private readonly _formBuilder: FormBuilder,
  ) {}

  public ngOnInit(): void {
    this._initialisationForm();
    this._formSubscribe();
  }

  private _initialisationForm(): void {
    this.filtersForm = this._formBuilder.group({
      userName: ['', [Validators.pattern(NAME_PATTERN)]],
      phone: ['', [Validators.pattern(PHONE_PATTERN)]],
      state: ['', [Validators.pattern(STATE_PATTERN)]],
    })
  }

  private _formSubscribe(): void {
    this.filtersForm.valueChanges
      .subscribe({
        next: (formData) => {
          console.log(formData);
          // this.filteredData = 
        }
      })
    // this.filteredData = this.filtersForm.valueChanges
    //   .pipe(
    //     startWith(null),
    //     tap(_ => console.log('1234567')),
    //     map(_ => console.log('1234567')),
    //     // map((userName: string | null) => userName ? this._filter(userName) : this.data.slice())
    //   );
  }

  private _filter(value: string): UserModel[] {
    const filterValue = value.toLowerCase();

    return this.data.filter((user: UserModel) => {
      const userName = user.firstname.toLowerCase() + ' ' + user.lastname.toLowerCase()
      return userName.indexOf(filterValue) > -1;
    })
  }


}

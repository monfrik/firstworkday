import {
  Component,
  ChangeDetectionStrategy,
  OnDestroy,
  Input,
  ViewChildren,
  QueryList,
  EventEmitter,
  Output,
  AfterViewInit,
  OnInit,
} from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { Subject } from 'rxjs';

import {
  NAME_PATTERN,
  EMAIL_PATTERN,
  CITY_PATTERN,
  STREET_PATTERN,
  ZIPCODE_PATTERN,
  STATE_PATTERN,
  STATE_SHORT_PATTERN,
  statesNameType,
  statesShortNameType,
} from '@utils';

import { AllowEmailService } from '@core/services';
import { UserModel } from '@app/users/models';
import { TabDirective } from '@app/users/directives';
import {
  IPersonalInfo,
  IAddressInfo,
  IAdditionalInfo,
  IFormsGroupValue
} from '@app/users/interfaces';


@Component({
  selector: 'app-forms-group',
  templateUrl: './forms-group.component.html',
  styleUrls: ['./forms-group.component.scss'],
  providers: [AllowEmailService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class FormsGroupComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input()
  set user(user: UserModel) {
    if (!user) {
      return;
    }

    if (this.formsGroup) {
      this._formsGroupUpdate(user);
    } else {
      this._initUserData = user;
    }
  }

  @Output()
  public readonly submitGroup = new EventEmitter<UserModel>();

  @Output()
  public readonly changeUser = new EventEmitter<UserModel>();

  @ViewChildren(TabDirective)
  public tabs: QueryList<TabDirective>;

  public activeTab: string;

  public formsGroup: FormGroup;
  public personalInfoForm: FormGroup;
  public addressInfoForm: FormGroup;
  public additionalInfoForm: FormGroup;

  private _initUserData: UserModel;
  private _destroy$ = new Subject<void>();

  public constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _allowEmailService: AllowEmailService,
  ) {}

  public get listActive(): boolean {
    return this.activeTab === 'list';
  }

  public get stepperActive(): boolean {
    return this.activeTab === 'stepper';
  }

  public ngOnInit(): void {
    this._initForm();
    if (this._initUserData) {
      this._formsGroupUpdate(this._initUserData);
    }
  }

  public ngAfterViewInit(): void {
    this._setActivaTab();
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public onSubmit(user: UserModel): void {
    this.submitGroup.emit(user);
  }

  public onPacthForm(user: UserModel): void {
    this.changeUser.emit(user);
  }

  public onChangeTab(): void {
    this._setActivaTab();
  }

  private _initForm(): void {
    this.personalInfoForm = this._formBuilder.group({
      firstname: ['', [Validators.required, Validators.pattern(NAME_PATTERN)]],
      lastname: ['', [Validators.required, Validators.pattern(NAME_PATTERN)]],
      phone: ['', [Validators.required]],
      email: [
        '',
        [Validators.required, Validators.pattern(EMAIL_PATTERN)],
        [this._allowEmailService.asyncEmailDomainValidator()],
      ],
      birthday: ['', [Validators.required]],
    });

    this.addressInfoForm = this._formBuilder.group({
      state: ['', [Validators.required, Validators.pattern(STATE_PATTERN)]],
      stateshort: ['', [Validators.required, Validators.pattern(STATE_SHORT_PATTERN)]],
      city: ['', [Validators.required, Validators.pattern(CITY_PATTERN)]],
      street: ['', [Validators.required, Validators.pattern(STREET_PATTERN)]],
      zipcode: ['', [Validators.required, Validators.pattern(ZIPCODE_PATTERN)]],
    });

    this.additionalInfoForm = this._formBuilder.group({
      avatar: [null],
    });

    this.formsGroup = this._formBuilder.group({
      personalInfoForm: this.personalInfoForm,
      addressInfoForm: this.addressInfoForm,
      additionalInfoForm: this.additionalInfoForm,
    });

    this.formsGroup.get('personalInfoForm').get('phone').valueChanges
      .subscribe((phone) => {
        console.log('phone', phone);
      })
  }

  private _setActivaTab(): void {
    const activeTab = this.tabs.find((tab) => tab.isActive);
    this.activeTab = activeTab
    ? activeTab.tab
    : this.tabs.first.tab;
  }

  private _formsGroupUpdate(user: UserModel): void {
    const personalInfoForm = this._getPersonalInfoFromModel(user);
    const addressInfoForm = this._getAddressInfoFromModel(user);
    const additionalInfoForm = this._getAdditionalInfoFromModel(user);

    const patchValue: IFormsGroupValue = {
      personalInfoForm,
      addressInfoForm,
      additionalInfoForm,
    };

    this.formsGroup.patchValue(patchValue);
  }

  private _getPersonalInfoFromModel(user: UserModel): IPersonalInfo {
    return {
      firstname: user.firstname,
      lastname: user.lastname,
      phone: user.phone,
      email: user.email,
      birthday: user.birthday,
    };
  }

  private _getAddressInfoFromModel(user: UserModel): IAddressInfo {
    return {
      state: user.address.state.name as statesNameType,
      stateshort: user.address.state.shortname as statesShortNameType,
      city: user.address.city,
      street: user.address.street,
      zipcode: user.address.zipcode,
    };
  }

  private _getAdditionalInfoFromModel(user: UserModel): IAdditionalInfo {
    return {
      avatar: user.avatar,
    };
  }

}

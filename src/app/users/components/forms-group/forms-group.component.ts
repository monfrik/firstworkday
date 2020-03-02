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
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subject } from 'rxjs';

import { UserModel } from '@app/users/models';
import { TabDirective } from '@app/users/directives';


@Component({
  selector: 'app-forms-group',
  templateUrl: './forms-group.component.html',
  styleUrls: ['./forms-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class FormsGroupComponent implements AfterViewInit, OnDestroy {

  @Input()
  public user: UserModel;

  @Output()
  public readonly submitGroup = new EventEmitter<UserModel>();

  @Output()
  public readonly changeUser = new EventEmitter<UserModel>();

  @ViewChildren(TabDirective)
  public tabs: QueryList<TabDirective>;

  public formStepper;
  public formList;

  public activeTab: string;

  private _destroy$ = new Subject<void>();

  public constructor(
    private readonly _activatedRoute: ActivatedRoute,
  ) {}

  public get listActive(): boolean {
    return this.activeTab === 'list';
  }

  public get stepperActive(): boolean {
    return this.activeTab === 'stepper';
  }

  public ngAfterViewInit(): void {
    this._setActivaTab();
  }

  public onSubmit(user: UserModel): void {
    this.submitGroup.emit(this._getUserWithId(user));
  }

  public onPacthForm(user: UserModel): void {
    this.changeUser.emit(this._getUserWithId(user));
  }

  public onChangeTab(): void {
    this._setActivaTab();
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  private _setActivaTab(): void {
    const activeTab = this.tabs.find((tab) => tab.isActive);
    this.activeTab = activeTab
    ? activeTab.tab
    : this.tabs.first.tab;
  }
  private _getUserWithId(user: UserModel): UserModel {
    const id = +this._activatedRoute.snapshot.params.id;
    return { ...user, ...{ id } };
  }

}

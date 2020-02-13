import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '@src/environments/environment';

export interface State {

}

export * from './users.reducer'

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];

import { createFeatureSelector, createSelector } from '@ngrx/store'

// strongly typing states

export interface IAppState {
  productList: any;
  paginationData: any;
}

//default state

export const defaultAppState: IAppState = {
  productList: [],
  paginationData: {}
}

//state selectors

const appStateSelector = createFeatureSelector<IAppState>('app');
export const productListSelector = createSelector(appStateSelector, state => state.productList);
export const paginationDataSelector = createSelector(appStateSelector, state => state.paginationData);
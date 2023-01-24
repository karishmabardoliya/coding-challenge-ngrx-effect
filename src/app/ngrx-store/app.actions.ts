import { Action } from '@ngrx/store'

//types of actions
export enum ActionTypes {
    isLoading = 'isLoading',
    productList = 'productList',
    productSuccess = 'productSuccess',
    paginatedData = 'paginatedData'
}

//Action creators

export class productListAction implements Action {
    readonly type: string = ActionTypes.productList
    constructor(public payload: any) { }
}

export class productListActionSuccess implements Action {
    readonly type: string = ActionTypes.productSuccess
    constructor(public payload: any) { }
}

export class paginatedDataAction implements Action {
    readonly type: string = ActionTypes.paginatedData
    constructor(public payload?: any) { }
}

//Feature Action type

export type actionType =
    | productListAction
    | productListActionSuccess
    | paginatedDataAction;

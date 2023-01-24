import * as appActions from '../ngrx-store/app.actions'
import * as appStates from '../ngrx-store/app.state';

export function AppReducer(state: appStates.IAppState = appStates.defaultAppState,
	action: appActions.actionType): appStates.IAppState {
	switch (action.type) {
		case appActions.ActionTypes.productSuccess:
			return {
				...state,
				productList: <Object>action.payload
			}

		case appActions.ActionTypes.paginatedData:
			return {
				...state,
				paginationData: <Object>action.payload
			}

		default:
			return {
				...state
			}
	}
}

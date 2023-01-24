import { Injectable, Pipe } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { ApiServiceService } from '../api-service.service'
import * as appActions from '../ngrx-store/app.actions'
import { mergeMap, map, take } from 'rxjs/operators'
import { Observable } from 'rxjs'

@Injectable()
export class AppEffect {

	constructor(private apiService: ApiServiceService, private actions: Actions) { }

	watchproductListAction = createEffect(() => this.actions.pipe(
		ofType(appActions.ActionTypes.productList),
		take(1),
		mergeMap(action => this.apiService.getListOfProduct().pipe(
			map(productList => new appActions.productListActionSuccess({productList}))
		)))
	);
	
	
	watchPaginatedDataAction = createEffect((): Observable<any> => this.actions.pipe(
		ofType(appActions.ActionTypes.paginatedData),
		mergeMap((action: any) => {
			return this.apiService.getPaginatedData()
			.then(data => new appActions.paginatedDataAction({data}))
		})
	));
}
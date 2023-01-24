import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { ApiServiceService } from '../api-service.service';
import * as globalState from '../global.state'
import * as appState from '../ngrx-store/app.state'
import * as appActions from '../ngrx-store/app.actions'


@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
    productList = [];
    currentPage = 1;
    pageSize = 10;
    allProducList = [];
    constructor(
        private apiService: ApiServiceService,
        private store: Store<globalState.IGlobalState>
    ) {
        this.store.select(appState.paginationDataSelector).subscribe(paginatedData => {
            if (paginatedData.hasOwnProperty('data') && paginatedData.data.length > 0) {
                this.productList = paginatedData.data;
            } else {
                this.productList = [];
            }
        });

        this.store.select(appState.productListSelector).subscribe(payload => {
            if (payload.length > 0) {
                const productData = payload;
                this.allProducList = productData;
                this.store.dispatch(new appActions.paginatedDataAction(
                    { pageNo: this.currentPage, size: this.pageSize, data: this.allProducList.slice(0, 11) }));
            }
        });
    }

    ngOnInit() {
        if (this.allProducList.length === 0) {
            this.apiService.getListOfProduct().subscribe({
                next: (data: any) => {
                    if (data && data.length > 0) {
                        this.allProducList = data;
                        this.productList = data.slice(0, 10);
                        if (this.allProducList.length > 0) {
                            this.store.dispatch(new appActions.productListAction([this.allProducList]));
                        }
                    }
                },
                error: (err) => {
                    console.log('err', err)
                }
            });

        }
    }

    handlePageEvent(event: any) {
        if (event.hasOwnProperty('pageIndex')) {
            this.currentPage = event.pageIndex;
            this.store.dispatch(new appActions.paginatedDataAction({ pageNo: this.currentPage, size: this.pageSize }));
        }
    }
}

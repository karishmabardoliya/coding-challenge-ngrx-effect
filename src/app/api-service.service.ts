import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store'
import * as globalState from './global.state'
import * as appState from './ngrx-store/app.state'


@Injectable({
    providedIn: 'root'
})
export class ApiServiceService {

    constructor(
        private http: HttpClient,
        private store: Store<globalState.IGlobalState>) { }

    getListOfProduct() {
        return this.http.get('https://random-data-api.com/api/coffee/random_coffee?size=100');
    }

    getPaginatedData() {
        return new Promise((resolve) => {
            let pageNo: number, size: number;
            this.store.select(appState.paginationDataSelector).subscribe(data => {
                if(data.hasOwnProperty('pageNo') && data.hasOwnProperty('size')) {
                    pageNo = data.pageNo;
                    size = data.size;
                    this.store.select(appState.productListSelector).subscribe(payload => {
                       
                        if (payload.productList.length > 0 && !isNaN(pageNo) && !isNaN(size)) {
                            const startIndex = (pageNo === 0) ? 0 : pageNo * size; 
                            const lastIndex = startIndex + size;
                            const paginatedData = payload.productList.slice(startIndex, lastIndex);
                            resolve(paginatedData);
                        } else {
                            resolve([]);
                        }
                    });
                }
            })
        })
    }
}

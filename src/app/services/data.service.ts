import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable()
export class DataService {

    partnerApi: IObjectKeys = {
        "zebpay": "https://www.zebapi.com/pro/v1/market/"
    }

    constructor(
        private http: HttpClient) {
            
    }

    getData(partner: string) {
        return this.http.get(this.partnerApi[partner])
            .pipe(
                map(response => {
                    return response;
                }),
                catchError(error => {
                    return throwError(error);
                })
            );
    }

}

interface IObjectKeys {
    [key: string]: string
}
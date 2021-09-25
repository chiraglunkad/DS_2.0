import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http: HttpClient) { }

  save(funtionName: any, data: any) {
    return this.http.post(environment.rootUrl + funtionName, data).pipe(tap(res => { res }),
        catchError(e => {
            throw new Error(e);
        })
    );
}

update(funtionName: any, data: any) {
    return this.http.put(environment.rootUrl + funtionName, data).pipe(tap(res => { res }),
        catchError(e => {
            throw new Error(e);
        })
    );
}

getFunction(functionName: any) {
    return this.http.get(environment.rootUrl + functionName).pipe(tap(res => res), catchError(e => {
        console.log(e);
        throw new Error(e);
    }));
}
deleteFunction(functionName: any) {
    return this.http.delete(environment.rootUrl + functionName).pipe(tap(res => res), catchError(e => {

        throw new Error(e);
    }));
}
// for multiple params
paramFunction(functionName: any, params: any) {
    const url = environment.rootUrl + functionName + '?' + params;
    return this.http.get(url).pipe(tap(res => res), catchError(e => {
        throw new Error(e);
    }));
}
}

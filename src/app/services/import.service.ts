import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable, throwError } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ImportService {
  constructor(private _httpClient: HttpClient) {}
  getData(): Observable<any> {
    let url = `https://jsonplaceholder.typicode.com/users`;
    return this._httpClient.get(url).pipe(catchError(this.handleError));
  }

  /**
   * Get Errors
   *
   * @returns {errorMessage}
   */
  handleError(error: { error: { message: any }; status: any; message: any }) {
    let errorMessage = "";
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Client-Side Error : ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Server-Side Error : ${error.status}\nMessage: ${error.message}`;
    }
    // window.alert(errorMessage);
    return throwError(() => {
      const error: any = new Error(errorMessage);
      error.timestamp = Date.now();
      console.log(error.timestamp);
      return error;
    });
  }
}

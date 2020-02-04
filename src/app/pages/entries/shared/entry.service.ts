import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, flatMap } from 'rxjs/operators';
import { Entry } from './entry.model';

@Injectable({
  providedIn: 'root'
})
export class EntryService {
  private apiPath = 'api/entries';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Entry[]> {
    return this.http.get(this.apiPath).pipe(
      catchError((err: HttpErrorResponse) => throwError(err)),
      map(this.jsonDataToEntries)
    );
  }

  getById(id: number): Observable<Entry> {
    return this.http.get(`${this.apiPath}/${id}`).pipe(
      catchError((err: HttpErrorResponse) => throwError(err)),
      map((entry: Entry) => entry)
    );
  }

  create(entry: Entry): Observable<Entry> {
    return this.http.post(this.apiPath, { ...entry }).pipe(
      catchError((err: HttpErrorResponse) => throwError(err)),
      map((response: Entry) => response)
    );
  }

  update(entry: Entry): Observable<Entry> {
    return this.http.put(`${this.apiPath}/${entry.id}`, { ...entry }).pipe(
      catchError((err: HttpErrorResponse) => throwError(err)),
      map(() => entry)
    );
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiPath}/${id}`).pipe(
      catchError((err: HttpErrorResponse) => throwError(err)),
      map(() => null)
    );
  }

  private handleError(error: any): Observable<any> {
    console.log('Error in request: ', error);

    return throwError(error);
  }

  private jsonDataToEntries(jsonData: any[]): Entry[] {
    const entries: Entry[] = [];

    jsonData.forEach(element => {
      const entry = Object.assign(new Entry(), element);
      entries.push(entry);
    });
    return entries;
  }
}

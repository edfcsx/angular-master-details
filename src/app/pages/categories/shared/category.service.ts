import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, flatMap } from 'rxjs/operators';
import { Category } from './category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiPath = 'api/categories';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Category[]> {
    return this.http.get(this.apiPath).pipe(
      catchError(this.handleError),
      map((category: Category[]) => category)
    );
  }

  getById(id: number): Observable<Category> {
    return this.http.get(`${this.apiPath}/${id}`).pipe(
      catchError(this.handleError),
      map((category: Category) => category)
    );
  }

  create(category: Category): Observable<Category> {
    return this.http.post(this.apiPath, { ...category }).pipe(
      catchError(this.handleError),
      map((response: Category) => response)
    );
  }

  update(category: Category): Observable<Category> {
    return this.http.put(`${this.apiPath}/${category.id}`, { ...category }).pipe(
      catchError(this.handleError),
      map(() => category)
    );
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiPath}/${id}`).pipe(
      catchError(this.handleError),
      map(() => null)
    );
  }

  private handleError(error: any): Observable<any> {
    console.log('Error in request: ', error);

    return throwError(error);
  }
}

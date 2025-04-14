import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo } from '../model/todo.typs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  http = inject(HttpClient)
  // private baseUrl = 'https://jsonplaceholder.typicode.com/todos';

  getFromApi(){
    const url = `https://jsonplaceholder.typicode.com/todos`;
    return this.http.get<Array<Todo>>(url);
  }

  // constructor(private http: HttpClient) {}

  // get<T>(endpoint: string): Observable<T> {
  //   return this.http.get<T>(`${this.baseUrl}/${endpoint}`);
  // }

  // post<T>(endpoint: string, data: any): Observable<T> {
  //   return this.http.post<T>(`${this.baseUrl}/${endpoint}`, data);
  // }

  // put<T>(endpoint: string, data: any): Observable<T> {
  //   return this.http.put<T>(`${this.baseUrl}/${endpoint}`, data);
  // }

  // delete<T>(endpoint: string): Observable<T> {
  //   return this.http.delete<T>(`${this.baseUrl}/${endpoint}`);
  // }
}

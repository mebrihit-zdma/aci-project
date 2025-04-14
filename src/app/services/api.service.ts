import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  constructor(private http: HttpClient) {}

  getApiCall() {
    const url = `https://jsonplaceholder.typicode.com/todos/1`;
    return this.http.get<any>(url);
  }

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

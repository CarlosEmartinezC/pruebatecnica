import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interface/User.Interface';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {
  private ApiHttp = 'https://jsonplaceholder.typicode.com/users'
  constructor(private http: HttpClient) { }
//metodo get para obtener los datos de la API
  getData(): Observable<User[]> {
    return this.http.get<User[]>(this.ApiHttp)
  }



}

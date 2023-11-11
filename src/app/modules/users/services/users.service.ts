import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AddressDto } from '../models/address.dto';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private apiBaseUrl = 'http://localhost:5000/users';
  constructor(private http: HttpClient) {}

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiBaseUrl);
  }

  public getById(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiBaseUrl}/${id}`);
  }

  public createUser(user: User): Observable<void> {
    return this.http.post<void>(this.apiBaseUrl, user);
  }

  public edit(user: User): Observable<void> {
    return this.http.put<void>(`${this.apiBaseUrl}/${user.id}`, user);
  }

  public getAddressByZipCode(zipCode: string): Observable<AddressDto> {
    return this.http.get<AddressDto>(
      `https://viacep.com.br/ws/${zipCode}/json/`
    );
  }
}

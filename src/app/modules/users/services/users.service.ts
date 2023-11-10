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

  public createUser(user: User): void {
    // this.users.push({ ...user, id: crypto.randomUUID() });
  }

  public getById(id: string) {
    return {}; //this.users.find((user) => user.id === id);
  }

  public getAddressByZipCode(zipCode: string): Observable<AddressDto> {
    return this.http.get<AddressDto>(
      `https://viacep.com.br/ws/${zipCode}/json/`
    );
  }
}

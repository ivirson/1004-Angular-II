import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AddressDto } from '../models/address.dto';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private users: User[] = [
    {
      id: crypto.randomUUID(),
      name: 'Ivirson Daltro',
      profession: 'Dev',
      birthDate: '01/01/2000',
      documentNumber: '01234567890',
      email: 'ivirson@email.com',
      password: 'SenhaForte@123',
      phone: '71989898989',
      income: 1000,
      address: {
        zipCode: '42800040',
        street: 'Rua Costa Pinto',
        number: 200,
        neighborhood: 'Centro',
        city: 'Camaçari',
        state: 'BA',
      },
    },
  ];

  constructor(private http: HttpClient) {}

  public getUsers(): User[] {
    return this.users;
  }

  public createUser(user: User): void {
    this.users.push({ ...user, id: crypto.randomUUID() });
  }

  public getById(id: string): User | undefined {
    return this.users.find((user) => user.id === id);
  }

  public getAddressByZipCode(zipCode: string): Observable<AddressDto> {
    return this.http.get<AddressDto>(
      `https://viacep.com.br/ws/${zipCode}/json/`
    );
  }
}

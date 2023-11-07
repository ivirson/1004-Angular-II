import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

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

  constructor() {}

  public getUsers(): User[] {
    return this.users;
  }

  public createUser(user: User): void {
    this.users.push({ ...user, id: crypto.randomUUID() });
  }

  public getById(id: string): User | undefined {
    return this.users.find((user) => user.id === id);
  }
}

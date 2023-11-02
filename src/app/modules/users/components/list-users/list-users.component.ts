import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss'],
})
export class ListUsersComponent implements OnInit {
  public users: User[] = [];

  constructor() {}

  ngOnInit() {
    this.users.push({
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
    });
  }
}

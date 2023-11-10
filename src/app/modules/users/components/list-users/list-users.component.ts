import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss'],
})
export class ListUsersComponent implements OnInit {
  public users: User[] = [];

  constructor(private usersService: UsersService) {}

  ngOnInit() {
    this.getUsers();
  }

  public getUsers(): void {
    this.usersService.getUsers().subscribe({
      next: (res: User[]) => {
        this.users = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}

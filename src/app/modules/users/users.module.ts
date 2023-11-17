import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { ListUsersComponent } from './components/list-users/list-users.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { UsersRoutingModule } from './users-routing.module';

@NgModule({
  declarations: [UsersComponent, CreateUserComponent, ListUsersComponent],
  imports: [
    CommonModule,
    FormsModule,
    UsersRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    NgxMaskDirective,
    NgxMaskPipe,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
  ],
})
export class UsersModule {}

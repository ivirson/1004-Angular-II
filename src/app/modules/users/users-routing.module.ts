import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from 'src/app/core/guards/auth.guard';
import { rolesGuard } from 'src/app/core/guards/roles.guard';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { ListUsersComponent } from './components/list-users/list-users.component';

const routes: Routes = [
  {
    path: '',
    component: ListUsersComponent,
    canActivate: [authGuard, rolesGuard],
    data: { roles: ['VIEWER', 'ADMIN'] },
  },
  {
    path: 'create',
    component: CreateUserComponent,
  },
  {
    path: 'edit/:id',
    component: CreateUserComponent,
    canActivate: [authGuard, rolesGuard],
    data: { roles: ['ADMIN'] },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}

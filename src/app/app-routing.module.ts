import { rolesGuard } from './core/guards/roles.guard';
import { CreateUserComponent } from './modules/users/components/create-user/create-user.component';
import { ListUsersComponent } from './modules/users/components/list-users/list-users.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './modules/users/users.component';
import { NotFoundComponent } from './core/components/not-found/not-found.component';
import { LoginComponent } from './core/auth/components/login/login.component';
import { authGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'users',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'users',
    loadChildren: () =>
      import('./modules/users/users.module').then((m) => m.UsersModule),
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

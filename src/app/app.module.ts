import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { registerLocaleData } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import ptBr from '@angular/common/locales/pt';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  NgxMaskDirective,
  NgxMaskPipe,
  provideEnvironmentNgxMask,
} from 'ngx-mask';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './core/auth/components/login/login.component';
import { NotFoundComponent } from './core/components/not-found/not-found.component';
import { RequestInterceptor } from './core/interceptors/request.interceptor';
import { CreateUserComponent } from './modules/users/components/create-user/create-user.component';
import { ListUsersComponent } from './modules/users/components/list-users/list-users.component';
import { UsersComponent } from './modules/users/users.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { LoadingComponent } from './shared/components/loading/loading.component';
import { LoadingInterceptor } from './core/interceptors/loading.interceptor';

registerLocaleData(ptBr);

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    ListUsersComponent,
    CreateUserComponent,
    HeaderComponent,
    NotFoundComponent,
    LoginComponent,
    LoadingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule,
    NgxMaskPipe,
    NgxMaskDirective,
    MatProgressSpinnerModule,
  ],
  providers: [
    provideEnvironmentNgxMask(),
    { provide: LOCALE_ID, useValue: 'pt' },
    { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

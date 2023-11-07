import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
})
export class CreateUserComponent implements OnInit {
  public userForm!: FormGroup;

  constructor(private usersService: UsersService, private router: Router) {}

  ngOnInit(): void {
    this.buildForm();
    this.setFormData();
  }

  private buildForm(): void {
    this.userForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      profession: new FormControl(),
      birthDate: new FormControl(null, [Validators.required]),
      documentNumber: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [Validators.required]),
      income: new FormControl(),
      address: new FormGroup({
        zipCode: new FormControl(),
        street: new FormControl(),
        number: new FormControl(),
        complement: new FormControl(),
        neighborhood: new FormControl(),
        city: new FormControl(),
        state: new FormControl(),
      }),
    });
  }

  private setFormData(): void {
    const newUser: User = {
      name: 'Clovis',
      profession: 'Dev',
      birthDate: '01/01/2000',
      documentNumber: '01234567890',
      email: 'clovis@email.com',
      password: 'SenhaForte@123',
      phone: '11989898989',
      income: 1000,
      address: {
        zipCode: '42800040',
        street: 'Rua da Rodoviária',
        number: 200,
        neighborhood: 'Centro',
        city: 'Camaçari',
        state: 'BA',
      },
    };

    this.userForm.patchValue(newUser);
  }

  public onSave(): void {
    console.log(this.userForm);
    this.usersService.createUser(this.userForm.getRawValue());
    this.router.navigate(['/users']);
  }
}

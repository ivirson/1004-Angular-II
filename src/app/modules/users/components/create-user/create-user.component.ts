import { AddressDto } from './../../models/address.dto';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { Address } from '../../models/address.model';
import { BehaviorSubject, first, takeUntil } from 'rxjs';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
})
export class CreateUserComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new BehaviorSubject<boolean>(true);
  public userForm!: FormGroup;

  constructor(private usersService: UsersService, private router: Router) {}

  ngOnInit(): void {
    this.buildForm();
    this.setFormData();
    this.setZipCodeSubscription();
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

  private setZipCodeSubscription(): void {
    this.userForm
      .get('address')
      ?.get('zipCode')
      ?.valueChanges.subscribe({
        next: (zipCode: string) => {
          if (zipCode.length === 8) {
            this.getAddressByZipCode(zipCode);
          }
        },
      });
  }

  private getAddressByZipCode(zipCode: string): void {
    this.usersService.getAddressByZipCode(zipCode).subscribe({
      next: (res: AddressDto) => {
        console.log(res);
        const address: Address = {
          zipCode: res.cep,
          street: res.logradouro,
          complement: res.complemento,
          neighborhood: res.bairro,
          city: res.localidade,
          state: res.uf,
        };
        this.userForm.get('address')?.patchValue(address);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  public onSave(): void {
    console.log(this.userForm);
    this.usersService.createUser(this.userForm.getRawValue());
    this.router.navigate(['/users']);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next(true);
    this.ngUnsubscribe.complete();
  }
}

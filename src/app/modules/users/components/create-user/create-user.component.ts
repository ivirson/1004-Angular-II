import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import {
  Observable,
  Subject,
  debounceTime,
  distinctUntilChanged,
  filter,
  takeUntil,
} from 'rxjs';
import { Address } from '../../models/address.model';
import { User } from '../../models/user.model';
import { UsersService } from '../../services/users.service';
import { AddressDto } from './../../models/address.dto';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
})
export class CreateUserComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject();
  public userForm!: FormGroup;

  public obs = new Observable((observer) => {
    let counter = 0;
    window.setInterval(() => {
      observer.next(counter);
      counter++;
    }, 2000);
  });

  constructor(private usersService: UsersService, private router: Router) {}

  ngOnInit(): void {
    this.buildForm();
    this.setFormData();
    this.setZipCodeSubscription();
    this.obs.pipe(takeUntil(this.ngUnsubscribe)).subscribe({
      next(value) {
        console.log(value);
      },
      error(err) {
        console.log(err);
      },
      complete() {
        console.log('COMPLETE');
      },
    });

    this.userForm.valueChanges
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((_) => console.log(this.userForm));
  }

  private buildForm(): void {
    this.userForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      profession: new FormControl(),
      birthDate: new FormControl(null, [Validators.required]),
      documentNumber: new FormControl(null, [
        Validators.required,
        this.cpfValidator,
      ]),
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
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
      ?.valueChanges.pipe(
        takeUntil(this.ngUnsubscribe),
        debounceTime(2000),
        distinctUntilChanged(
          (prev, next) => JSON.stringify(prev) === JSON.stringify(next)
        ),
        filter((value) => value.length === 8)
      )
      .subscribe({
        next: (zipCode: string) => {
          // if (zipCode.length === 8) {
          this.getAddressByZipCode(zipCode);
          // }
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

  private cpfValidator({ value }: AbstractControl<string>) {
    if (!value) return { emptyDocument: true };

    // Elimina CPFs invalidos conhecidos
    if (
      value.length != 11 ||
      value == '00000000000' ||
      value == '11111111111' ||
      value == '22222222222' ||
      value == '33333333333' ||
      value == '44444444444' ||
      value == '55555555555' ||
      value == '66666666666' ||
      value == '77777777777' ||
      value == '88888888888' ||
      value == '99999999999'
    ) {
      return { invalidDocument: true };
    }

    // Valida 1o digito
    let add = 0;
    for (let i = 0; i < 9; i++) {
      add += parseInt(value.charAt(i)) * (10 - i);
    }

    let rev = 11 - (add % 11);
    if (rev == 10 || rev == 11) rev = 0;
    if (rev != parseInt(value.charAt(9))) return { invalidDocument: true };

    // Valida 2o digito
    add = 0;
    for (let i = 0; i < 10; i++) {
      add += parseInt(value.charAt(i)) * (11 - i);
    }

    rev = 11 - (add % 11);
    if (rev == 10 || rev == 11) rev = 0;
    if (rev != parseInt(value.charAt(10))) return { invalidDocument: true };

    return null;
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next(true);
    this.ngUnsubscribe.complete();
  }
}

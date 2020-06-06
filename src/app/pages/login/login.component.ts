import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  error: string;
  load = false;
  constructor(private router: Router, formBuilder: FormBuilder, private afAuth: AngularFireAuth) {
    this.loginForm = formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {}

  getError(control: AbstractControl) {
    if (control.hasError('required')) {
      return 'Campo requerido';
    } else if (control.hasError('email')) {
      return 'Correo no valido';
    } else if (control.hasError('minlength')) {
      return 'Contraseña mínima 6 caracteres';
    }
  }

  login() {
    this.load = true;
    this.error = ''
    const { email, password } = this.loginForm.value;
    this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then(() => this.router.navigate(['resident']))
      .catch((e) => {
        this.load = false;
        this.error = e.message
      });
  }
}

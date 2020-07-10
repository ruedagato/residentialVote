import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { UserService } from '../../core/services/user/infoUser.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  error: string;
  load = false;

  constructor(
    private router: Router,
    formBuilder: FormBuilder,
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    private userService: UserService
  ) {
    this.loginForm = formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void { }

  getError(control: AbstractControl) {
    if (control.hasError('required')) {
      return 'Campo requerido';
    } else if (control.hasError('email')) {
      return 'Correo no valido';
    } else if (control.hasError('minlength')) {
      return 'Contraseña mínima 6 caracteres';
    }
  }

  async login() {
    this.load = true;
    this.error = '';
    const { email, password } = this.loginForm.value;
    try {
      const user = await this.afAuth.signInWithEmailAndPassword(email, password);
      const tokenUser = await user.user.getIdTokenResult();
      this.userService.setCurrent(user.user);
      this.redirectUSer(user.user.uid, tokenUser.claims.rol);
    } catch (err) {
      this.load = false;
      this.error = err.message;
    }
  }

  redirectUSer(uid: string, rol: number) {
    if (rol === 1) {
      this.router.navigate(['admin']);
    } else {
      this.router.navigate(['resident']);
    }
  }
}

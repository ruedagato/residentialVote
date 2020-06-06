import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireFunctions } from '@angular/fire/functions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  error: string;
  load = false;

  constructor(
    formBuilder: FormBuilder,
    private afAuth: AngularFireAuth,
    private fn: AngularFireFunctions,
    private router: Router,
  ) {
    this.registerForm = formBuilder.group({
      name: ['', Validators.required],
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

  async registerUser() {
    this.error = '';
    this.load = true;
    const { name, email, password } = this.registerForm.value;
    try {
      const userRecord = await this.afAuth.createUserWithEmailAndPassword(email, password);
      await userRecord.user.updateProfile({ displayName: name });
      this.fn.httpsCallable('setRol')({ uid: userRecord.user.uid, rol: 2 }).subscribe();
      this.router.navigate(['resident']);
    } catch (e) {
      this.load = false;
      this.error = e.message;
    }
  }
}

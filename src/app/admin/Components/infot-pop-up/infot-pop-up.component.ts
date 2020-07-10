import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../core/services/user/infoUser.service';
import { User } from '../../../core/models/user.model';
import { MatDialogRef } from '@angular/material/dialog';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-infot-pop-up',
  templateUrl: './infot-pop-up.component.html',
  styleUrls: ['./infot-pop-up.component.scss']
})
export class InfotPopUpComponent implements OnInit {

  form: FormGroup;


  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    public dialogRef: MatDialogRef<InfotPopUpComponent>,
    private db: AngularFireDatabase
  ) {
  }

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm() {
    const userMail = this.userService.getUserMail();
    this.form = this.formBuilder.group({
      email: [{ value: userMail, disabled: true }, [Validators.required]],
      nombre: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      nombreConjunto: ['', [Validators.required]],
    });
  }

  updateInfoUser(event: Event) {
    event.preventDefault();
    const ID_CONJUNTO = this.db.createPushId();
    const user: User = {
      role: 1,
      estatus: true,
      ID_CONJUNTO,
      info: {
        correo: this.userService.getUserMail(),
        nombre: this.form.value.nombre,
        direccion: this.form.value.direccion,
        nombreConjunto: this.form.value.nombreConjunto,
      }
    };
    this.userService.setAdminInfo(user).then(() => {
      this.userService.setUser(user);
      this.dialogRef.close();
    });


  }

}

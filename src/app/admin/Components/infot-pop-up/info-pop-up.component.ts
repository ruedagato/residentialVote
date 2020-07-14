import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AngularFireDatabase } from '@angular/fire/database';
import { Store } from '@ngrx/store';
import { State } from 'app/reducers';
import { Observable } from 'rxjs';
import { AdminModel } from 'app/core/models/admin.model';
import { switchMap, take } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-info-pop-up',
  templateUrl: './info-pop-up.component.html',
  styleUrls: ['./info-pop-up.component.scss'],
})
export class InfoPopUpComponent implements OnInit {
  form: FormGroup;
  private user$: Observable<AdminModel>;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<State>,
    private firestore: AngularFirestore,
    private afAuth: AngularFireAuth,
    public dialogRef: MatDialogRef<InfoPopUpComponent>,
    private db: AngularFireDatabase,
  ) {
    this.user$ = this.store.select((state) => state.user.admin);
  }

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm() {
    this.user$.pipe(take(1)).subscribe((user) => {
      this.form = this.formBuilder.group({
        email: [{ value: user.email, disabled: true }, [Validators.required]],
        name: ['', [Validators.required]],
        address: ['', [Validators.required]],
        nameConjunto: ['', [Validators.required]],
      });
    });
  }

  updateInfoUser() {
    const { name, address, nameConjunto } = this.form.value;
    const info = {
      idConjunto: this.db.createPushId(),
      address,
      name,
      nameConjunto,
    };
    this.afAuth.user
      .pipe(
        take(1),
        switchMap(({ uid }) =>
          this.firestore.doc(`user/${uid}`).update({
            info,
          }),
        ),
      )
      .subscribe(() => {
        this.dialogRef.close();
      });
  }
}

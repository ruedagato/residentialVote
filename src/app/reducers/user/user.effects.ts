import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import * as userAction from './user.actions';
import { AdminModel } from 'app/core/models/admin.model';

@Injectable()
export class UserEffects {
  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userAction.loadUsers),
      switchMap((action) => this.firestore.doc<AdminModel>(`user/${action.uid}`).valueChanges()),
      map((user) => userAction.loadComplete({ user })),
    ),
  );

  constructor(private actions$: Actions, private firestore: AngularFirestore) {}
}

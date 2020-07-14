import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Store } from '@ngrx/store';
import { loadUsers } from 'app/reducers/user/user.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(afAuth: AngularFireAuth, store: Store) {
    afAuth.user.subscribe((usr) => {
      if (usr) {
        store.dispatch(loadUsers({ uid: usr.uid }));
      }
    });
  }
}

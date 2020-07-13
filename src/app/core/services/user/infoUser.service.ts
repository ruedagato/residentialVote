import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { DatabaseReference } from '@angular/fire/database/interfaces';

// models
import { User } from '../../../core/models/user.model';
import { switchMap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  // VARIABLES
  private usuario: User;

  private dbRef: DatabaseReference;

  private current: firebase.User;

  constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase) {
    this.dbRef = db.database.ref('user');
  }

  getUsrInfoDb() {
    return this.afAuth.user;
  }

  setUser(user: User) {
    this.usuario = user;
  }

  setCurrent(current: firebase.User) {
    this.current = current;
  }

  async getFullUser() {
    return this.afAuth.user.pipe(
      take(1),
      switchMap(({ uid }) => this.db.object(`user/${uid}`).valueChanges()),
    );
  }

  getUserMail() {
    return this.current.email;
  }

  getUSerUID() {
    return this.current.uid;
  }

  async setAdminInfo(info: User) {
    const usr = await this.afAuth.currentUser.then((data) => data);
    this.dbRef.child(usr.uid).set(info);
  }
}

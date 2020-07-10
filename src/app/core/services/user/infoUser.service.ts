import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { DatabaseReference } from '@angular/fire/database/interfaces';

// models
import { User } from '../../../core/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // VARIABLES
  private usuario: User;

  private dbRef: DatabaseReference;

  private current: firebase.User;

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase,
  ) {
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
    if (this.usuario) {
      return this.usuario;
    } else {
      const usr = await this.dbRef.child(this.current.uid).once('value');
      this.usuario = usr.val();
      return this.usuario;
    }
  }

  getUserMail() {
    return this.current.email;
  }

  getUSerUID() {
    return this.current.uid;
  }





  async setAdminInfo(info: User) {
    const usr = await this.afAuth.currentUser.then(data => data);
    this.dbRef.child(usr.uid).set(info);
  }
}

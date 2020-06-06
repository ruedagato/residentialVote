import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';

@Component({
  selector: 'app-resident',
  templateUrl: './resident.component.html',
  styleUrls: ['./resident.component.scss'],
})
export class ResidentComponent implements OnInit {
  $user: Observable<firebase.User | null>;
  constructor(private afAuth: AngularFireAuth) {
    this.$user = this.afAuth.user;
  }

  ngOnInit(): void {}
}

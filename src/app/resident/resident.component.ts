import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';
import { aptoTypes, aptos } from '../core/models/asamblea.model';

@Component({
  selector: 'app-resident',
  templateUrl: './resident.component.html',
  styleUrls: ['./resident.component.scss'],
})
export class ResidentComponent implements OnInit {

  APTOS_DEFINITION = 'admint/residential/definition';

  aptos: aptos[] = [];
  // myAptos: object[] = [];
  myAptos: Partial<aptos>[] = [];

  aptosCant = 1;
  $user: Observable<firebase.User | null>;

  torres: number[] = [];
  pisos: number[] = [];
  apartamentos: number[] = [];



  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase
  ) {
    this.$user = this.afAuth.user;
  }

  ngOnInit(): void {
    this.getAptoDef();
  }
  async getAptoDef() {
    this.aptos = await (await this.db.database.ref(this.APTOS_DEFINITION).once('value')).val();
    this.aptos.map(item => {
      if (!this.torres.includes(item.torre)) { this.torres.push(item.torre); }
      if (!this.pisos.includes(item.piso)) { this.pisos.push(item.piso); }
      if (!this.apartamentos.includes(item.apto)) { this.apartamentos.push(item.apto); }
    });
  }

  addAptos() {
    for (let i = 0; i < this.aptosCant; i++) {
      this.myAptos.push({
        apto: null,
        piso: null,
        torre: null
      });
    }
  }

  saveAptos() {
    this.db.database.ref()
  }



}

import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';
<<<<<<< HEAD
import { AptoTypes, Aptos } from '../core/models/asamblea.model';
=======
import { aptoTypes, aptos } from '../core/models/assemblyModel';
>>>>>>> 84d230704bc97c37f49165113b09a4b7a37083a3

@Component({
  selector: 'app-resident',
  templateUrl: './resident.component.html',
  styleUrls: ['./resident.component.scss'],
})
export class ResidentComponent implements OnInit {
<<<<<<< HEAD

  APTOS_DEFINITION = 'admin/residential/definition';
=======
  APTOS_DEFINITION = 'admint/residential/definition';
>>>>>>> 84d230704bc97c37f49165113b09a4b7a37083a3

  aptos: Aptos[] = [];
  // myAptos: object[] = [];
  myAptos: Partial<Aptos>[] = [];

  aptosCant = 1;
  $user: Observable<firebase.User | null>;

  torres: number[] = [];
  pisos: number[] = [];
  apartamentos: number[] = [];

  constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase) {
    this.$user = this.afAuth.user;
  }

  ngOnInit(): void {
    this.getAptoDef();
  }
  async getAptoDef() {
<<<<<<< HEAD
    const snap = await this.db.database.ref(this.APTOS_DEFINITION).once('value');
    this.aptos = snap.val();
    if (this.aptos) {
      this.aptos.map(item => {
        if (!this.torres.includes(item.torre)) { this.torres.push(item.torre); }
        if (!this.pisos.includes(item.piso)) { this.pisos.push(item.piso); }
        if (!this.apartamentos.includes(item.apto)) { this.apartamentos.push(item.apto); }
      });
    }
=======
    this.aptos = await (await this.db.database.ref(this.APTOS_DEFINITION).once('value')).val();
    this.aptos.map((item) => {
      if (!this.torres.includes(item.torre)) {
        this.torres.push(item.torre);
      }
      if (!this.pisos.includes(item.piso)) {
        this.pisos.push(item.piso);
      }
      if (!this.apartamentos.includes(item.apto)) {
        this.apartamentos.push(item.apto);
      }
    });
>>>>>>> 84d230704bc97c37f49165113b09a4b7a37083a3
  }

  addAptos() {
    for (let i = 0; i < this.aptosCant; i++) {
      this.myAptos.push({
        apto: null,
        piso: null,
        torre: null,
      });
    }
  }

  saveAptos() {
    this.db.database.ref();
  }
}

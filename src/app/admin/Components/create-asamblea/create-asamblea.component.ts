import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AptoTypes, Aptos } from '../../../core/models/assemblyModel';

import { UserService } from '../../../core/services/user/infoUser.service';
import { DatabaseReference } from '@angular/fire/database/interfaces';

@Component({
  selector: 'app-create-asamblea',
  templateUrl: './create-asamblea.component.html',
  styleUrls: ['./create-asamblea.component.scss'],
})
export class CreateAsambleaComponent implements OnInit, AfterViewInit {
  aptTypes: AptoTypes[] = [
    {
      tipo: '',
      area: null,
      porcentaje: null,
    },
  ];

  torresCant: number = null;
  pisosCant: number = null;
  aptosCant: number = null;

  aptos: Aptos[] = [];

  conjRef: DatabaseReference;
  aptoRef: DatabaseReference;

  load = true;

  constructor(private db: AngularFireDatabase, private userService: UserService) {
    this.conjRef = db.database.ref('conjuntos');
    this.aptoRef = db.database.ref('apartamentos');
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.getDbInfo();
  }

  async getDbInfo() {
    // // const oldTypes: any = await this.db.database.ref(this.APTO_TYPES).once('value');
    // const usr = await this.userService.getFullUser();
    // const oldTypes: any = await this.conjRef.child(usr.ID_CONJUNTO).once('value');
    // if (oldTypes.exists()) {
    //   this.aptTypes = oldTypes.val();
    // }
    // // const oldAptos: any = await this.db.database.ref(this.APTOS_DEFINITION).once('value')
    // const oldAptos: any = await this.aptoRef.orderByChild('ID_CONJUNTO').equalTo(usr.ID_CONJUNTO).once('value');
    // if (oldAptos.exists()) {
    //   this.aptos = oldAptos.val();
    // }
  }

  showValue() {
    console.log(this.aptTypes);
    this.aptTypes.push({
      tipo: '',
      area: null,
      porcentaje: null,
    });
  }

  generateAptos() {
    for (let i = 1; i <= this.torresCant; i++) {
      for (let j = 1; j <= this.pisosCant; j++) {
        for (let k = 1; k <= this.aptosCant; k++) {
          this.aptos.push({
            torre: i,
            piso: j,
            apto: k,
            tipo: null,
          });
        }
      }
    }
    console.log(this.aptos);
  }

  async guardarAptos() {
    this.load = !this.load;
    const usr = await this.userService.getFullUser();
    await this.conjRef.child(usr.ID_CONJUNTO).set(this.aptTypes);
    this.aptos.map((apto) => {
      const aptoID: string = this.db.createPushId();
      this.aptoRef.child(aptoID).set({
        ID_CONJUNTO: usr.ID_CONJUNTO,
        ID_PROPIETATIO: null,
        tipo: apto.tipo,
        info: {
          apto: apto.apto,
          torre: apto.torre,
          piso: apto.piso,
        },
        status: true,
      });
    });
    this.load = !this.load;
    alert('Informacion guardada con éxito');
  }
}

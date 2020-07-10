import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
<<<<<<< HEAD
import { AptoTypes, Aptos } from '../../../core/models/asamblea.model';

import { UserService } from '../../../core/services/user/infoUser.service';
import { DatabaseReference } from '@angular/fire/database/interfaces';

=======
import { aptoTypes, aptos } from '../../../core/models/assemblyModel';
>>>>>>> 84d230704bc97c37f49165113b09a4b7a37083a3

@Component({
  selector: 'app-create-asamblea',
  templateUrl: './create-asamblea.component.html',
  styleUrls: ['./create-asamblea.component.scss'],
})
<<<<<<< HEAD
export class CreateAsambleaComponent implements OnInit, AfterViewInit {


  aptoTypes: AptoTypes[] = [{
    tipo: '',
    area: null,
    porcentaje: null,
  }]
=======
export class CreateAsambleaComponent implements OnInit {
  APTO_TYPES = 'admin/residential/types';
  APTOS_DEFINITION = 'admint/residential/definition';

  aptoTypes: aptoTypes[] = [
    {
      tipo: '',
      area: null,
      porcentaje: null,
    },
  ];
>>>>>>> 84d230704bc97c37f49165113b09a4b7a37083a3

  torresCant: number = null;
  pisosCant: number = null;
  aptosCant: number = null;

<<<<<<< HEAD
  aptos: Aptos[] = []

  conjRef: DatabaseReference;
  aptoRef: DatabaseReference;

  load: boolean = true;



  constructor(
    private db: AngularFireDatabase,
    private userService: UserService
  ) {
    this.conjRef = db.database.ref('conjuntos');
    this.aptoRef = db.database.ref('apartamentos')
  }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.getDbInfo()
    throw new Error("Method not implemented.");
=======
  aptos: aptos[] = [];

  constructor(private db: AngularFireDatabase) {}

  ngOnInit(): void {
    this.getDbInfo();
>>>>>>> 84d230704bc97c37f49165113b09a4b7a37083a3
  }

  async getDbInfo() {
    debugger
    // const oldTypes: any = await this.db.database.ref(this.APTO_TYPES).once('value');
    const usr = await this.userService.getFullUser()
    const oldTypes: any = await this.conjRef.child(usr.ID_CONJUNTO).once('value')
    if (oldTypes.exists()) {
      this.aptoTypes = oldTypes.val();
    }
<<<<<<< HEAD
    // const oldAptos: any = await this.db.database.ref(this.APTOS_DEFINITION).once('value')
    const oldAptos: any = await this.aptoRef.orderByChild('ID_CONJUNTO').equalTo(usr.ID_CONJUNTO).once('value')
=======
    const oldAptos: any = await this.db.database.ref(this.APTOS_DEFINITION).once('value');
>>>>>>> 84d230704bc97c37f49165113b09a4b7a37083a3
    if (oldAptos.exists()) {
      this.aptos = oldAptos.val();
    }
  }

  showValue() {
    console.log(this.aptoTypes);
    this.aptoTypes.push({
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
<<<<<<< HEAD
    this.load = !this.load
    const usr = await this.userService.getFullUser()
    await this.conjRef.child(usr.ID_CONJUNTO).set(this.aptoTypes)
    this.aptos.map(apto => {
      const aptoID: string = this.db.createPushId()
      this.aptoRef.child(aptoID).set({
        ID_CONJUNTO: usr.ID_CONJUNTO,
        ID_PROPIETATIO: null,
        tipo: apto.tipo,
        info: {
          apto: apto.apto,
          torre: apto.torre,
          piso: apto.piso

        },
        status: true
      })
    })
    this.load = !this.load
    alert('Informacion guardada con éxito')

    // console.log(this.aptos);



    // await this.db.database.ref(this.APTOS_DEFINITION).set(this.aptos)


=======
    await this.db.database.ref(this.APTO_TYPES).set(this.aptoTypes);
    await this.db.database.ref(this.APTOS_DEFINITION).set(this.aptos);

    alert('Informacion guardada con éxito');
>>>>>>> 84d230704bc97c37f49165113b09a4b7a37083a3
  }
}

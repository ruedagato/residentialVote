import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { aptoTypes, aptos } from '../../../core/models/assemblyModel';

@Component({
  selector: 'app-create-asamblea',
  templateUrl: './create-asamblea.component.html',
  styleUrls: ['./create-asamblea.component.scss'],
})
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

  torresCant: number = null;
  pisosCant: number = null;
  aptosCant: number = null;

  aptos: aptos[] = [];

  constructor(private db: AngularFireDatabase) {}

  ngOnInit(): void {
    this.getDbInfo();
  }

  async getDbInfo() {
    const oldTypes: any = await this.db.database.ref(this.APTO_TYPES).once('value');
    if (oldTypes.exists()) {
      this.aptoTypes = oldTypes.val();
    }
    const oldAptos: any = await this.db.database.ref(this.APTOS_DEFINITION).once('value');
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
    await this.db.database.ref(this.APTO_TYPES).set(this.aptoTypes);
    await this.db.database.ref(this.APTOS_DEFINITION).set(this.aptos);

    alert('Informacion guardada con éxito');
  }
}

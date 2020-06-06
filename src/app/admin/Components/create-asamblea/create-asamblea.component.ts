import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-asamblea',
  templateUrl: './create-asamblea.component.html',
  styleUrls: ['./create-asamblea.component.scss']
})
export class CreateAsambleaComponent implements OnInit {

  aptoTypes: object[] = [{
    tipo: '',
    area: '',
    porcentaje: null,
  }]

  torresCant: number = null;
  pisosCant: number = null;
  aptosCant: number = null;

  aptos: object[] = []



  constructor() { }

  ngOnInit(): void {
  }


  showValue() {
    console.log(this.aptoTypes);
    this.aptoTypes.push({
      tipo: '',
      area: '',
      porcentaje: null,
    })
  }

  generateAptos() {
    for (let i = 1; i <= this.torresCant; i++) {
      for (let j = 1; j <= this.pisosCant; j++) {
        for (let k = 1; k <= this.aptosCant; k++) {
          this.aptos.push({
            torre: i,
            piso: j,
            apto: k,
            tipo: null
          })
        };
      };
    };
    console.log(this.aptos);
  }

  guardarAptos() {
    console.log(this.aptos);
    
  }




}

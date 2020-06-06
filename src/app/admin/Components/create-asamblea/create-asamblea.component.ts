import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-asamblea',
  templateUrl: './create-asamblea.component.html',
  styleUrls: ['./create-asamblea.component.scss']
})
export class CreateAsambleaComponent implements OnInit {

  form: FormGroup;

  types: any[] = [{
    tipo: ['', [Validators.required]],
    area: ['', [Validators.required]],
    porcentaje: ['', [Validators.required]],
  },
  {
    tipo: ['', [Validators.required]],
    area: ['', [Validators.required]],
    porcentaje: ['', [Validators.required]],
  }]


  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
  }

  private buildForm() {

    this.form = this.formBuilder.group({
      arrayTypes: this.formBuilder.array(
        this.types.map(item => {
          return this.formBuilder.group({
            tipo: [item.tipo],
            area: [item.area],
            porcentaje: [item.porcentaje]
          })
        })
      )
    })
    
  }

}

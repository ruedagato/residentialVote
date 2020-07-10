import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './Components/layout/admin.component';
import { LayoutModule } from '@angular/cdk/layout';

import { CreateAsambleaComponent } from './components/create-asamblea/create-asamblea.component';
import { QuestionsComponent } from './components/questions/questions.component';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { InfotPopUpComponent } from './Components/infot-pop-up/infot-pop-up.component';

@NgModule({
  declarations: [
    AdminComponent,
    CreateAsambleaComponent,
    QuestionsComponent,
    InfotPopUpComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    AdminRoutingModule,
    LayoutModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule
  ],
})
export class AdminModule { }

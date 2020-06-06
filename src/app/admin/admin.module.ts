import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './Components/layout/admin.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { CreateAsambleaComponent } from './components/create-asamblea/create-asamblea.component';
import { QuestionsComponent } from './components/questions/questions.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AdminComponent,
    CreateAsambleaComponent,
    QuestionsComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    AdminRoutingModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatStepperModule,
    MatCardModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule
  ],
})
export class AdminModule { }

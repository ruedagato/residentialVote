import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResidentRoutingModule } from './resident-routing.module';
import { ResidentComponent } from './resident.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { ShareModule } from 'app/share/share.module';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [ResidentComponent],
  imports: [
    CommonModule,
    ResidentRoutingModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    ShareModule,
    MatCardModule,
    MatInputModule,
    MatGridListModule,
    MatSelectModule,
    FormsModule
  ],
})
export class ResidentModule { }

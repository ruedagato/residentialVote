import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './Components/layout/admin.component';
import { CreateAsambleaComponent } from './components/create-asamblea/create-asamblea.component';
import { QuestionsComponent } from './components/questions/questions.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'asamblea',
        component: CreateAsambleaComponent
      },
      {
        path: 'questions',
        component: QuestionsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

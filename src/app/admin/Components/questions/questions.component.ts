import { Component, OnInit } from '@angular/core';
import { AssemblyModel, Questions } from 'src/app/core/models/assemblyModel';
import { AngularFireDatabase } from '@angular/fire/database';
import { filter, map, take, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AssemblyService } from '../../../core/assembly.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss'],
})
export class QuestionsComponent implements OnInit {
  isCreating = false;
  nameNewAsamblea: string;
  asamblea: AssemblyModel;
  listNewOption: string[] = [];

  constructor(private db: AngularFireDatabase, private assemblyService: AssemblyService) {
    // TODO: change demo-conjunto for real conjunto
    this.assemblyService
      .getActiveAssembly('demo-conjunto')
      .pipe(
        filter((data) => data.length > 0),
        map((data) => data[0]),
      )
      .subscribe((data) =>  {
        console.log(data);
      });
  }

  ngOnInit(): void {}

  async createAssembly() {
    await this.assemblyService.createAssembly(this.nameNewAsamblea, null);
    this.nameNewAsamblea = null;
    this.isCreating = false;
  }

  addOption(inp: HTMLInputElement) {
    this.listNewOption.push(inp.value);
    inp.value = null;
  }

  deleteOption(index: number) {
    this.listNewOption = this.listNewOption.filter((value, index1) => index1 !== index);
  }

  async createQuestion(inp: HTMLInputElement) {
    await this.assemblyService.createQuestion(this.asamblea.uid, inp.value, this.listNewOption);
    inp.value = null;
    this.listNewOption = [];
  }
}

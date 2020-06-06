import { Component, OnInit } from '@angular/core';
import { AsambleaModel, Questions } from 'src/app/core/models/asamblea.model';
import { AngularFireDatabase } from '@angular/fire/database';
import { filter, map, take, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss'],
})
export class QuestionsComponent implements OnInit {
  isCreating = false;
  nameNewAsamblea: string;
  asamblea: AsambleaModel;
  listNewOption: string[] = [];

  constructor(private db: AngularFireDatabase) {
    this.db
      .list<AsambleaModel>('asambleas', (ref) => ref.orderByChild('active').equalTo(true))
      .valueChanges()
      .pipe(
        map((data) => (data.length > 0 ? data[0] : null)),
        map(
          (data) =>
            data && {
              ...data,
              questions: Object.values(data.questions).map((qst) => ({ ...qst, options: Object.values(qst.options) })),
            },
        ),
        tap((data) => console.log(data)),
      )
      .subscribe((as) => (this.asamblea = as));
  }

  ngOnInit(): void {}

  async createAsamblea() {
    const uid = this.db.createPushId();
    const asamblea: AsambleaModel = {
      name: this.nameNewAsamblea,
      active: true,
      uid,
    };
    await this.db.object(`asambleas/${uid}`).set(asamblea);
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
    const uidQ = this.db.createPushId();
    const question: Questions = {
      uid: uidQ,
      name: inp.value,
    };
    this.db.object(`asambleas/${this.asamblea.uid}/questions/${uidQ}`).set(question);
    for await (let name of this.listNewOption) {
      const uidO = this.db.createPushId();
      await this.db.object(`asambleas/${this.asamblea.uid}/questions/${uidQ}/options/${uidO}`).set({
        name,
        uid: uidO,
        numSelected: 0,
      });
    }
    inp.value = null;
    this.listNewOption = [];
  }
}

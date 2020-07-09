import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AssemblyModel, OptionQuestions, Questions } from './models/assemblyModel';
import { AngularFireDatabase } from '@angular/fire/database';
import { combineAll, map, switchMap, take } from 'rxjs/operators';
import { combineLatest } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AssemblyService {
  constructor(private afFirestore: AngularFirestore, private afDb: AngularFireDatabase) {}

  createAssembly(name: string, description: string) {
    // TODO: change demo conjunto for real id
    const assembly: AssemblyModel = {
      active: true,
      conjuntoUId: 'demo-conjunto',
      description,
      name,
      uid: this.afDb.createPushId(),
    };
    return this.afFirestore.collection('assembly').doc(assembly.uid).set(assembly);
  }

  async createQuestion(assemblyUid: string, label: string, options: string[]) {
    const uidQuestion = this.afDb.createPushId();
    const question: Questions = {
      label,
      status: true,
      uid: uidQuestion,
      assemblyUid,
    };
    await this.afDb.object(`questions/${uidQuestion}`).set(question);
    for await (const name of options) {
      const uidOption = this.afDb.createPushId();
      const option: OptionQuestions = {
        name,
        numSelected: 0,
        uid: uidQuestion,
      };
      await this.afDb.object(`questions/${uidQuestion}/options/${uidOption}`).set(option);
    }
  }

  getActiveAssembly(conjuntoUId: string) {
    return this.afFirestore
      .collection<AssemblyModel>('assembly', (ref) =>
        ref.where('conjuntoUId', '==', conjuntoUId).where('active', '==', true),
      )
      .valueChanges()
      .pipe(
        map((data) =>
          data.map((item) => ({
            ...item,
            questions: this.afDb
              .list(`questions`, (ref) => ref.orderByChild('assemblyUid').equalTo(item.uid))
              .valueChanges().pipe(take(1)),
          })),
        ),
        combineAll()
      );
  }
}

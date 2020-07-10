import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, shareReplay, take } from 'rxjs/operators';
import { User } from '../../../core/models/user.model';
import { UserService } from '../../../core/services/user/infoUser.service';
import { MatDialog } from '@angular/material/dialog';
import { InfotPopUpComponent } from '../infot-pop-up/infot-pop-up.component';
import { Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';
import { DatabaseReference } from '@angular/fire/database/interfaces';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map((result) => result.matches),
    shareReplay(),
  );

  usuario: User;

  private dbRef: DatabaseReference;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private userService: UserService,
    public dialog: MatDialog,
    private router: Router,
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth,
  ) {
    this.dbRef = db.database.ref('user');
    this.afAuth.user.pipe(
      take(1)
    ).subscribe(user => {
      this.userService.setCurrent(user);
      this.usrExist();
    });
  }



  ngOnInit(): void {
  }

  async usrExist() {
    this.usuario = await this.userService.getFullUser();
    if (this.usuario && this.usuario.info) {
      this.router.navigate(['/admin/asamblea']);
    } else {
      this.openInfoFormPopUp();
    }
  }

  openInfoFormPopUp() {
    const dialogRef = this.dialog.open(InfotPopUpComponent, { disableClose: true });
    dialogRef.afterClosed().subscribe(result => {
      this.router.navigate(['/admin/asamblea']);
    });
  }
}

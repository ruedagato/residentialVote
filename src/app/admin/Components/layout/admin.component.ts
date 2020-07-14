import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { filter, map, shareReplay, take } from 'rxjs/operators';
import { UserService } from 'app/core/services/user/infoUser.service';
import { MatDialog } from '@angular/material/dialog';
import { InfoPopUpComponent } from 'app/admin/Components/infot-pop-up/info-pop-up.component';
import { Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';
import { DatabaseReference } from '@angular/fire/database/interfaces';
import { Store } from '@ngrx/store';
import { State } from 'app/reducers';
import { AdminModel } from 'app/core/models/admin.model';

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

  private dbRef: DatabaseReference;
  private user$: Observable<AdminModel>;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private userService: UserService,
    public dialog: MatDialog,
    private router: Router,
    private db: AngularFireDatabase,
    private store: Store<State>,
  ) {
    this.dbRef = db.database.ref('user');
    this.user$ = this.store.select((state) => state.user.admin);
  }

  ngOnInit(): void {
    this.validateUserStatus();
  }

  private validateUserStatus() {
    this.user$
      .pipe(
        filter((data) => !!data),
        take(1),
      )
      .subscribe((data) => {
        if (data.info) {
          this.router.navigate(['/admin/asamblea']);
        } else {
          this.openInfoFormPopUp();
        }
      });
  }

  openInfoFormPopUp() {
    const dialogRef = this.dialog.open(InfoPopUpComponent, { disableClose: true });
    dialogRef.afterClosed().subscribe(() => {
      this.router.navigate(['/admin/asamblea']);
    });
  }
}

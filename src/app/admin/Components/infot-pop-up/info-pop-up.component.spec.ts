import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoPopUpComponent } from 'app/admin/Components/infot-pop-up/info-pop-up.component';

describe('InfotPopUpComponent', () => {
  let component: InfoPopUpComponent;
  let fixture: ComponentFixture<InfoPopUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoPopUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

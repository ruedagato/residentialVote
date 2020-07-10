import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfotPopUpComponent } from './infot-pop-up.component';

describe('InfotPopUpComponent', () => {
  let component: InfotPopUpComponent;
  let fixture: ComponentFixture<InfotPopUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfotPopUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfotPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

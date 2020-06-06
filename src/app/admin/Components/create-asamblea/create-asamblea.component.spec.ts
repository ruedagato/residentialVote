import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAsambleaComponent } from './create-asamblea.component';

describe('CreateAsambleaComponent', () => {
  let component: CreateAsambleaComponent;
  let fixture: ComponentFixture<CreateAsambleaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateAsambleaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAsambleaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

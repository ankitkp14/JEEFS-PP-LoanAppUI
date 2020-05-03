import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalcemiComponent } from './calcemi.component';

describe('CalcemiComponent', () => {
  let component: CalcemiComponent;
  let fixture: ComponentFixture<CalcemiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalcemiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalcemiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

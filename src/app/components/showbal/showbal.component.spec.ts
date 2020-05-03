import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowbalComponent } from './showbal.component';

describe('ShowbalComponent', () => {
  let component: ShowbalComponent;
  let fixture: ComponentFixture<ShowbalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowbalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowbalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForecloseComponent } from './foreclose.component';

describe('ForecloseComponent', () => {
  let component: ForecloseComponent;
  let fixture: ComponentFixture<ForecloseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForecloseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForecloseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

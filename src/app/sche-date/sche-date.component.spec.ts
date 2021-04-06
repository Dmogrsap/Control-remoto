import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheDateComponent } from './sche-date.component';

describe('ScheDateComponent', () => {
  let component: ScheDateComponent;
  let fixture: ComponentFixture<ScheDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheDateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

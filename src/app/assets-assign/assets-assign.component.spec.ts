import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetsAssignComponent } from './assets-assign.component';

describe('AssetsAssignComponent', () => {
  let component: AssetsAssignComponent;
  let fixture: ComponentFixture<AssetsAssignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetsAssignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetsAssignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

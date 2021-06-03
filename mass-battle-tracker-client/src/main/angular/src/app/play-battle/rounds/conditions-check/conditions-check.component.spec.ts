import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConditionsCheckComponent } from './conditions-check.component';

describe('ConditionsCheckComponent', () => {
  let component: ConditionsCheckComponent;
  let fixture: ComponentFixture<ConditionsCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConditionsCheckComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConditionsCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

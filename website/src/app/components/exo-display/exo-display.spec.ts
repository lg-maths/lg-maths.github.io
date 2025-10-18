import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExoDisplay } from './exo-display';

describe('ExoDisplay', () => {
  let component: ExoDisplay;
  let fixture: ComponentFixture<ExoDisplay>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExoDisplay]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExoDisplay);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

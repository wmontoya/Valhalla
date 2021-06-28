import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComparacionesComponent } from './comparaciones.component';

describe('ComparacionesComponent', () => {
  let component: ComparacionesComponent;
  let fixture: ComponentFixture<ComparacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComparacionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComparacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoEntradas } from './listado-entradas';

describe('ListadoEntradas', () => {
  let component: ListadoEntradas;
  let fixture: ComponentFixture<ListadoEntradas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoEntradas]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ListadoEntradas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

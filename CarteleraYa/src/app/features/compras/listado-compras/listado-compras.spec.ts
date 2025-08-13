import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoCompras } from './listado-compras';

describe('ListadoCompras', () => {
  let component: ListadoCompras;
  let fixture: ComponentFixture<ListadoCompras>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoCompras]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoCompras);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

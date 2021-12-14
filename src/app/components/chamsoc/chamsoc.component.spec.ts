import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChamsocComponent } from './chamsoc.component';

describe('ChamsocComponent', () => {
  let component: ChamsocComponent;
  let fixture: ComponentFixture<ChamsocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChamsocComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChamsocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

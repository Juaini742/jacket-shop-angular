import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainCartComponent } from './main-cart.component';

describe('MainCartComponent', () => {
  let component: MainCartComponent;
  let fixture: ComponentFixture<MainCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainCartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MainCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OserHistoryComponent } from './oser-history.component';

describe('OserHistoryComponent', () => {
  let component: OserHistoryComponent;
  let fixture: ComponentFixture<OserHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OserHistoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OserHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

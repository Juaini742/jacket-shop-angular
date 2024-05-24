import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainAboutComponent } from './main-about.component';

describe('MainAboutComponent', () => {
  let component: MainAboutComponent;
  let fixture: ComponentFixture<MainAboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainAboutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MainAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

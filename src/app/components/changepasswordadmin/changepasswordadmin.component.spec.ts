import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangepasswordadminComponent } from './changepasswordadmin.component';

describe('ChangepasswordadminComponent', () => {
  let component: ChangepasswordadminComponent;
  let fixture: ComponentFixture<ChangepasswordadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangepasswordadminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangepasswordadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

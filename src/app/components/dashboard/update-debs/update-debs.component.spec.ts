import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDebsComponent } from './update-debs.component';

describe('UpdateDebsComponent', () => {
  let component: UpdateDebsComponent;
  let fixture: ComponentFixture<UpdateDebsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateDebsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateDebsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

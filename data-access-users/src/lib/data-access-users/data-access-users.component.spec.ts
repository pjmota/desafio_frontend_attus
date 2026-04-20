import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DataAccessUsersComponent } from './data-access-users.component';

describe('DataAccessUsersComponent', () => {
  let component: DataAccessUsersComponent;
  let fixture: ComponentFixture<DataAccessUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataAccessUsersComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DataAccessUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

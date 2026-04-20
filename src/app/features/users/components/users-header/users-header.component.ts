import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { setNameFilter } from '../../store/users.actions';

@Component({
  selector: 'app-users-header',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './users-header.component.html',
  styleUrl: './users-header.component.scss',
})
export class UsersHeaderComponent {
  private readonly store = inject(Store);
  private readonly destroyRef = inject(DestroyRef);

  readonly loggedUserName: string | null = null;

  readonly nameFilterControl = new FormControl('', { nonNullable: true });

  constructor() {
    this.nameFilterControl.valueChanges
      .pipe(
        map((value: string) => value.trim()),
        debounceTime(300),
        distinctUntilChanged(),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((name: string) => {
        this.store.dispatch(setNameFilter({ name }));
      });
  }
}

import { Component, OnInit, signal } from '@angular/core';
import { MultiSelectComponent } from '../components/multi-select/multi-select.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { ToggleComponent } from '../components/toggle/toggle.component';
import { ToggleMode } from '../../enums/toggleModeEnum';

@Component({
  selector: 'app-testing',
  imports: [
    MultiSelectComponent,
    ReactiveFormsModule,
    JsonPipe,
    ToggleComponent,
  ],
  templateUrl: './testing.component.html',
  styleUrl: './testing.component.css',
})
export class TestingComponent implements OnInit {
  multiselect = new FormControl<string[]>([]);
  selectedTags = signal<string[] | null>([]);
  toggle = new FormControl<ToggleMode>('any');

  options = [
    'janko',
    'beniak',
    'je',
    'dlhyyyyyyyyyyy',
    'majestátne epický a obrovsky',
    '2majestátne epický a obrovsky',
    'kolos',
  ];

  ngOnInit(): void {
    this.multiselect.valueChanges.subscribe({
      next: (val) => {
        console.log(val);
        this.selectedTags.set(val);
      },
    });

    this.toggle.valueChanges.subscribe({
      next: (val) => {
        console.log(val);
      },
    });
  }
}

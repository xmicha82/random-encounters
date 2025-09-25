import { RouterLink } from '@angular/router';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, inject, OnInit, signal } from '@angular/core';
import { EncountersService } from '../services/encounters.service';
import { EncounterCardComponent } from '../components/encounter-card/encounter-card.component';
import { Encounter, Tag } from '../models/encounter';
import { Environment } from '../../enums/encounterEnums';
import { MultiSelectComponent } from '../components/multi-select/multi-select.component';
import { ToggleComponent } from '../components/toggle/toggle.component';
import { ToggleMode } from '../../enums/toggleModeEnum';

@Component({
  selector: 'app-encounters',
  imports: [
    EncounterCardComponent,
    RouterLink,
    ReactiveFormsModule,
    MultiSelectComponent,
    ToggleComponent,
  ],
  templateUrl: './encounters.component.html',
  styleUrl: './encounters.component.css',
})
export class EncountersComponent implements OnInit {
  encountersService = inject(EncountersService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  encounters = signal<Encounter[]>([]);
  environment = signal<Environment>('wilderness');
  tagsSelect = new FormControl<string[]>([]);
  modeToggle = new FormControl<ToggleMode>('any');

  tagsFilter = new FormGroup({
    tags: new FormControl<string[]>([]),
    mode: new FormControl<ToggleMode>('any'),
  });

  ngOnInit(): void {
    this.route.queryParams.subscribe({
      next: (params) => {
        if (Object.keys(params).length === 0) {
          this.router.navigate([], {
            relativeTo: this.route,
            queryParams: {
              environment: 'wilderness',
              tags: [],
              mode: 'any',
            },
            queryParamsHandling: 'merge',
          });
        } else {
          const tags = Array.isArray(params['tags'])
            ? params['tags']
            : params['tags']
            ? [params['tags']]
            : [];
          this.encounters.set(
            this.encountersService.getEncounters(
              params['environment'],
              tags,
              params['mode'] || 'any'
            )
          );

          this.tagsFilter.setValue({
            tags,
            mode: params['mode'] || 'any',
          });
          this.environment.set(params['environment']);
        }
      },
    });

    this.tagsFilter.valueChanges.subscribe({
      next: (val) => {
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: {
            tags: val.tags,
            mode: val.mode,
          },
          queryParamsHandling: 'merge',
        });
      },
    });
  }

  onTagSelect(newTag: Tag) {
    if (this.tagsFilter.value?.tags?.includes(newTag)) return;

    console.log('tagSelectValue', this.tagsSelect.value);
    console.log('newTag', newTag);
    console.log([...(this.tagsSelect.value || []), newTag]);

    this.tagsFilter.patchValue({
      tags: [...(this.tagsFilter.value.tags || []), newTag],
    });
  }
}

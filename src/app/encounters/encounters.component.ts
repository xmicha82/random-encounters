import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {
  NgLabelTemplateDirective,
  NgOptionTemplateDirective,
  NgSelectComponent,
  NgSelectModule,
} from '@ng-select/ng-select';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, inject, OnInit, signal } from '@angular/core';
import { EncountersService } from '../services/encounters.service';
import { EncounterCardComponent } from '../components/encounter-card/encounter-card.component';
import { Encounter, Tag } from '../models/encounter';
import { Environment } from '../../enums/encounterEnums';
import { NgOptionComponent } from '@ng-select/ng-select';

@Component({
  selector: 'app-encounters',
  imports: [
    EncounterCardComponent,
    RouterLink,
    NgLabelTemplateDirective,
    NgOptionTemplateDirective,
    NgSelectComponent,
    FormsModule,
    NgOptionComponent,
  ],
  templateUrl: './encounters.component.html',
  styleUrl: './encounters.component.css',
})
export class EncountersComponent implements OnInit {
  encountersService = inject(EncountersService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  encounters = signal<Encounter[]>([]);
  selectedTags = signal<Tag[]>([]);
  environment = signal<Environment>('wilderness');

  ngOnInit(): void {
    this.route.queryParams.subscribe({
      next: (params) => {
        if (Object.keys(params).length === 0) {
          this.router.navigate([], {
            relativeTo: this.route,
            queryParams: {
              environment: 'wilderness',
              tags: [],
            },
            queryParamsHandling: 'merge',
          });
        } else {
          this.encounters.set(
            this.encountersService.getEncounters(
              params['environment'],
              params['tags'] || []
            )
          );
          this.selectedTags.set(params['tags'] || []);
          this.environment.set(params['environment']);
        }
      },
    });
  }
}

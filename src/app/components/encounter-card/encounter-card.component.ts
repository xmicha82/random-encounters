import { Component, input } from '@angular/core';
import { Encounter } from '../../models/encounter';

@Component({
    selector: 'app-encounter-card',
    templateUrl: './encounter-card.component.html',
    styleUrls: ['./encounter-card.component.css']
})
export class EncounterCardComponent {
  encounter = input.required<Encounter>();
}

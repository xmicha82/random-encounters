import { Component, input, output } from '@angular/core';
import { Encounter, Tag } from '../../models/encounter';

@Component({
  selector: 'app-encounter-card',
  templateUrl: './encounter-card.component.html',
  styleUrls: ['./encounter-card.component.css'],
})
export class EncounterCardComponent {
  encounter = input.required<Encounter>();
  tagSelect = output<Tag>();

  onTagClick(tag: Tag) {
    this.tagSelect.emit(tag);
  }
}

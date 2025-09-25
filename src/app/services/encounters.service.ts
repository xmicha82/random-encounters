import { Environment } from '../../enums/encounterEnums';
import { Injectable } from '@angular/core';
import dungeon from '../data/dungeon.json';
import town from '../data/town.json';
import wilderness from '../data/wilderness.json';
import traps from '../data/traps.json';
import { Encounter, Tag } from '../models/encounter';
import { ToggleMode } from '../../enums/toggleModeEnum';
import { filter } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EncountersService {
  encounters: { [key: string]: Encounter[] } = {
    dungeon,
    town,
    wilderness,
    traps,
  };

  getEncounters(
    environment: Environment,
    tags: Tag[],
    mode: ToggleMode
  ): Encounter[] {
    switch (mode) {
      case 'all':
        return this.encounters[environment].filter((enc) =>
          tags.length > 0 ? tags.every((tag) => enc.tags.includes(tag)) : false
        );
      case 'any':
        return this.encounters[environment].filter((enc) =>
          tags.length > 0 ? enc.tags.some((tag) => tags.includes(tag)) : true
        );
      default:
        return [];
    }
  }

  getAvailableTags(environment: Environment) {
    switch (environment) {
      case 'wilderness':
        return [
          'Plains',
          'Desert',
          'Mountain',
          'Swamp & Jungle',
          'Wilderness Boon',
          'Arctic',
          'Sea & Shore',
          'Forest',
          'Mountains',
        ];
      case 'town':
        return [
          'Undercity',
          'Castle Ward',
          'Lanes',
          'Noble Quarter',
          'High Street',
          'Rural',
          'Slums',
          'Guild Quarter',
          'Docks',
          'Cemetery',
        ];
      case 'dungeon':
        return [
          'Interaction',
          'Enemy',
          'Environmental Details',
          'Environmental',
          'Door',
          'Intrigue',
          'Dungeon Boon',
        ];
      case 'traps':
        return ['Trigger', 'Effect'];
    }
  }
}

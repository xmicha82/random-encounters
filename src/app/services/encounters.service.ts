import { Environment } from '../../enums/encounterEnums';
import { Injectable } from '@angular/core';
import dungeon from '../data/dungeon.json';
import town from '../data/town.json';
import wilderness from '../data/wilderness.json';
import traps from '../data/traps.json';
import { Encounter, Tag } from '../models/encounter';

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

  getEncounters(environment: Environment, tags: Tag[]): Encounter[] {
    return this.encounters[environment].filter((enc) =>
      tags.length > 0 ? enc.tags.some((tag) => tags.includes(tag)) : true
    );
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
        return [];
      case 'traps':
        return [];
    }
  }
}

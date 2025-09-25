import { Component, Self, signal } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NgControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { ToggleMode } from '../../../enums/toggleModeEnum';

@Component({
  selector: 'app-toggle',
  imports: [ReactiveFormsModule],
  templateUrl: './toggle.component.html',
  styleUrl: './toggle.component.css',
})
export class ToggleComponent implements ControlValueAccessor {
  mode = signal<ToggleMode>('any');
  isDisabled = false;

  onChange: (value: ToggleMode) => void = () => {};
  onTouched: () => void = () => {};

  constructor(@Self() public ngControl: NgControl) {
    this.ngControl.valueAccessor = this;
  }

  get control() {
    return this.ngControl.control as FormControl;
  }

  onSwitchToggle() {
    this.mode.update((prev) => (prev === 'any' ? 'all' : 'any'));
    this.onChange(this.mode());
  }

  writeValue(obj: ToggleMode): void {
    this.mode.set(obj);
  }
  registerOnChange(fn: (value: ToggleMode) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
}

import { Component, computed, input, Self, signal } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NgControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { NgClass } from '@angular/common';
import { ClickOutsideDirective } from '../../directives/click-outside.directive';

@Component({
  selector: 'app-multi-select',
  imports: [ReactiveFormsModule, NgClass, ClickOutsideDirective],
  templateUrl: './multi-select.component.html',
  styleUrl: './multi-select.component.css',
})
export class MultiSelectComponent implements ControlValueAccessor {
  options = input<string[]>([]);
  selectedOptions = signal<string[]>([]);
  isOpen = signal(false);

  additionalItems = computed(() => this.selectedOptions().length - 3);

  private onChange: (value: string[]) => void = () => {};
  private onTouched: () => void = () => {};

  constructor(@Self() public ngControl: NgControl) {
    this.ngControl.valueAccessor = this;
  }

  get control() {
    return this.ngControl.control as FormControl;
  }

  onRemoveSelected(option: string) {
    this.selectedOptions.update((options) =>
      options.filter((opt) => opt !== option)
    );
    this.onChange(this.selectedOptions());
  }

  toggleDropdown() {
    this.isOpen.update((prev) => !prev);
    this.onTouched();
  }

  closeDropdown() {
    this.isOpen.set(false);
  }

  isSelected(option: string) {
    return this.selectedOptions().includes(option);
  }

  toggleOption(option: string) {
    if (this.selectedOptions().includes(option)) {
      this.selectedOptions.update((prev) =>
        prev.filter((opt) => opt !== option)
      );
    } else {
      this.selectedOptions.update((prev) => [...prev, option]);
    }
    this.onChange(this.selectedOptions());
  }

  writeValue(value: string[]): void {
    this.selectedOptions.set(value || []);
  }
  registerOnChange(fn: (value: string[]) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}

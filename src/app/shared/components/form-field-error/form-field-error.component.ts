import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-field-error',
  template: `
    <p class="text-danger">
      {{ errorMessage }}
    </p>
  `,
  styleUrls: ['./form-field-error.component.scss']
})
export class FormFieldErrorComponent implements OnInit {
  @Input() control: FormControl;

  constructor() { }

  ngOnInit() {
  }

  public get errorMessage(): string | null {
    if (this.mustShowErrorMessage()) {
      return this.getErrorMessage();
    }

    return null;
  }

  private mustShowErrorMessage(): boolean {
    return this.control.invalid && this.control.touched;
  }

  private getErrorMessage(): string | null {
    if (this.control.errors.required) {
      return 'O campo é obrigatório';
    } else if (this.control.errors.email) {
      return 'Formato de email inválido';
    } else if (this.control.errors.minlength) {
      const requiredLength = this.control.errors.minlength.requiredLength;
      return `O campo deve ter no minímo ${requiredLength} caracteres`;
    } else if (this.control.errors.maxlength) {
      const requiredLength = this.control.errors.maxlength.requiredLength;
      return `O campo deve ter no maxímo ${requiredLength} caracteres`;
    }
  }

}

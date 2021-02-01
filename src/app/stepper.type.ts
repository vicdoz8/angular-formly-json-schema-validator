import { Component, OnInit } from "@angular/core";
import {
  FieldArrayType,
  FieldType,
  FormlyFormOptions,
  FormlyFieldConfig
} from "@ngx-formly/core";

@Component({
  selector: "formly-field-stepper",
  template: `
    <mat-horizontal-stepper linear>
      <mat-step
        *ngFor="
          let step of field.fieldGroup;
          let index = index;
          let last = last
        "
        [stepControl]="getStepForm(i, step)"
      >
        <ng-template matStepLabel>{{ step.templateOptions.label }}</ng-template>
        <formly-field [field]="step"></formly-field>

        <div>
          <button
            matStepperPrevious
            *ngIf="index !== 0"
            class="btn btn-primary"
            type="button"
          >
            Back
          </button>

          <button
            matStepperNext
            *ngIf="!last"
            class="btn btn-primary"
            type="button"
            [disabled]="!isValid(step)"
          >
            Next
          </button>

          <button
            *ngIf="last"
            class="btn btn-primary"
            [disabled]="!form.valid"
            type="submit"
          >
            Submit
          </button>
        </div>
      </mat-step>
    </mat-horizontal-stepper>
  `
})
export class FormlyFieldStepper extends FieldType {
  defaultOptions = {
    defaultValue: {}
  };

  getStepForm(i, field: FormlyFieldConfig) {
    const isValid = this.isValid(field);

    return { invalid: !isValid, valid: isValid };
  }

  isValid(field: FormlyFieldConfig) {
    if (field.key) {
      return field.formControl.valid;
    }

    return field.fieldGroup.every(f => this.isValid(f));
  }
}

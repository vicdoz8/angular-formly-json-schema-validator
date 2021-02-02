import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ReactiveFormsModule } from "@angular/forms";
import { FormlyModule, FormlyFieldConfig } from "@ngx-formly/core";
import { FormlyBootstrapModule } from "@ngx-formly/bootstrap";
import { HttpClientModule } from "@angular/common/http";
import { MatMenuModule } from "@angular/material/menu";
import { AppComponent } from "./app.component";
import { ArrayTypeComponent } from "./array.type";
import { ObjectTypeComponent } from "./object.type";
import { MultiSchemaTypeComponent } from "./multischema.type";
import { NullTypeComponent } from "./null.type";
import { MatStepperModule } from "@angular/material/stepper";
import { FormlyFieldStepper } from "./stepper.type";
import { FormlyFieldTabs } from "./tabs.type";
import { MatTabsModule } from "@angular/material/tabs";
import { DatatableTypeComponent } from "./datatable.type";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";

export function minItemsValidationMessage(err, field: FormlyFieldConfig) {
  return `should NOT have fewer than ${field.templateOptions.minItems} items`;
}

export function maxItemsValidationMessage(err, field: FormlyFieldConfig) {
  return `should NOT have more than ${field.templateOptions.maxItems} items`;
}

export function minlengthValidationMessage(err, field: FormlyFieldConfig) {
  return `should NOT be shorter than ${
    field.templateOptions.minLength
  } characters`;
}

export function maxlengthValidationMessage(err, field: FormlyFieldConfig) {
  return `should NOT be longer than ${
    field.templateOptions.maxLength
  } characters`;
}

export function minValidationMessage(err, field: FormlyFieldConfig) {
  return `should be >= ${field.templateOptions.min}`;
}

export function maxValidationMessage(err, field: FormlyFieldConfig) {
  return `should be <= ${field.templateOptions.max}`;
}

export function multipleOfValidationMessage(err, field: FormlyFieldConfig) {
  return `should be multiple of ${field.templateOptions.step}`;
}

export function exclusiveMinimumValidationMessage(
  err,
  field: FormlyFieldConfig
) {
  return `should be > ${field.templateOptions.step}`;
}

export function exclusiveMaximumValidationMessage(
  err,
  field: FormlyFieldConfig
) {
  return `should be < ${field.templateOptions.step}`;
}

export function constValidationMessage(err, field: FormlyFieldConfig) {
  return `should be equal to constant "${field.templateOptions.const}"`;
}

@NgModule({
  imports: [
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormlyBootstrapModule,
    MatStepperModule,
    MatTabsModule,
    HttpClientModule,
    MatMenuModule,
    NgxDatatableModule,
    FormlyModule.forRoot({
      validationMessages: [
        { name: "required", message: "This field is required" },
        { name: "null", message: "should be null" },
        { name: "minlength", message: minlengthValidationMessage },
        { name: "maxlength", message: maxlengthValidationMessage },
        { name: "min", message: minValidationMessage },
        { name: "max", message: maxValidationMessage },
        { name: "multipleOf", message: multipleOfValidationMessage },
        {
          name: "exclusiveMinimum",
          message: exclusiveMinimumValidationMessage
        },
        {
          name: "exclusiveMaximum",
          message: exclusiveMaximumValidationMessage
        },
        { name: "minItems", message: minItemsValidationMessage },
        { name: "maxItems", message: maxItemsValidationMessage },
        { name: "uniqueItems", message: "should NOT have duplicate items" },
        { name: "const", message: constValidationMessage }
      ],
      types: [
        { name: "string", extends: "input" },
        {
          name: "number",
          extends: "input",
          defaultOptions: {
            templateOptions: {
              type: "number"
            }
          }
        },
        {
          name: "integer",
          extends: "input",
          defaultOptions: {
            templateOptions: {
              type: "number"
            }
          }
        },
        { name: "boolean", extends: "checkbox" },
        { name: "enum", extends: "select" },
        {
          name: "null",
          component: NullTypeComponent,
          wrappers: ["form-field"]
        },
        { name: "array", component: ArrayTypeComponent },
        { name: "object", component: ObjectTypeComponent },
        {
          name: "stepper",
          component: FormlyFieldStepper,
          wrappers: ["form-field"]
        },
        {
          name: "datatable",
          component: DatatableTypeComponent,
          defaultOptions: {
            templateOptions: {
              columnMode: "force",
              rowHeight: "auto",
              headerHeight: "40",
              footerHeight: "40",
              limit: "10",
              scrollbarH: "true",
              reorderable: "reorderable"
            }
          }
        },
        { name: "tabs", component: FormlyFieldTabs },
        { name: "multischema", component: MultiSchemaTypeComponent }
      ]
    })
  ],
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    ArrayTypeComponent,
    ObjectTypeComponent,
    FormlyFieldStepper,
    FormlyFieldTabs,
    MultiSchemaTypeComponent,
    DatatableTypeComponent,
    NullTypeComponent
  ]
})
export class AppModule {}

/**  Copyright 2018 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */

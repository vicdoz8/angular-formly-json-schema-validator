import { Component } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FormlyFormOptions, FormlyFieldConfig } from "@ngx-formly/core";
import { FormlyJsonschema } from "@ngx-formly/core/json-schema";
import { HttpClient } from "@angular/common/http";
import { tap } from "rxjs/operators";

export interface StepType {
  label: string;
  fields: FormlyFieldConfig[];
}

@Component({
  selector: "formly-app-example",
  templateUrl: "./app.component.html"
})
export class AppComponent {
  form: FormGroup;
  model: any;
  options: FormlyFormOptions;
  fields: FormlyFieldConfig[];

  type: string;
  profiles = [
    "profile_validation_max_length",
    "profile_validation_null",
    "profile_validation_number_in_range",
    "profile_validation_string_contains",
    "step",
    "test2"
  ];

  constructor(
    private formlyJsonschema: FormlyJsonschema,
    private http: HttpClient
  ) {}

  loadProfile(type: string) {
    console.log("load profile:", type);
    this.http
      .get<any>(`assets/profiles/${type}.json`)
      .pipe(
        tap(({ schema, model }) => {
          this.type = type;
          this.form = new FormGroup({});
          this.options = {};
          //this.fields = [this.formlyJsonschema.toFieldConfig(schema)];
          this.fields = [schema];
          this.model = model;
        })
      )
      .subscribe();
  }

  submit() {
    // alert(JSON.stringify(this.model));
    console.log(this.model);
    console.log(JSON.stringify(this.model, null, "  "));
    console.log("%j", this.model);
    console.log("object: %O", this.model);
  }
}

import {CUSTOM_ELEMENTS_SCHEMA, Injector, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {createCustomElement} from "@angular/elements";
import {ReactiveFormsModule} from "@angular/forms";
import {PasswordModule} from "primeng/password";
import {CheckboxModule} from "primeng/checkbox";
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {HttpClientModule} from "@angular/common/http";
import {LoadingModule} from "./loading/loading.module";
import {ApiService} from "./services/api.service";
import {RegistrationFormComponent} from "./registration-form/registration-form.component";


@NgModule({
  declarations: [
    RegistrationFormComponent
  ],
  imports: [
    BrowserModule,
    LoadingModule,
    ReactiveFormsModule,
    PasswordModule,
    CheckboxModule,
    ButtonModule,
    InputTextModule,
    HttpClientModule
  ],
  providers: [ApiService]
})
export class AppModule {
  constructor(injector: Injector) {
    const registrationFormComponent = createCustomElement(RegistrationFormComponent, {injector});
    customElements.define('registration-form', registrationFormComponent);
  }
  ngDoBootstrap() {}
}

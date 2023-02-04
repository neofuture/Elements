import {CUSTOM_ELEMENTS_SCHEMA, Injector, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { OtpFormComponent } from './otp-form/otp-form.component';
import {createCustomElement} from "@angular/elements";
import {LoadingModule} from "./otp-form/loading/loading.module";
import {ReactiveFormsModule} from "@angular/forms";
import {PasswordModule} from "primeng/password";
import {CheckboxModule} from "primeng/checkbox";
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {HttpClientModule} from "@angular/common/http";
import {ApiService} from "./otp-form/services/api.service";
import {NgOtpInputModule} from "ng-otp-input";


@NgModule({
  declarations: [
    OtpFormComponent
  ],
  imports: [
    BrowserModule,
    LoadingModule,
    ReactiveFormsModule,
    PasswordModule,
    CheckboxModule,
    ButtonModule,
    InputTextModule,
    HttpClientModule,
    NgOtpInputModule
  ],
  providers: [ApiService]
})
export class AppModule {
  constructor(injector: Injector) {
    const otpFormComponent = createCustomElement(OtpFormComponent, {injector});
    customElements.define('otp-form', otpFormComponent);
  }
  ngDoBootstrap() {}
}

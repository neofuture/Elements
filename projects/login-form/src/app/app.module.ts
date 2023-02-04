import {CUSTOM_ELEMENTS_SCHEMA, Injector, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LoginFormComponent } from './login-form/login-form.component';
import {createCustomElement} from "@angular/elements";
import {LoadingModule} from "./login-form/loading/loading.module";
import {ReactiveFormsModule} from "@angular/forms";
import {PasswordModule} from "primeng/password";
import {CheckboxModule} from "primeng/checkbox";
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {HttpClientModule} from "@angular/common/http";
import {ApiService} from "./login-form/services/api.service";


@NgModule({
  declarations: [
    LoginFormComponent
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
    const loginFormComponent = createCustomElement(LoginFormComponent, {injector});
    customElements.define('login-form', loginFormComponent);
  }
  ngDoBootstrap() {}
}

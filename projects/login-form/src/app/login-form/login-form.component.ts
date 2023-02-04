import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "./services/api.service";

@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrls: [
    './login-form.component.css',
    './extra-styles.css'
  ],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class LoginFormComponent implements OnInit, AfterViewInit {
  form: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  submitted = false
  loading = false;

  ip: any;
  @ViewChild('email', {static: true}) email?: ElementRef;
  @Input() heading: string | undefined;
  @Input() body: string | undefined;
  @Input() otp: string= '';

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService) {
    this.ip = this.apiService.ipAddress;
  }

  ngAfterViewInit() {
    this.email?.nativeElement.focus();
  }

  ngOnInit(): void {
    this.apiService.getIp().subscribe((ip: any) => {
      this.ip = ip.ip;
    });
    this.form = this.formBuilder.group(
      {
        email: [
          '',
          [
            Validators.required,
            Validators.email
          ]
        ],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40)
          ]
        ]
      }
    );
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.form.value.ip_address = this.ip
    console.log(this.form.value);
    this.loading = true;
  }

}


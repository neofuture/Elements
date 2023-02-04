import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../services/api.service";
import Validation, {startsWith07} from './utils/validation';

@Component({
  selector: 'registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: [
    './registration-form.component.css',
    './extra-styles.css'
  ],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class RegistrationFormComponent implements OnInit, AfterViewInit {
  form: FormGroup = new FormGroup({
    first_name: new FormControl(''),
    last_name: new FormControl(''),
    phone: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    c_password: new FormControl(''),
  });
  submitted = false
  loading = false;
  private Validation = Validation;
  ip: any;

  @Input() heading: string | undefined;
  @Input() body: string | undefined;
  @ViewChild('firstname', { static: true }) firstname?: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService) {
    this.ip = this.apiService.ipAddress;
  }

  ngAfterViewInit() {
    this.firstname?.nativeElement.focus();
  }
  ngOnInit(): void {
    this.apiService.getIp().subscribe((ip: any) => {
      this.ip = ip.ip;
    });
    this.form = this.formBuilder.group(
      {
        first_name: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(15),
          ]
        ],
        last_name: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(15),
          ]
        ],
        phone: [
          '',
          [
            Validators.required,
            Validators.minLength(11),
            Validators.maxLength(11),
            startsWith07
          ]
        ],
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
        ],
        c_password: [
          '',
          Validators.required
        ],
      },
      {
        validators: [
          this.Validation.match('password', 'c_password')
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
    this.form.value.phone = this.convertPhoneNumber(this.form.value.phone);
    console.log(this.form.value);
    this.loading = true;
  }

  convertPhoneNumber(phoneNumber: any) {
    if (phoneNumber.startsWith("0")) {
      return "44" + phoneNumber.slice(1);
    } else {
      return "44" + phoneNumber;
    }
  }
}

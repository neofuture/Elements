import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'otp-form',
  templateUrl: './otp-form.component.html',
  styleUrls: [
    './otp-form.component.css',
    './extra-styles.css'
  ]
})
export class OtpFormComponent implements OnInit{
  loading = false;
  otp: string | undefined;
  @Input() heading: string | undefined;
  @Input() body: string | undefined;
  @Input() otpLength  = 5;
  @Output() otpChange = new EventEmitter<string>();
  ngOnInit(): void {
  }

  onOtpChange($event: string) {
    this.otp = $event;
    this.otpChange.emit(this.otp);
  }
}



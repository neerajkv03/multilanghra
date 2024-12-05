import {
  Component,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormsModule,
  FormBuilder,
  FormControl,
  Validators,
  FormGroup,
  AbstractControl,
} from '@angular/forms';

import { resendOTPTimeSpan } from '@env/environment';
import { PrimeNGModules } from 'src/app/primeng.module';
import { RouteEndpoints } from '@constants/route-endpoints';
import { GlobalService } from '@services/global.service';
import { HttpsService } from '@services/https.service';

@Component({
  selector: 'app-forgot-change-password',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, PrimeNGModules],
  templateUrl: './forgot-change-password.component.html',
  styleUrls: ['./forgot-change-password.component.scss'],
})
export class ForgotChangePasswordComponent implements OnInit, OnDestroy {
  constructor(
    private globalService: GlobalService,
    private httpsService: HttpsService,
    private fb: FormBuilder
  ) {}
  invalidForm: boolean = false;
  otpsend: boolean = false;
  forgotPasswordForm: FormGroup = this.fb.group({
    adminId: ['', [Validators.required]],
    newpassword: [
      '',
      [
        Validators.required,
        Validators.pattern(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[`~!@#\$%\^&\*\(\)_=\-\+{}\[\]\\\|:;'"<>,\.\?\/])[A-Za-z\d`~!@#\$%\^&\*\(\)_=\-\+{}\[\]\\\|:;'"<>,\.\?\/]{8,}$/
        ),
      ],
    ],
    confirmpassword: ['', [Validators.required]],
  });
  otp: FormControl = this.fb.control(null, [Validators.required]);
  resendTimeSeconds = 0;
  resendTimerIntervalRef: any = null;
  loginOctoAdminDetails: any;
  @Output('passwordChanged') passwordChanged: EventEmitter<boolean> =
    new EventEmitter(false);

  ngOnInit(): void {
    this.loginOctoAdminDetails =
      this.globalService.getDecryptedLocalStorageItem('loginOctoAdminDetails');

    if (this.loginOctoAdminDetails?.loginID) {
      this.forgotPasswordForm
        .get('adminId')
        ?.setValue(this.loginOctoAdminDetails?.loginID || '');
    }
  }
  startResendTimer() {
    this.resendTimeSeconds = resendOTPTimeSpan;

    this.resetResendTimer();

    if (!this.resendTimerIntervalRef) {
      this.resendTimerIntervalRef = setInterval(() => {
        if (this.resendTimeSeconds > 0) {
          this.resendTimeSeconds = this.resendTimeSeconds - 1;
        } else clearInterval(this.resendTimerIntervalRef);
      }, 1000);
    }
  }
  resetResendTimer() {
    if (this.resendTimerIntervalRef) {
      clearInterval(this.resendTimerIntervalRef);
      this.resendTimerIntervalRef = null;
    }
  }
  sendVerifyOTP() {
    if (this.otpsend) {
      if (this.otp.valid) {
        // this.httpsService
        //   .postRequest(RouteEndpoints.VERIFY_OTP, {
        //     adminID: this.forgotPasswordForm.value?.adminId,
        //     adminotp: this.otp.value,
        //   })
        //   .subscribe({
        //     next: (res) => {
        //       if (res?.success) {
        //         this.httpsService
        //           .postRequest(RouteEndpoints.CHANGE_PASSWORD, {
        //             adminID: this.forgotPasswordForm.value?.adminId,
        //             adminPwd: this.forgotPasswordForm.value?.newpassword,
        //           })
        //           .subscribe({
        //             next: (pRes) => {
        //               if (pRes?.success) {
        //                 this.globalService.triggerToastMessage(
        //                   'success',
        //                   'Password changed successfully!!!'
        //                 );
        //                 this.passwordChanged.emit(true);
        //               }
        //             },
        //           });
        //       }
        //     },
        //   });
      }
    } else {
      this.invalidForm = this.forgotPasswordForm.invalid;

      if (this.forgotPasswordForm.valid) {
        // this.httpsService
        //   .postRequest(
        //     `${RouteEndpoints.GENERATE_OTP}${this.forgotPasswordForm.value?.adminId}`,
        //     {}
        //   )
        //   .subscribe({
        //     next: (res) => {
        //       if (res?.success) {
        //         this.globalService.triggerToastMessage(
        //           'success',
        //           'OTP has been sent to your registered mobile number.'
        //         );
        //         this.otpsend = true;
        //         this.startResendTimer();
        //       }
        //     },
        //   });
      }
    }
  }
  resendOTP() {
    this.invalidForm = this.forgotPasswordForm.invalid;

    if (this.forgotPasswordForm.valid) {
      // this.httpsService
      //   .postRequest(
      //     `${RouteEndpoints.GENERATE_OTP}${this.forgotPasswordForm.value?.adminId}`,
      //     {}
      //   )
      //   .subscribe({
      //     next: (res) => {
      //       if (res?.success) {
      //         this.globalService.triggerToastMessage(
      //           'success',
      //           'OTP has been resend to your registered mobile number.'
      //         );
      //         this.otpsend = true;
      //         this.startResendTimer();
      //       }
      //     },
      //   });
    }
  }
  keyPressEvent(event: any) {
    if (event?.target?.value?.length > 5) {
      return false;
    }
    return true;
  }
  isFieldRequired(field: string, formgroup: FormGroup): boolean {
    return (formgroup.get(field) as AbstractControl).hasValidator(
      Validators.required
    );
  }

  ngOnDestroy(): void {
    this.resetResendTimer();
  }
}

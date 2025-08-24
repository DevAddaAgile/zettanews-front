import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { Store } from '@ngxs/store';
import { UpdatePassword } from '../../../shared/action/auth.action';
import { Breadcrumb } from '../../../shared/interface/breadcrumb';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonComponent } from '../../../shared/components/widgets/button/button.component';
import { AlertComponent } from '../../../shared/components/widgets/alert/alert.component';
import { BreadcrumbComponent } from '../../../shared/components/widgets/breadcrumb/breadcrumb.component';

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.scss'],
    standalone: true,
    imports: [
        BreadcrumbComponent,
        AlertComponent,
        ReactiveFormsModule,
        ButtonComponent,
        TranslateModule,
        RouterLink
    ]
})
export class ResetPasswordComponent implements OnInit {

  public form: FormGroup;
  public email: string = '';
  public token: string = '';
  public isValidToken: boolean = false;
  public breadcrumb: Breadcrumb = {
    title: "Reset Password",
    items: [{ label: 'Reset Password', active: true }]
  }

  constructor(
    private store: Store,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.formBuilder.group({
      newPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', [Validators.required]),
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit() {
    // Get token and email from URL parameters
    this.route.queryParams.subscribe(params => {
      this.token = params['token'] || '';
      this.email = params['email'] || '';
      
      if (!this.token || !this.email) {
        this.isValidToken = false;
        // Redirect to forgot password if no token/email
        setTimeout(() => {
          this.router.navigate(['/auth/forgot-password']);
        }, 2000);
      } else {
        this.isValidToken = true;
      }
    });
  }

  // Custom validator to check if passwords match
  passwordMatchValidator(form: FormGroup) {
    const password = form.get('newPassword');
    const confirmPassword = form.get('confirmPassword');
    
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }
    
    if (confirmPassword && confirmPassword.errors?.['passwordMismatch']) {
      delete confirmPassword.errors['passwordMismatch'];
      if (Object.keys(confirmPassword.errors).length === 0) {
        confirmPassword.setErrors(null);
      }
    }
    
    return null;
  }

  submit() {
    this.form.markAllAsTouched();
    if(this.form.valid && this.isValidToken) {
      this.store.dispatch(
          new UpdatePassword({
            email: this.email,
            token: this.token,
            password: this.form.value.newPassword,
            password_confirmation: this.form.value.confirmPassword,
          })
      ).subscribe(
        {
          complete: () => { 
            this.router.navigateByUrl('/auth/login'); 
          }     
        }
      );
    }
  }

}

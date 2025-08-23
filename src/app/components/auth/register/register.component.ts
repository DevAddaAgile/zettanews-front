import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngxs/store';
import { Register } from '../../../shared/action/auth.action';
import { Breadcrumb } from '../../../shared/interface/breadcrumb';
import * as data from '../../../shared/data/country-code';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonComponent } from '../../../shared/components/widgets/button/button.component';
import { Select2Module } from 'ng-select2-component';
import { CommonModule } from '@angular/common';

import { BreadcrumbComponent } from '../../../shared/components/widgets/breadcrumb/breadcrumb.component';
import { isPlatformBrowser } from '@angular/common';
@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
    standalone: true,
    imports: [CommonModule, BreadcrumbComponent, ReactiveFormsModule, Select2Module, ButtonComponent, RouterLink, TranslateModule]
})
export class RegisterComponent {

  public form: FormGroup;
  public breadcrumb: Breadcrumb = {
    title: "Sign In",
    items: [{ label: 'Sign In', active: true }]
  }
  public codes = data.countryCodes;
  public tnc = new FormControl(false, [Validators.requiredTrue]);
  public isBrowser: boolean;
  
  constructor(
    private store: Store,
    private router: Router,
    private formBuilder: FormBuilder,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.form = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl(''), // Made optional
      password: new FormControl('', [Validators.required]),
    });
  }

  submit() {
    this.form.markAllAsTouched();
    if(this.tnc.invalid){
      return
    }
    if(this.form.valid) {
      // Prepare data for API - only include phone if it has a value
      const formData = this.form.value;
      if (!formData.phone) {
        delete formData.phone;
      }
      
      this.store.dispatch(new Register(formData)).subscribe({
          complete: () => {
            // Registration successful, you can redirect or show additional success message
            console.log('Registration completed');
          },
          error: (error) => {
            console.error('Registration error:', error);
          }
        }
      );
    }
  }
}

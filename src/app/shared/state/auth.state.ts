import { Injectable } from "@angular/core";
import { Store, State, Selector, Action, StateContext } from "@ngxs/store";
import { Router } from '@angular/router';
import { AccountClear, GetUserDetails } from "../action/account.action";
import { Register, Login, ForgotPassWord, VerifyEmailOtp, UpdatePassword, Logout, AuthClear } from "../action/auth.action";
import { NotificationService } from "../services/notification.service";
import { AuthService } from "../services/auth.service";
import { catchError, tap } from "rxjs/operators";
import { of } from "rxjs";

export interface AuthStateModel {
  email: String;
  token: String | Number;
  access_token: String | null;
}

@State<AuthStateModel>({
  name: "auth",
  defaults: {
    email: '',
    token: '',
    access_token: ''
  },
})
@Injectable()
export class AuthState {

  constructor(private store: Store, public router: Router,
    private notificationService: NotificationService, private authService: AuthService) {}


  ngxsOnInit(ctx: StateContext<AuthStateModel>) {
    // Pre Fake Login (if you are using ap
    ctx.patchState({
      email: 'john.customer@example.com',
      token: '',
      access_token: '115|laravel_sanctum_mp1jyyMyKeE4qVsD1bKrnSycnmInkFXXIrxKv49w49d2a2c5'
    })
  }

  @Selector()
  static accessToken(state: AuthStateModel): String | null {
    return state.access_token;
  }

  @Selector()
  static isAuthenticated(state: AuthStateModel): Boolean {
    return !!state.access_token;
  }

  @Selector()
  static email(state: AuthStateModel): String {
    return state.email;
  }

  @Selector()
  static token(state: AuthStateModel): String | Number {
    return state.token;
  }

  @Action(Register)
  register(ctx: StateContext<AuthStateModel>, action: Register) {
    return this.authService.register(action.payload).pipe(
      tap((response) => {
        // Show success message for 201 status
        this.notificationService.showSuccess('User registered successfully!');
        // You can add additional logic here like storing user data or redirecting
      }),
      catchError((error) => {
        // Show error message
        this.notificationService.showError('Registration failed. Please try again.');
        return of(error);
      })
    );
  }

  @Action(Login)
  login(ctx: StateContext<AuthStateModel>, action: Login) {
    return this.authService.login(action.payload).pipe(
      tap((response) => {
        // Store the token and user info
        ctx.patchState({
          email: response.user.email,
          token: response.token,
          access_token: response.token
        });
        
        // Store token in localStorage for persistence
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        
        this.notificationService.showSuccess('Login successful!');
        
        // Get user details
        this.store.dispatch(new GetUserDetails());
      }),
      catchError((error) => {
        this.notificationService.showError('Login failed. Please check your credentials.');
        return of(error);
      })
    );
  }

  @Action(ForgotPassWord)
  forgotPassword(ctx: StateContext<AuthStateModel>, action: ForgotPassWord) {
    return this.authService.forgotPassword(action.payload).pipe(
      tap((response) => {
        this.notificationService.showSuccess('If an account with that email exists, a password reset link has been sent.');
        // No need to store tokens in localStorage anymore - they come via email
      }),
      catchError((error) => {
        this.notificationService.showError('Failed to send reset email. Please try again.');
        return of(error);
      })
    );
  }

  @Action(VerifyEmailOtp)
  verifyEmail(ctx: StateContext<AuthStateModel>, action: VerifyEmailOtp) {
    // Verify Logic Here
    return of(null);
  }

  @Action(UpdatePassword)
  updatePassword(ctx: StateContext<AuthStateModel>, action: UpdatePassword) {
    return this.authService.resetPassword(action.payload).pipe(
      tap((response) => {
        this.notificationService.showSuccess('Password updated successfully!');
        // Clear reset tokens
        localStorage.removeItem('resetToken');
        localStorage.removeItem('resetEmail');
        // Redirect to login
        this.router.navigate(['/auth/login']);
      }),
      catchError((error) => {
        this.notificationService.showError('Failed to update password. Please try again.');
        return of(error);
      })
    );
  }

  @Action(Logout)
  logout(ctx: StateContext<AuthStateModel>) {
    // Clear state
    ctx.patchState({
      email: '',
      token: '',
      access_token: null,
    });
    
    // Clear localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('resetToken');
    localStorage.removeItem('resetEmail');
    
    // Clear account data
    this.store.dispatch(new AccountClear());
    
    // Redirect to login
    this.router.navigate(['/auth/login']);
    
    this.notificationService.showSuccess('Logged out successfully!');
  }

  @Action(AuthClear)
  authClear(ctx: StateContext<AuthStateModel>){
    ctx.patchState({
      email: '',
      token: '',
      access_token: null,
    });
    this.store.dispatch(new AccountClear());
  }

}

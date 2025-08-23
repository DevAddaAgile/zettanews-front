export interface AuthUserStateModel {
  email: string;
  password: string;
}

export interface AuthUserForgotModel {
  email: string;
}

export interface VerifyEmailOtpModel {
  email: string;
  token: string;
}

export interface UpdatePasswordModel {
  password: string;
  password_confirmation: string;
  email: string;
  token: string;
}

export interface RegisterModal {
  name: string;
  email: string;
  password: string;
  phone?: string; // optional as per API spec
}



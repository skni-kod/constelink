export class AuthenticationError extends Error {
  constructor(message: AuthenticationErrorMessage) {
    super(message);
  }
}

export type AuthenticationErrorMessage =
  | "credentials-required"
  | "email-invalid"
  | "password-invalid";

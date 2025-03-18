//class contains a public method checkPassword

// Enum defining possible password validation errors with corresponding error messages
export enum PasswordErrors {
  SHORT = "Password is too short!",
  NO_UPPER_CASE = "Upper case letter required!",
  NO_LOWER_CASE = "Lower case letter required!",
}

// Interface defining the structure of a password validation result
export interface CheckResult {
  valid: boolean;
  reasons: PasswordErrors[];
}

export class PasswordChecker {
  public checkPassword(password: string): CheckResult {
    const reasons: PasswordErrors[] = [];
    if (password.length < 8) {
      reasons.push(PasswordErrors.SHORT);
    }
    if (password == password.toLowerCase()) {
      reasons.push(PasswordErrors.NO_UPPER_CASE);
    }

    if (password == password.toUpperCase()) {
      reasons.push(PasswordErrors.NO_LOWER_CASE);
    }
    return {
      valid: reasons.length > 0 ? false : true,
      reasons: reasons,
    };
  }
}

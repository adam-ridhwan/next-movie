export const AuthStrings = {
  signIn: 'Sign in',
  signUp: 'Sign up',
  emailAddress: 'Email address',
  password: 'Password',
  repeatPassword: 'Repeat password',
  loginToYourAccount: 'Login to your account',
  dontHaveAnAccount: "Don't have an account?",
  createAnAccount: 'Create an account',
  alreadyHandAnAccount: 'Already have an account?',
  userCreatedSuccessfully: 'User created successfully',
} as const;

export const ErrorStrings = {
  allFieldsAreRequired: 'All fields are required',
  passwordIsTooShort: 'Password is too short',
  passwordsDoNotMatch: 'Passwords do not match',
  userDoesNotExists: 'User does not exist',
  userAlreadyExists: 'User already exists',
  invalidPassword: 'Invalid password',
} as const;

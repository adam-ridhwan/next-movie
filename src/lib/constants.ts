export const DEVELOPMENT_MODE = process.env.NEXT_PUBLIC_NODE_ENV === 'development';

export const authStrings = {
  signIn: 'Sign in',
  signUp: 'Sign up',
  signOut: 'Sign out',
  emailAddress: 'Email address',
  password: 'Password',
  repeatPassword: 'Repeat password',
  loginToYourAccount: 'Login to your account',
  dontHaveAnAccount: "Don't have an account?",
  createAnAccount: 'Create an account',
  alreadyHandAnAccount: 'Already have an account?',
  userCreatedSuccessfully: 'User created successfully',
  signedInSuccessfully: 'Signed in successfully',
} as const;

export const errorStrings = {
  allFieldsAreRequired: 'All fields are required',
  passwordIsTooShort: 'Password is too short',
  passwordsDoNotMatch: 'Passwords do not match',
  userDoesNotExists: 'User does not exist',
  userAlreadyExists: 'User already exists',
  invalidPassword: 'Invalid password',
} as const;

export const libraryStrings = {
  action: 'Action Movies',
  trending: 'Trending',
  recommendedForYou: 'Recommended for you',
} as const;

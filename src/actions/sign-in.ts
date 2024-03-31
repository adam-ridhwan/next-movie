'use server';

import bcrypt from 'bcrypt';

import { connectToDb } from '@/lib/connect-to-db';
import { authStrings, errorStrings } from '@/lib/constants';
import { FormResponse, userSchema } from '@/lib/types';

export async function signIn({
  email,
  password,
}: {
  email: string | undefined;
  password: string | undefined;
}): Promise<FormResponse> {
  const { usersCollection } = await connectToDb();

  if (!email || !password) {
    return {
      success: false,
      message: errorStrings.allFieldsAreRequired,
    };
  }

  const parsedResult = userSchema.safeParse({
    email,
    password,
  });
  if (!parsedResult.success) {
    const { message, code } = parsedResult.error.issues[0];

    if (code === 'too_small') {
      return {
        success: false,
        message: errorStrings.passwordIsTooShort,
      };
    }

    return {
      success: false,
      message: message,
    };
  }

  const { email: parsedEmail, password: parsedPassword } = parsedResult.data;

  const existingUser = await usersCollection.findOne({ email: parsedEmail });
  if (!existingUser) {
    return {
      success: false,
      message: errorStrings.userDoesNotExists,
    };
  }

  const passwordsMatched = await bcrypt.compare(parsedPassword, existingUser.password);
  if (!passwordsMatched) {
    return {
      success: false,
      message: errorStrings.invalidPassword,
    };
  }

  return {
    success: true,
    message: authStrings.signedInSuccessfully,
    user: existingUser,
  };
}

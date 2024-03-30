'use server';

import bcrypt from 'bcrypt';

import { connectToDatabase } from '@/lib/connectToDatabase';
import { FormResponse, userSchema } from '@/lib/types';
import { ErrorStrings } from '@/components/shared/strings';

export async function signIn({
  email,
  password,
}: {
  email: string | undefined;
  password: string | undefined;
}): Promise<FormResponse> {
  const { usersCollection } = await connectToDatabase();

  if (!email || !password) {
    return {
      success: false,
      message: ErrorStrings.allFieldsAreRequired,
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
        message: ErrorStrings.passwordIsTooShort,
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
      message: ErrorStrings.userDoesNotExists,
    };
  }

  const passwordsMatched = await bcrypt.compare(parsedPassword, existingUser.password);
  if (!passwordsMatched) {
    return {
      success: false,
      message: ErrorStrings.invalidPassword,
    };
  }

  return {
    success: true,
    message: ErrorStrings.userDoesNotExists,
    user: existingUser,
  };
}

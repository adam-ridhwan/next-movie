'use server';

import bcrypt from 'bcrypt';

import { AuthStrings, ErrorStrings } from '@/app/components/app-strings';
import { connectToDatabase } from '@/app/lib/connectToDatabase';
import { FormResponse, userSchema } from '@/app/lib/types';

const SALT_ROUNDS = 10;

export type SignUpData = {
  email: string;
  password: string;
  repeatedPassword: string;
};

export async function signUp({
  email,
  password,
  repeatedPassword,
}: SignUpData): Promise<FormResponse> {
  if (!email || !password || !repeatedPassword) {
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
    const zodMessage = parsedResult.error.issues[0].message;
    const zodCode = parsedResult.error.issues[0].code;

    if (zodCode === 'too_small') {
      return {
        success: false,
        message: zodMessage,
      };
    }

    return {
      success: false,
      message: zodMessage,
    };
  }

  const { email: parsedEmail, password: parsedPassword } = parsedResult.data;

  if (parsedPassword !== repeatedPassword) {
    return {
      success: false,
      message: ErrorStrings.passwordsDoNotMatch,
    };
  }

  const { usersCollection } = await connectToDatabase();
  const existingUser = await usersCollection.findOne({ email: parsedEmail });
  if (existingUser) {
    return {
      success: false,
      message: ErrorStrings.userAlreadyExists,
    };
  }

  const hashedPassword = await bcrypt.hash(parsedPassword, SALT_ROUNDS);

  const newUser = {
    email: parsedEmail,
    password: hashedPassword,
    name: null,
    emailVerified: null,
    image: null,
  };

  await usersCollection.insertOne(newUser);

  return {
    success: true,
    message: AuthStrings.userCreatedSuccessfully,
  };
}

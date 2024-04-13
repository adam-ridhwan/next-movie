'use server';

import bcrypt from 'bcrypt';

import { prisma } from '@/lib/client';
import { authStrings, errorStrings } from '@/lib/constants';
import { FormResponse } from '@/lib/types';
import UserSchema from '@/lib/zod-types.ts/modelSchema/UserSchema';

const SALT_ROUNDS = 10;

export type SignUpPayload = {
  email: string;
  password: string;
  repeatedPassword: string;
};

export async function signUp({ email, password, repeatedPassword }: SignUpPayload): Promise<FormResponse> {
  if (!email || !password || !repeatedPassword) {
    return {
      success: false,
      message: errorStrings.allFieldsAreRequired,
    };
  }

  const parsedResult = UserSchema.safeParse({
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
      message: errorStrings.passwordsDoNotMatch,
    };
  }

  const existingUser = await prisma.user.findUnique({ where: { email: parsedEmail } });
  if (existingUser) {
    return {
      success: false,
      message: errorStrings.userAlreadyExists,
    };
  }

  const hashedPassword = await bcrypt.hash(parsedPassword, SALT_ROUNDS);

  const newUser = {
    email: parsedEmail,
    password: hashedPassword,
    name: '',
    emailVerified: false,
    image: null,
  };

  await prisma.user.create({ data: newUser });

  return {
    success: true,
    message: authStrings.userCreatedSuccessfully,
  };
}

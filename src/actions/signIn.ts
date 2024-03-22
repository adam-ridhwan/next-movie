'use server';

import bcrypt from 'bcrypt';

import { connectToDatabase } from '@/lib/connectToDatabase';
import { FormResponse, userSchema } from '@/lib/types';
import { delay } from '@/lib/utils';

const SALT_ROUNDS = 10;

export async function signIn(_: FormResponse, formData: FormData): Promise<FormResponse> {
  await delay(2000);
  const email = formData.get('email');
  const password = formData.get('password');

  if (!email || !password) {
    return {
      success: false,
      message: 'All fields are required',
    };
  }

  const parsedResult = userSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
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

  const { usersCollection } = await connectToDatabase();
  const existingUser = await usersCollection.findOne({ email: parsedEmail });
  if (!existingUser) {
    return {
      success: false,
      message: 'User does not exist',
    };
  }

  const passwordsMatched = await bcrypt.compare(parsedPassword, existingUser.password);
  if (!passwordsMatched) {
    return {
      success: false,
      message: 'Invalid password',
    };
  }

  return {
    success: true,
    message: 'User created',
  };
}

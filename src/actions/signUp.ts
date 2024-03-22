'use server';

import bcrypt from 'bcrypt';

import { connectToDatabase } from '@/lib/connectToDatabase';
import { FormResponse, userSchema } from '@/lib/types';

const SALT_ROUNDS = 10;

export async function signUp(_: FormResponse, formData: FormData): Promise<FormResponse> {
  const email = formData.get('email');
  const password = formData.get('password');
  const repeatedPassword = formData.get('repeated-password');

  if (!email || !password || !repeatedPassword) {
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

  if (parsedPassword !== repeatedPassword) {
    return {
      success: false,
      message: 'Passwords do not match',
    };
  }

  const { usersCollection } = await connectToDatabase();
  const existingUser = await usersCollection.findOne({ email: parsedEmail });
  if (existingUser) {
    return {
      success: false,
      message: 'User already exists',
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
    message: 'User created',
  };
}

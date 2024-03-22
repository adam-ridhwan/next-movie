'use server';

import bcrypt from 'bcrypt';

import { connectToDatabase } from '@/lib/connectToDatabase';
import { FormResponse, userSchema } from '@/lib/types';

const SALT_ROUNDS = 10;

export async function signUp(_: FormResponse, formData: FormData): Promise<FormResponse> {
  if (!formData.get('email') || !formData.get('password') || !formData.get('repeated-password')) {
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

    if (parsedResult.error.issues[0].code === 'too_small') {
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

  const { email, password } = parsedResult.data;

  const repeatedPassword = formData.get('repeated-password');
  if (password !== repeatedPassword) {
    return {
      success: false,
      message: 'Passwords do not match',
    };
  }

  const { usersCollection } = await connectToDatabase();
  const existingUser = await usersCollection.findOne({ email });
  if (existingUser) {
    return {
      success: false,
      message: 'User already exists',
    };
  }

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  const newUser = {
    email,
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

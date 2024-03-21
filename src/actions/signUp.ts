'use server';

import bcrypt from 'bcrypt';
import { ObjectId } from 'mongodb';

import { connectToDatabase } from '@/lib/connectToDatabase';
import { TODO, userSchema } from '@/lib/types';

const SALT_ROUNDS = 10;

export async function signUp(_: string, formData: FormData): Promise<TODO> {
  const parsedResult = userSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!parsedResult.success) {
    if (parsedResult.error.issues[0].code === 'too_small')
      return {
        response: 'Password is too short',
      };

    return {
      response: 'Validation failed',
      errors: parsedResult.error.issues,
    };
  }

  const { email, password } = parsedResult.data;

  const repeatedPassword = formData.get('repeated-password');
  if (password !== repeatedPassword) {
    return {
      response: 'Passwords do not match',
    };
  }

  const { usersCollection } = await connectToDatabase();
  const existingUser = await usersCollection.findOne({ email });
  if (existingUser) {
    return {
      response: 'User already exists',
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
    response: '',
  };
}

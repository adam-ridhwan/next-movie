'use server';

import bcrypt from 'bcrypt';

import { connectToDatabase } from '@/lib/connectToDatabase';

const saltRounds = 10;

export async function signUp(_: string, formData: FormData) {
  const { usersCollection } = await connectToDatabase();

  const email = formData.get('email');
  const password = formData.get('password');
  const repeatedPassword = formData.get('repeated-password');

  console.log(email, password, repeatedPassword);

  if (!email || !password || !repeatedPassword) {
    return {
      response: 'Please fill in all fields',
    };
  }

  if (password !== repeatedPassword) {
    return {
      response: 'Passwords do not match',
    };
  }

  bcrypt.hash(password.toString(), saltRounds, function (err, hash) {
    console.log(hash);
  });

  return {
    response: 'success',
  };
}

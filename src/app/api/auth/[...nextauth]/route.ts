import NextAuth from 'next-auth';

const handler = NextAuth({
  providers: [
    // GoogleProvider({
    //   clientId: GOOGLE_ID,
    //   clientSecret: GOOGLE_SECRET,
    // }),
  ],
});

export { handler as GET, handler as POST };

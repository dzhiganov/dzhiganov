import { betterAuth } from 'better-auth';
import { mongodbAdapter } from 'better-auth/adapters/mongodb';
import { MongoClient } from 'mongodb';
import { Resend } from 'resend';

const dbClient = new MongoClient(process.env.MONGODB_URI || '');
const db = dbClient.db('dzhiganov');
const resend = new Resend(process.env.RESEND_API_KEY);

export const auth = betterAuth({
  database: mongodbAdapter(db),
  trustedOrigins: [
    'http://localhost:3000',
    process.env.NUXT_PUBLIC_BASE_URL || 'http://localhost:3000',
  ].filter(Boolean),
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
  },
  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          console.log('new user created', user);
        },
      },
    },
  },
  callbacks: {
    afterSignIn: async (user: any, account: any) => {
      console.log('user signed in', user, account);
    },
    afterSignUp: async (user: any, account: any) => {
      console.log('user signed up', user, account);
    },
  },
});

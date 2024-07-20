import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Resend from "next-auth/providers/resend";
import Passkey from "next-auth/providers/passkey";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/prisma/prisma_client";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google,
    Resend({
      apiKey: process.env.AUTH_RESEND_KEY,
      from: "no-reply@jakecampbell.dev",
    }),
    Passkey,
  ],
  experimental: { enableWebAuthn: true },
  callbacks: {
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
  },
});

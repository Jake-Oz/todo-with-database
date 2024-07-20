import { signIn } from "@/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Passkey from "@/components/passkey";
import Image from "next/image";
import { TfiEmail } from "react-icons/tfi";

import darkSignInWithGoogle from "@/public/web_dark_rd_SI@1x.png";
import lightSignInWithGoogle from "@/public/web_light_rd_SI@1x.png";
import { SessionProvider } from "next-auth/react";
import OrSpacer from "./ui/or-spacer";

export default function SignIn() {
  return (
    <div className="p-4 rounded-lg  w-64 bg-gradient-to-tl from-primary-gradient-left to-primary-gradient-right dark:bg-neutral-white text-dark-theme-very-dark-blue">
      <div className="flex flex-col gap-2 justify-center items-center  text-neutral-white dark:text-dark-theme-very-dark-blue">
        <h1 className="font-bold tracking-widest">TODO Login</h1>
        <form
          action={async () => {
            "use server";
            await signIn("google");
          }}
        >
          <button type="submit">
            <Image
              src={darkSignInWithGoogle}
              alt="Sign in with Google"
              className="hidden dark:inline-block border-2 border-dark-theme-very-dark-blue rounded-3xl"
            />
            <Image
              src={lightSignInWithGoogle}
              alt="Sign in with Google"
              className="inline-block dark:hidden border-2 border-neutral-white rounded-3xl"
            />
          </button>
        </form>
        <OrSpacer />
        <form
          action={async (formData) => {
            "use server";
            await signIn("resend", formData);
          }}
          className="flex flex-col items-center gap-4"
        >
          <Input
            type="email"
            name="email"
            placeholder="Email"
            required
            className="text-dark-theme-very-dark-blue dark:text-neutral-white"
          />
          <Button
            type="submit"
            className="border border-dark-theme-very-dark-blue dark:border-neutral-white ring-2 ring-neutral-white dark:ring-dark-theme-very-dark-blue rounded-3xl h-10 w-44 dark:bg-dark-theme-very-dark-blue bg-neutral-white text-dark-theme-very-dark-blue dark:text-neutral-white"
          >
            <div className="flex items-center justify-center gap-2 ">
              <TfiEmail className="mb-1 text-lg" />
              <span>Sign in with Email</span>
            </div>
          </Button>
        </form>

        <SessionProvider>
          <Passkey />
        </SessionProvider>
      </div>
    </div>
  );
}

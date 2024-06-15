import { signIn } from "@/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { TfiEmail } from "react-icons/tfi";

import darkSignInWithGoogle from "@/public/web_dark_rd_SI@1x.png";
import lightSignInWithGoogle from "@/public/web_light_rd_SI@1x.png";

export default function SignIn() {
  return (
    <div className="p-4 rounded-lg  w-64 bg-dark-theme-very-dark-blue dark:bg-neutral-white text-dark-theme-very-dark-blue">
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
              className="hidden dark:inline-block"
            />
            <Image
              src={lightSignInWithGoogle}
              alt="Sign in with Google"
              className="inline-block dark:hidden"
            />
          </button>
        </form>
        <div className="relative w-full flex items-center">
          <div className="flex-grow border-t border-neutral-dark-grayish-blue"></div>
          <span className="flex-shrink mx-4 text-gray-400">or</span>
          <div className="flex-grow border-t border-neutral-dark-grayish-blue"></div>
        </div>
        <form
          action={async (formData) => {
            "use server";
            // try {
            await signIn("resend", formData);
            // } catch (error) {
            //   console.error(error);
            // }
          }}
          className="flex flex-col items-center gap-4"
        >
          <Input
            type="text"
            name="email"
            placeholder="Email"
            className="text-dark-theme-very-dark-blue dark:text-neutral-white"
          />
          <Button
            type="submit"
            className="rounded-3xl h-10 w-44 dark:bg-dark-theme-very-dark-blue bg-neutral-white text-dark-theme-very-dark-blue dark:text-neutral-white"
          >
            <div className="flex items-center justify-center gap-2 ">
              <TfiEmail className="mb-1 text-lg" />
              <span>Sign in with Email</span>
            </div>
          </Button>
        </form>
      </div>
    </div>
  );
}

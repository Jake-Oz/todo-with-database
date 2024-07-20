"use client";

// Code for the Passkey component

import { signIn } from "next-auth/webauthn";
import { useSession } from "next-auth/react";

export default function Passkey() {
  const { data: session, update, status } = useSession();
  return (
    <div>
      {status === "authenticated" ? (
        <button
          onClick={() => signIn("passkey", { action: "register" })}
          className="border border-dark-theme-very-dark-blue dark:border-neutral-white ring-2 ring-neutral-white dark:ring-dark-theme-very-dark-blue rounded-3xl h-10 w-44 dark:bg-dark-theme-very-dark-blue bg-neutral-white text-dark-theme-very-dark-blue dark:text-neutral-white"
        >
          Register new Passkey
        </button>
      ) : status === "unauthenticated" ? (
        <button
          onClick={() => signIn("passkey")}
          className="border border-dark-theme-very-dark-blue dark:border-neutral-white ring-2 ring-neutral-white dark:ring-dark-theme-very-dark-blue rounded-3xl h-10 w-44 dark:bg-dark-theme-very-dark-blue bg-neutral-white text-dark-theme-very-dark-blue dark:text-neutral-white"
        >
          Sign in with Passkey
        </button>
      ) : null}
    </div>
  );
}

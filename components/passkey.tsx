"use client";

// Code for the Passkey component

import { signIn } from "next-auth/webauthn";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import OrSpacer from "./ui/or-spacer";
import { checkPassKeyRegistration } from "@/server_actions/data";

export default function Passkey() {
  const { data: session, update, status } = useSession();
  const [error, setError] = useState("");
  const [passkey, setPasskey] = useState<boolean>();

  useEffect(() => {
    if (session?.user?.email) {
      console.log(session.user);
      checkPassKeyRegistration(session.user.email).then((result) => {
        setPasskey(result);
      });
    }
  }, [session]);

  const registerPasskey = async () => {
    try {
      const verify = await signIn("passkey", { action: "register" });
      console.log(verify);
    } catch (error: any) {
      console.error("Failed to register passkey", error);
      setError(error.message);
    }
  };

  const signInPasskey = async () => {
    try {
      await signIn("passkey");
    } catch (error: any) {
      console.error("Failed to sign in with passkey", error);
      setError(error.message);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      {status === "authenticated" && !passkey ? (
        <>
          <OrSpacer />
          <button
            onClick={registerPasskey}
            className="border border-dark-theme-very-dark-blue dark:border-neutral-white ring-2 ring-neutral-white dark:ring-dark-theme-very-dark-blue rounded-3xl h-10 w-44 dark:bg-dark-theme-very-dark-blue bg-neutral-white text-dark-theme-very-dark-blue dark:text-neutral-white"
          >
            Register new Passkey
          </button>
        </>
      ) : status === "unauthenticated" ? (
        <>
          <OrSpacer />
          <button
            onClick={signInPasskey}
            className="border border-dark-theme-very-dark-blue dark:border-neutral-white ring-2 ring-neutral-white dark:ring-dark-theme-very-dark-blue rounded-3xl h-10 w-44 dark:bg-dark-theme-very-dark-blue bg-neutral-white text-dark-theme-very-dark-blue dark:text-neutral-white"
          >
            Sign in with Passkey
          </button>
        </>
      ) : null}
      {error && <p className="text-center p-3">{error}</p>}
    </div>
  );
}

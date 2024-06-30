import { auth } from "@/auth";

import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

const LoginButton = async () => {
  const session = await auth();
  const user = session?.user;

  return (
    <div>
      {!user && (
        <Link href={"/login"}>
          <Button
            className="bg-gradient-to-tl from-primary-gradient-left to-primary-gradient-right text-neutral-white dark:bg-neutral-white dark:text-dark-theme-very-dark-blue text-lg"
            variant={"destructive"}
            size={"lg"}
          >
            Login
          </Button>
        </Link>
      )}
    </div>
  );
};

export default LoginButton;

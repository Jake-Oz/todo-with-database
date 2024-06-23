import SignOut from "@/components/sign-out";
import { auth } from "@/auth";

import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import Link from "next/link";

const Login = async () => {
  const session = await auth();
  const user = session?.user;

  return (
    <div>
      {!user ? (
        <Link href={"/login"}>
          <Button
            className="bg-primary-bright-blue text-neutral-white dark:bg-neutral-white dark:text-dark-theme-very-dark-blue text-lg"
            variant={"destructive"}
            size={"lg"}
          >
            Login
          </Button>
        </Link>
      ) : (
        <div className="flex flex-col justify-center items-center">
          {user.image && (
            <Image
              src={user.image}
              alt={user.name!}
              width={40}
              height={40}
              className="rounded-full"
            />
          )}
          <SignOut />
        </div>
      )}
    </div>
  );
};

export default Login;

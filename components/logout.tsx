import SignOutButton from "@/components/sign-out";
import { auth } from "@/auth";

import React from "react";

import Image from "next/image";

const Logout = async () => {
  const session = await auth();
  const user = session?.user;

  return (
    <div>
      {user && (
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
          <SignOutButton />
        </div>
      )}
    </div>
  );
};

export default Logout;

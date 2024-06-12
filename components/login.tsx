import SignIn from "@/components/sign-in";
import SignOut from "@/components/sign-out";
import { auth } from "@/auth";

import React from "react";

const Login = async () => {
  const session = await auth();
  const user = session?.user;

  return <div>{user ? <SignOut /> : <SignIn />}</div>;
};

export default Login;

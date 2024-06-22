import React from "react";
import { redirect } from "next/navigation";

const NotFound = () => {
  redirect("/api/auth/verify-request?provider=resend&type=email");
  return <div>NotFound</div>;
};

export default NotFound;

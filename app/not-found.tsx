"use client";
import React from "react";
import { redirect } from "next/navigation";
import { useSearchParams } from "next/navigation";

const NotFound = () => {
  // A hack in production to redirect to the correct page
  // when the user is using a magic link
  // This is not needed in development

  const searchParams = useSearchParams();
  console.log(searchParams);
  if (process.env.NODE_ENV === "production")
    redirect("/api/auth/verify-request?provider=resend&type=email");
  return <div>NotFound</div>;
};

export default NotFound;

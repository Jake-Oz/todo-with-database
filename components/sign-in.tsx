import { signIn } from "@/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SignIn() {
  return (
    <div className="flex flex-col justify-center items-start gap-4">
      <form
        action={async () => {
          "use server";
          await signIn("google");
        }}
      >
        <Button type="submit">Sign in with Google</Button>
      </form>
      <form
        action={async (formData) => {
          "use server";
          await signIn("resend", formData, { redirect: encodeURI("/") });
        }}
      >
        <Input type="text" name="email" placeholder="Email" />
        <Button type="submit">Sign in with Resend</Button>
      </form>
    </div>
  );
}

import { signOut } from "@/auth";
import { Button } from "@/components/ui/button";

export default function SignOutButton() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <Button type="submit" className=" text-neutral-white   text-lg">
        Sign Out
      </Button>
    </form>
  );
}

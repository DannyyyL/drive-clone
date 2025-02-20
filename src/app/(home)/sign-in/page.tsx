import { SignInButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Button } from "~/components/ui/button";

export default function HomePage() {
  return (
    <>
      <SignInButton forceRedirectUrl={"/drive"}/>
      <footer className="mt-16 text-sm text-neutral-500">
        © {new Date().getFullYear()} Dan Lichtin. All rights reserved.
      </footer>
    </>
  );
}
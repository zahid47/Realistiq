"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { RealistiqButton } from "./ui/button";

export default function Profile() {
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <>
      {user ? (
        <>
          Signed in as {user.name} <br />
          <RealistiqButton onClick={() => signOut()}>Logout</RealistiqButton>
        </>
      ) : (
        <RealistiqButton onClick={() => signIn("github")}>
          Login
        </RealistiqButton>
      )}
    </>
  );
}

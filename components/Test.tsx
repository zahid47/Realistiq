"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export default function Profile() {
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <>
      {user ? (
        <>
          Signed in as {user.name} <br />
          <button onClick={() => signOut()}>Logout</button>
        </>
      ) : (
        <button onClick={() => signIn("github")}>Login</button>
      )}
    </>
  );
}

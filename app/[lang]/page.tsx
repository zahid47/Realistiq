"use client";
import { useSession, signIn, signOut } from "next-auth/react";

export default async function Home() {
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <main>
      <h1>{JSON.stringify(user)}</h1>
      {user ? (
        <section>
          <div className="flex flex-row items-center justify-center gap-2">
            <button
              className="rounded-lg bg-amber-500 px-4 py-2 text-white hover:bg-amber-700"
              onClick={() => signOut()}
            >
              Logout
            </button>
          </div>
        </section>
      ) : (
        <section>
          <button
            className="rounded-lg bg-teal-500 px-4 py-2 text-white hover:bg-teal-700"
            onClick={() => signIn("github")}
          >
            Login with GitHub
          </button>
        </section>
      )}
    </main>
  );
}

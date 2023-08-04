"use client";

import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

interface Props {
  children: React.ReactNode;
  session?: Session;
}

const NextAuthProvider = ({ children, session }: Props) => (
  <SessionProvider session={session}>{children}</SessionProvider>
);

export default NextAuthProvider;

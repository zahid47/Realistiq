"use client";

import React from "react";

interface Props {
  children: React.ReactNode;
}

export default function ClientOnly({ children }: Props) {
  return <>{children}</>;
}

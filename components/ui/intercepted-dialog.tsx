"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

interface Props {
  children: React.ReactNode;
}

export default function InterceptedDialog({ children }: Props) {
  const router = useRouter();

  return (
    <Dialog
      defaultOpen
      onOpenChange={() => {
        router.back();
      }}
    >
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
}

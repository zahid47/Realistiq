"use client";

import { Modal, ScrollArea } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useRouter } from "next/navigation";

interface Props {
  children: React.ReactNode;
}

export default function InterceptedDialog({ children }: Props) {
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width: 50em)");

  return (
    <>
      <Modal
        opened
        onClose={() => {
          router.back();
        }}
        centered
        size="auto"
        fullScreen={isMobile}
        overlayProps={{
          className:
            "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm transition-all duration-100 data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=open]:fade-in",
        }}
        scrollAreaComponent={ScrollArea.Autosize}
        transitionProps={{ transition: "fade" }}
      >
        {children}
      </Modal>
    </>
  );
}

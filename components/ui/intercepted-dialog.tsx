"use client";

import { useRouter } from "next/navigation";
import { Modal, ScrollArea } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

interface Props {
  children: React.ReactNode;
  title?: string;
}

export default function InterceptedDialog({ children, title }: Props) {
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width: 50em)");

  return (
    <>
      <Modal
        title={title}
        opened
        onClose={() => router.back()}
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

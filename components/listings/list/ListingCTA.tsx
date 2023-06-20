"use client"

import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";

export default function ListingCTA() {
  const { toast } = useToast();

  return (
    <Button
      onClick={() => {
        toast({
          title: "Not Available Yet",
          variant: "destructive",
        });
      }}
    >
      Contact
    </Button>
  );
}

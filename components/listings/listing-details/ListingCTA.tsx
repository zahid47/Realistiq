import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

export default function ListingCTA() {
  return (
    <Button
      onClick={() => {
        toast({
          title: "Demo property",
          description: "You cannot rent a demo property.",
        });
      }}
      className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-primary px-8 py-3 text-base font-medium text-white hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
    >
      Rent this house
    </Button>
  );
}

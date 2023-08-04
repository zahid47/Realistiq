import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface Props {
  isAgency: boolean;
}

export default function PlanBadge({ isAgency }: Props) {
  return (
    <Badge
      className={cn(
        isAgency && "bg-amber-100 text-amber-600 hover:bg-amber-200"
      )}
      variant="secondary"
    >
      {isAgency ? "Agency" : "Personal"}
    </Badge>
  );
}

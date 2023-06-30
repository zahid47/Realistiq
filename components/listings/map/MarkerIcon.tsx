import { Icons } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";

interface Props {
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  isHovering: boolean;
  isSaved: boolean;
}

export default function MarkerIcon({
  onClick,
  onMouseEnter,
  onMouseLeave,
  isHovering,
  isSaved,
}: Props) {
  return (
    <div
      className={cn("cursor-pointer", isHovering && "animate-pulse")}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {isSaved ? (
        <Icons.BookMark
          color="#fff"
          fill={isHovering ? "#fbbf24" : "#6d28d9"}
          size={isHovering ? 24 : 20}
          strokeWidth={3}
        />
      ) : (
        <Icons.Circle
          color="#fff"
          fill={isHovering ? "#fbbf24" : "#6d28d9"}
          size={isHovering ? 20 : 16}
          strokeWidth={3}
        />
      )}
    </div>
  );
}

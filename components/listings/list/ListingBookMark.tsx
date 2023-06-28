import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import bookmarkIconAnimationData from "@/assets/lottie/bookmark.json";

interface Props {
  listingId: number;
}

export default function ListingBookMark({ listingId }: Props) {
  const bookmarkRef = useRef<LottieRefCurrentProps>(null);
  const [bookmarked, setBookmarked] = useState(false);

  const { status } = useSession();
  const router = useRouter();

  const handleBookMark = () => {
    if (status !== "authenticated") return router.push("/signin");

    if (!bookmarked) bookmarkRef.current?.play();
    else bookmarkRef.current?.goToAndStop(0);
    setBookmarked((prev) => !prev);
  };

  return (
    <Lottie
      title="Save for later"
      animationData={bookmarkIconAnimationData}
      className="absolute right-2 top-2 w-[2.5rem] cursor-pointer"
      autoplay={false}
      onClick={handleBookMark}
      lottieRef={bookmarkRef}
      loop={false}
    />
  );
}

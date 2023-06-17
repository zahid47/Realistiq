"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import { useToast } from "@/components/ui/use-toast";
import Image from "next/image";

export default function ListingCard({ listing }: any) {
  const { toast } = useToast();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{listing.title}</CardTitle>
        <CardDescription>{listing.ListingInfo.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Image
          className="rounded-lg"
          src={listing.ListingPhotos[0].url}
          alt={listing.ListingPhotos[0].alt}
          height={300}
          width={300}
          placeholder="blur"
          blurDataURL={
            "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=="
          }
        />
      </CardContent>
      <CardFooter>
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
      </CardFooter>
    </Card>
  );
}

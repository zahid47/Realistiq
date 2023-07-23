"use client";

/*
TODO:
1. Separate form into multiple components
2. Fix each component
3. Add steps
4. Sticky action buttons
5. Add preview
*/
import dynamic from "next/dynamic";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { createListingSchema } from "@/lib/validators/listing";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import BedsBathsFloorAreaInput from "./BedsBathsFloorAreaInput";
import DescriptionInput from "./DescriptionInput";
import ImageInput from "./ImageInput";
import PriceInput from "./PriceInput";

const LocationInput = dynamic(() => import("./LocationInput"), {
  ssr: false,
  loading: () => <p>Loading map...</p>,
});

export default function CreateListingForm() {
  const form = useForm<z.infer<typeof createListingSchema>>({
    resolver: zodResolver(createListingSchema),
    defaultValues: {
      beds: 1,
      baths: 1,
      interval: "MONTH",
    },
  });

  const onSubmit = (values: z.infer<typeof createListingSchema>) => {
    console.log(values);
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6 px-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <LocationInput form={form} />

          <BedsBathsFloorAreaInput form={form} />

          <DescriptionInput form={form} />

          <ImageInput form={form} />

          <PriceInput form={form} />

          <div className="fixed bottom-0 left-0 right-0 flex items-center justify-center bg-muted p-4">
            <Button type="submit">Preview</Button>
          </div>
        </form>
      </Form>
      <pre>{JSON.stringify(form.watch(), null, 2)}</pre>
      <pre className="text-destructive">
        {JSON.stringify(form.formState.errors, null, 2)}
      </pre>
    </div>
  );
}

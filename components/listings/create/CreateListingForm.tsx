"use client";

/*
TODO:
1. Separate form into multiple components
2. Fix each component
3. Add steps
4. Sticky action buttons
5. Add preview
*/
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { createListingSchema } from "@/lib/validators/listing";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import BedsBathsFloorAreaInput from "./BedsBathsFloorAreaInput";
import DescriptionInput from "./DescriptionInput";
import ImageInput from "./ImageInput";
import PriceInput from "./PriceInput";

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
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input placeholder="123 main st." {...field} />
                </FormControl>
                <FormDescription>
                  Once published, you will not be able to modify the address.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <BedsBathsFloorAreaInput form={form} />

          <DescriptionInput form={form} />

          <ImageInput form={form} />

          <PriceInput form={form} />

          <Button type="submit">Preview</Button>
        </form>
      </Form>
      <pre>{JSON.stringify(form.watch(), null, 2)}</pre>
      <pre className="text-destructive">
        {JSON.stringify(form.formState.errors, null, 2)}
      </pre>
    </>
  );
}

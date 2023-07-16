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
import { Textarea } from "@/components/ui/textarea";
import BedsBathsFloorAreaInput from "./BedsBathsFloorAreaInput";
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

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us a little bit about your property..."
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Add as much detail as you can to help potential buyers.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="photos"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Photos</FormLabel>
                <FormControl>
                  <Input type="file" multiple placeholder="123" {...field} />
                </FormControl>
                <FormDescription>
                  Max 20 photos, each less than 5mb.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

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

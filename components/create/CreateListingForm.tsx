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

export default function CreateListingForm() {
  const form = useForm<z.infer<typeof createListingSchema>>({
    resolver: zodResolver(createListingSchema),
    defaultValues: {},
  });

  const onSubmit = (values: z.infer<typeof createListingSchema>) => {
    console.log(values);
  };

  return (
    <>
      <pre>{JSON.stringify(form.watch(), null, 2)}</pre>
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

          <FormField
            control={form.control}
            name="beds"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Beds</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="3" {...field} />
                </FormControl>
                <FormDescription>
                  How many bedrooms does your property have?
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="baths"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Baths</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="2" {...field} />
                </FormControl>
                <FormDescription>
                  How many bathrooms does your property have?
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="floor_area"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Floor Area (SqFt)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="123" {...field} />
                </FormControl>
                <FormDescription>
                  How many square feet is your property?
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

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

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rent per month (USD)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="123" {...field} />
                </FormControl>
                <FormDescription>
                  How much do you want to rent your property for?
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Preview</Button>
        </form>
      </Form>
    </>
  );
}

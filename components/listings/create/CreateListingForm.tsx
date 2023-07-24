"use client";

/*
TODO:
1. Add preview before creating
*/
import { useState } from "react";
import dynamic from "next/dynamic";
import { useParams, useRouter } from "next/navigation";
import { createListing } from "@/actions/api-calls/listing";
import { zodResolver } from "@hookform/resolvers/zod";
import { Stepper } from "@mantine/core";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "@/lib/hooks/use-toast";
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
  const [active, setActive] = useState(0);
  const [uploading, setUploading] = useState(false);

  const nextStep = () =>
    setActive((current) => (current < 4 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  const router = useRouter();
  const { lang } = useParams();

  const form = useForm<z.infer<typeof createListingSchema>>({
    resolver: zodResolver(createListingSchema),
    mode: "all",
    defaultValues: {
      beds: 1,
      baths: 1,
      interval: "MONTH",
    },
  });

  const mutation = useMutation({
    mutationFn: (values: z.infer<typeof createListingSchema>) => {
      return createListing(values);
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Error",
        description: `Could not create the listing. Please try again later.`,
      });
    },
    onSuccess: () => {
      router.push(`/${lang}/listings`);
    },
  });

  const steps = [
    ["address", "latitude", "longitude"],
    ["beds", "baths", "floor_area"],
    ["description"],
    ["photos"],
    ["amount", "interval"],
  ] as const;

  return (
    <div>
      <div className="mx-auto max-w-2xl space-y-6 px-4 pt-12">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((values) => mutation.mutate(values))}
            className="space-y-8"
          >
            <>
              <Stepper
                color="violet"
                active={active}
                onStepClick={setActive}
                breakpoint="sm"
                allowNextStepsSelect={false}
              >
                <Stepper.Step>
                  <LocationInput form={form} />
                </Stepper.Step>

                <Stepper.Step>
                  <BedsBathsFloorAreaInput form={form} />
                </Stepper.Step>

                <Stepper.Step>
                  <DescriptionInput form={form} />
                </Stepper.Step>

                <Stepper.Step loading={uploading}>
                  <ImageInput
                    form={form}
                    uploading={uploading}
                    setUploading={setUploading}
                  />
                </Stepper.Step>

                <Stepper.Step>
                  <PriceInput form={form} />
                </Stepper.Step>
              </Stepper>

              <div className="fixed bottom-0 left-0 right-0 flex items-center justify-center gap-4 border-t-2 bg-white p-4">
                <Button variant="outline" type="button" onClick={prevStep}>
                  Back
                </Button>
                <Button
                  isLoading={mutation.isLoading || uploading}
                  disabled={mutation.isLoading || uploading}
                  type={active === steps.length - 1 ? "submit" : "button"}
                  onClick={() => {
                    form.trigger(steps[active]).then(async (isValid) => {
                      isValid && nextStep();
                    });
                  }}
                >
                  {active === steps.length - 1 ? "Submit" : "Next"}
                </Button>
              </div>
            </>
          </form>
        </Form>
      </div>
    </div>
  );
}

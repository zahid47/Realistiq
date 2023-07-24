"use client";

/*
TODO:
1. Separate form into multiple components
2. Fix each component
3. Add steps
4. Sticky action buttons
5. Add preview
*/
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { createListingSchema } from "@/lib/validators/listing";
import { zodResolver } from "@hookform/resolvers/zod";
import { Stepper } from "@mantine/core";
import dynamic from "next/dynamic";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
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
  const nextStep = () =>
    setActive((current) => (current < 4 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  const form = useForm<z.infer<typeof createListingSchema>>({
    resolver: zodResolver(createListingSchema),
    mode: "all",
    defaultValues: {
      beds: 1,
      baths: 1,
      interval: "MONTH",
    },
  });

  const onSubmit = (values: z.infer<typeof createListingSchema>) => {
    console.log(values);
  };

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
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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

                <Stepper.Step>
                  <ImageInput form={form} />
                </Stepper.Step>

                <Stepper.Step>
                  <PriceInput form={form} />
                </Stepper.Step>
              </Stepper>

              <div className="fixed bottom-0 left-0 right-0 flex items-center justify-center gap-4 border-t-2 p-4 bg-white">
                <Button variant="outline" type="button" onClick={prevStep}>
                  Back
                </Button>
                <Button
                  type={active === steps.length - 1 ? "submit" : "button"}
                  onClick={() => {
                    form.trigger(steps[active]).then((isValid) => {
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

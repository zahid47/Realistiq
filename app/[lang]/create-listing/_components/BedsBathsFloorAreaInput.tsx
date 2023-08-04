import { UseFormReturn } from "react-hook-form";
import { CreateListingSchema } from "@/lib/validators/listing";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Icons } from "@/components/ui/Icons";
import { Input } from "@/components/ui/input";

const CounterIcon = ({
  type,
  disabled,
  onClick,
}: {
  type: "PLUS" | "MINUS";
  disabled?: boolean;
  onClick: () => void;
}) => (
  <Button
    type="button"
    className="rounded-full"
    size="icon"
    variant="outline"
    disabled={disabled}
    onClick={onClick}
  >
    {type === "PLUS" ? <Icons.Plus size={16} /> : <Icons.Minus size={16} />}
  </Button>
);

type Props = {
  form: UseFormReturn<CreateListingSchema, any, undefined>;
};

export default function BedsBathsFloorAreaInput({ form }: Props) {
  return (
    <div className="mt-12 space-y-8">
      <FormField
        control={form.control}
        name="beds"
        render={({ field }) => (
          <FormItem className="flex items-center justify-between">
            <div>
              <FormLabel>Beds</FormLabel>
              <FormDescription>
                How many bedrooms does your property have?
              </FormDescription>
            </div>
            <div className="flex items-center gap-4">
              <CounterIcon
                type="MINUS"
                onClick={() => {
                  form.setValue("beds", field.value - 1);
                }}
                disabled={field.value === 1}
              />
              <span className="w-4 text-center">{field.value}</span>
              <CounterIcon
                type="PLUS"
                onClick={() => {
                  form.setValue("beds", field.value + 1);
                }}
              />
            </div>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="baths"
        render={({ field }) => (
          <FormItem className="flex items-center justify-between">
            <div>
              <FormLabel>Baths</FormLabel>

              <FormDescription>
                How many bathrooms does your property have?
              </FormDescription>
            </div>
            <div className="flex items-center gap-4">
              <CounterIcon
                type="MINUS"
                onClick={() => {
                  form.setValue("baths", field.value - 1);
                }}
                disabled={field.value === 1}
              />
              <span className="w-4 text-center">{field.value}</span>
              <CounterIcon
                type="PLUS"
                onClick={() => {
                  form.setValue("baths", field.value + 1);
                }}
              />
            </div>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="floor_area"
        render={({ field }) => (
          <FormItem className="flex items-center justify-between">
            <div>
              <FormLabel>Floor Area (SqFt)</FormLabel>
              {form.formState.errors.floor_area ? (
                <FormMessage />
              ) : (
                <FormDescription>
                  How many square feet is your property?
                </FormDescription>
              )}
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center space-x-2">
                <FormControl>
                  <Input
                    className="w-[112px]"
                    type="number"
                    placeholder="1234"
                    {...field}
                  />
                </FormControl>
              </div>
            </div>
          </FormItem>
        )}
      />
    </div>
  );
}

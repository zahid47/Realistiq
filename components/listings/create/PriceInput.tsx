import Link from "next/link";
import { UseFormReturn } from "react-hook-form";
import { CreateListingSchema } from "@/lib/validators/listing";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  form: UseFormReturn<CreateListingSchema, any, undefined>;
};

export default function PriceInput({ form }: Props) {
  return (
    <div>
      <FormField
        control={form.control}
        name="amount"
        render={({ field }) => (
          <FormItem className="flex items-center justify-between">
            <div>
              <FormLabel>Rent (USD)</FormLabel>
              {form.formState.errors.amount ? (
                <FormMessage />
              ) : (
                <FormDescription>
                  <Link
                    href="https://www.rentometer.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="decoration-primary decoration-2 underline-offset-4 hover:text-gray-600 hover:underline">
                      How much should I charge?
                    </span>
                  </Link>
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

                <span>/</span>

                <FormField
                  control={form.control}
                  name="interval"
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-24">
                            <SelectValue placeholder="Interval" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="MONTH">Month</SelectItem>
                          <SelectItem value="WEEK">Week</SelectItem>
                          <SelectItem value="DAY">Day</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </FormItem>
        )}
      />
    </div>
  );
}

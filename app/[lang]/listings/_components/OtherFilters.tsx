import { usePathname, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { RangeSlider } from "@mantine/core";
import { useForm } from "react-hook-form";
import { getSearchParamsString, pluralized } from "@/lib/utils";
import {
  GetListingsPayload,
  getListingsPayload,
} from "@/lib/validators/listing";
import { Button, buttonVariants } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Icons } from "@/components/ui/Icons";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface Props {
  searchParams: GetListingsPayload;
}

export default function OtherFilters({ searchParams }: Props) {
  const {
    min_beds,
    max_beds,
    min_baths,
    max_baths,
    min_floor_area,
    max_floor_area,
    max_rent,
  } = searchParams;
  const router = useRouter();
  const pathname = usePathname();

  const form = useForm<
    Pick<
      GetListingsPayload,
      | "min_beds"
      | "max_beds"
      | "min_baths"
      | "max_baths"
      | "min_floor_area"
      | "max_floor_area"
      | "max_rent"
    >
  >({
    resolver: zodResolver(
      getListingsPayload.pick({
        min_beds: true,
        max_beds: true,
        min_baths: true,
        max_baths: true,
        min_floor_area: true,
        max_floor_area: true,
        max_rent: true,
      })
    ),
    defaultValues: {
      min_beds: min_beds || 1,
      max_beds: max_beds || 10,
      min_baths: min_baths || 1,
      max_baths: max_baths || 5,
      min_floor_area: min_floor_area || 20,
      max_floor_area: max_floor_area || 200,
      max_rent,
    },
  });

  const getFilteredURL = () => {
    const values = form.getValues();
    const newSearchParams = {
      ...searchParams,
      ...values,
      page: 1, // reset page
    };
    const qs = getSearchParamsString(newSearchParams);
    return `${pathname}?${qs}`;
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <Icons.Filter className="h-4 w-4" />
          <span className="ml-2 hidden 2xl:block">Filters</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Form {...form}>
          <form>
            <div className="space-y-4">
              <div>
                <FormLabel>Beds</FormLabel>
                <RangeSlider
                  color="violet"
                  step={1}
                  min={1}
                  max={10}
                  minRange={0}
                  label={(value) => `${value} bed${pluralized(value)}`}
                  defaultValue={[
                    form.getValues("min_beds") || 1,
                    form.getValues("max_beds") || 10,
                  ]}
                  onChangeEnd={(value) => {
                    form.setValue("min_beds", value[0]);
                    form.setValue("max_beds", value[1]);
                  }}
                  marks={[
                    { value: 1 },
                    { value: 2 },
                    { value: 3 },
                    { value: 4 },
                    { value: 5 },
                    { value: 6 },
                    { value: 7 },
                    { value: 8 },
                    { value: 9 },
                    { value: 10 },
                  ]}
                />
              </div>

              <div>
                <FormLabel>Baths</FormLabel>
                <RangeSlider
                  color="violet"
                  step={1}
                  min={1}
                  max={5}
                  minRange={0}
                  label={(value) => `${value} bath${pluralized(value)}`}
                  defaultValue={[
                    form.getValues("min_baths") || 1,
                    form.getValues("max_baths") || 5,
                  ]}
                  onChangeEnd={(value) => {
                    form.setValue("min_baths", value[0]);
                    form.setValue("max_baths", value[1]);
                  }}
                  marks={[
                    { value: 1 },
                    { value: 2 },
                    { value: 3 },
                    { value: 4 },
                    { value: 5 },
                  ]}
                />
              </div>

              <div>
                <FormLabel>Floor Area</FormLabel>
                <RangeSlider
                  color="violet"
                  step={10}
                  min={20}
                  max={200}
                  minRange={0}
                  label={(value) => `${value} SqFt`}
                  defaultValue={[
                    form.getValues("min_floor_area") || 20,
                    form.getValues("max_floor_area") || 200,
                  ]}
                  onChangeEnd={(value) => {
                    form.setValue("min_floor_area", value[0]);
                    form.setValue("max_floor_area", value[1]);
                  }}
                  marks={[
                    { value: 20 },
                    { value: 40 },
                    { value: 60 },
                    { value: 80 },
                    { value: 100 },
                    { value: 120 },
                    { value: 140 },
                    { value: 160 },
                    { value: 180 },
                    { value: 200 },
                  ]}
                />
              </div>

              <div>
                <FormLabel>Max Rent</FormLabel>
                <FormField
                  control={form.control}
                  name="max_rent"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between">
                      <Input {...field} type="number" placeholder="$1234" />
                    </FormItem>
                  )}
                />
              </div>

              <a className={buttonVariants()} href={getFilteredURL()}>
                See results
              </a>
            </div>
          </form>
        </Form>
      </PopoverContent>
    </Popover>
  );
}

/* eslint-disable @next/next/no-img-element */
import { useRef } from "react";
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { ControllerRenderProps, UseFormReturn } from "react-hook-form";
import { toast } from "@/lib/hooks/use-toast";
import { cn } from "@/lib/utils";
import { CreateListingSchema } from "@/lib/validators/listing";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Icons } from "@/components/ui/Icons";

type Field = ControllerRenderProps<{ photos: { src: string }[] }, "photos">;
type Props = { form: UseFormReturn<CreateListingSchema, any, undefined> };

const handlePhotoAdd = (field: Field, photos: FileWithPath[]) => {
  if (photos.length + (field.value || []).length > 20) {
    toast({
      variant: "destructive",
      title: "Woaah! We have a photographer here!",
      description:
        "You can upload a maximum of 20 photos. Please remove some photos to add more.",
    });
  }

  const serializedPhotos = photos.map((photo) => {
    return {
      src: URL.createObjectURL(photo),
    };
  });

  field.onChange((field.value || []).concat(serializedPhotos).slice(0, 20));
};

export default function ImageInput({ form }: Props) {
  const photosWatcher = form.watch("photos");
  const openRef = useRef<() => void>(null);

  return (
    <>
      <FormField
        control={form.control}
        name="photos"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Photos</FormLabel>
            <FormDescription>
              Max 20 photos, each less than 5MB. The first photo will be used as
              a thumbnail.
            </FormDescription>
            <FormControl>
              <Dropzone
                openRef={openRef}
                className={cn("text-center", photosWatcher?.length && "hidden")}
                accept={IMAGE_MIME_TYPE}
                maxSize={5 * 1024 * 1024}
                onDrop={(photos: FileWithPath[]) => {
                  handlePhotoAdd(field, photos);
                }}
                onReject={() => {
                  toast({
                    variant: "destructive",
                    title: "Could not upload some photos",
                    description:
                      "Please make sure to upload only photos less than 5MB in size.",
                  });
                }}
              >
                Drag images here or click to select files
              </Dropzone>
            </FormControl>
            {/* PREVIEW */}
            {!!photosWatcher?.length && (
              <>
                <div className="grid grid-cols-4 gap-4">
                  {photosWatcher.map((image: any, index: number) => (
                    <div
                      key={index}
                      className="w-42 group relative h-24 overflow-hidden rounded-lg"
                    >
                      <img
                        src={image.src}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 hidden h-full w-full items-center justify-center transition duration-0 ease-in-out hover:backdrop-blur-xl group-hover:flex">
                        <button
                          type="button"
                          onClick={() => {
                            const newImages = [...photosWatcher];
                            newImages.splice(index, 1);
                            field.onChange(newImages);
                          }}
                          className="rounded-md bg-destructive p-2 text-white shadow-md hover:shadow-lg"
                        >
                          <Icons.Trash size={20} />
                        </button>
                      </div>
                    </div>
                  ))}
                  {photosWatcher.length < 20 && (
                    <div
                      onClick={() => {
                        openRef.current && openRef.current();
                      }}
                      className="w-42 relative h-24 cursor-pointer overflow-hidden rounded-lg border-2 border-dashed hover:bg-muted"
                    >
                      <p className="flex h-full w-full items-center justify-center text-center text-3xl font-bold text-gray-400">
                        <Icons.Plus size={32} />
                      </p>
                    </div>
                  )}
                </div>
              </>
            )}
            {/* PREVIEW */}
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}

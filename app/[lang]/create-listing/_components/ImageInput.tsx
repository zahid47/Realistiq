/*
TODO:
1. rearrange images
2. add alt text or generate via ai
3. add image resizing, compression
4. add image watermarking
*/

import { Dispatch, SetStateAction, useRef, useState } from "react";
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { UseFormReturn } from "react-hook-form";
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

type Props = {
  form: UseFormReturn<CreateListingSchema, any, undefined>;
  uploading: boolean;
  setUploading: Dispatch<SetStateAction<boolean>>;
};

export default function ImageInput({ form, uploading, setUploading }: Props) {
  const photosWatcher = form.watch("photos");
  const openRef = useRef<() => void>(null);

  const uploadImagesAndGetUrls = async (images: FileWithPath[]) => {
    const cloudinaryUrl =
      "https://api.cloudinary.com/v1_1/pizza47/image/upload";

    setUploading(true);
    const res = await Promise.all(
      images.map((image) => {
        const body = new FormData();
        body.append("upload_preset", "dynamic-quiz");
        body.append("file", image);

        return fetch(cloudinaryUrl, {
          method: "POST",
          body,
        });
      })
    );

    const data = await Promise.all(
      res.map((r) => r.json().then((d) => d.secure_url))
    );
    setUploading(false);

    return data;
  };

  return (
    <div className="mt-12">
      <FormField
        control={form.control}
        name="photos"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Photos</FormLabel>
            <FormDescription>
              Max 20 photos, each less than 5MB. The first photo will be used as
              the thumbnail.
            </FormDescription>
            <FormControl>
              <div className="my-2">
                <Dropzone
                  disabled={uploading}
                  openRef={openRef}
                  className={cn(
                    "text-center",
                    photosWatcher?.length && "hidden"
                  )}
                  accept={IMAGE_MIME_TYPE}
                  maxSize={5 * 1024 * 1024}
                  onDrop={async (photos: FileWithPath[]) => {
                    const prevImages = form.getValues("photos") || [];

                    if (photos.length + prevImages.length > 20) {
                      toast({
                        variant: "destructive",
                        title: "Woaah! We have a photographer here!",
                        description:
                          "You can upload a maximum of 20 photos. We have picked the first 20 photos. Please remove some photos to add more.",
                      });
                    }

                    const newImages = photos.slice(0, 20 - prevImages.length);
                    const imgUrls = await uploadImagesAndGetUrls(newImages);

                    field.onChange([...prevImages, ...imgUrls]);
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
                  <span className="text-muted-foreground">
                    {uploading
                      ? "Uploading..."
                      : "Drag images here or click to select files"}
                  </span>
                </Dropzone>
              </div>
            </FormControl>
            {/* PREVIEW */}
            {!!photosWatcher?.length && (
              <>
                <div className="grid grid-cols-4 gap-4">
                  {photosWatcher.map((image: string, index: number) => (
                    <div
                      key={index}
                      className="w-42 group relative h-24 overflow-hidden rounded-lg"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={image}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 hidden h-full w-full items-center justify-center transition duration-0 ease-in-out hover:backdrop-blur-xl group-hover:flex">
                        <button
                          type="button"
                          onClick={() => {
                            //TODO: delete from cloudinary as well
                            // Also, delete the image if user doesnt submit the form
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
                        !uploading && openRef.current && openRef.current();
                      }}
                      className="w-42 relative h-24 cursor-pointer overflow-hidden rounded-lg border-2 border-dashed hover:bg-muted"
                    >
                      <p className="flex h-full w-full items-center justify-center text-center text-3xl font-bold text-gray-400">
                        {uploading ? (
                          <Icons.Loader className="animate-spin" size={32} />
                        ) : (
                          <Icons.Plus size={32} />
                        )}
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
    </div>
  );
}

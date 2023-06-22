import InterceptedDialog from "@/components/ui/intercepted-dialog";

interface Props {
  params: {
    slug: string;
  };
}

export default function page({ params }: Props) {
  return (
    <InterceptedDialog>
      <div>{params.slug}</div>
    </InterceptedDialog>
  );
}

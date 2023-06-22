interface Props {
  params: {
    slug: string;
  };
}

export default function page({ params }: Props) {
  return <div>{params.slug}</div>;
}

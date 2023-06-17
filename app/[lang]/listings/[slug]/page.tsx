interface Props {
  params: {
    slug: string;
  };
}

export default function page(props: Props) {
  return <div>{JSON.stringify(props.params.slug)}</div>;
}

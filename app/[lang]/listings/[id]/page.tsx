interface Props {
  params: {
    id: string;
  };
}

export default function page(props: Props) {
  return <div>{JSON.stringify(props.params.id)}</div>;
}

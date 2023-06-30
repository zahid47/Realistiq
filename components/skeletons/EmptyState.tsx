interface Props {
  title: string;
  description: string;
}

export default function EmptyState({ title, description }: Props) {
  return (
    <>
      <h1>{title}</h1>
      <h3>{description}</h3>
    </>
  );
}

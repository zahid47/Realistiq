interface Props {
  title: string;
  description: string;
}

export default function EmptyState({ title, description }: Props) {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1>{title}</h1>
      <h3>{description}</h3>
    </div>
  );
}

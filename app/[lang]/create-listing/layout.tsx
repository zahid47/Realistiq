interface Props {
  children: React.ReactNode;
}

export default function CreateListingLayout({ children }: Props) {
  return <div className="mx-auto mt-20 space-y-6 lg:max-w-2xl">{children}</div>;
}

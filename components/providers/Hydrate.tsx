import { Hydrate, HydrateProps } from "@tanstack/react-query";

export default function HydrateWrapper(props: HydrateProps) {
  return <Hydrate {...props} />;
}

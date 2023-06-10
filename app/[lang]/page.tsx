import { getLanguage } from "@/lib/get-lang";
import type { supportedLanguages } from "../../constants";

type HomeProps = {
  params: {
    lang: (typeof supportedLanguages)[number];
  };
};

export default async function Home({ params: { lang } }: HomeProps) {
  const locale = await getLanguage(lang);

  return (
    <main>
      <h1>{locale.hello}</h1>
    </main>
  );
}

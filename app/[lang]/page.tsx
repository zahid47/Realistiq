import Image from "next/image";
import heroImage from "@/public/hero.jpg";
import SearchBox from "@/components/home/SearchBox";

const Badge = () => {
  return (
    <div className="mb-2 flex justify-center">
      <div className="text-mute relative rounded-full px-3 py-1 text-sm leading-6 ring-1 ring-amber-400/10 hover:ring-amber-400/20">
        <span className="animate-text-shimmer bg-[linear-gradient(110deg,#fef3c7,45%,#fbbf24,55%,#f59e0b)] bg-[length:250%_100%] bg-clip-text text-transparent">
          Realistiq is open source &#8594;
        </span>
        <a
          href="https://github.com/zahid47/Realistiq"
          target="_blank"
          className="font-semibold text-primary"
        >
          <span className="absolute inset-0" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
};

const Text = () => {
  return (
    <div>
      <h1 className="text-4xl font-bold tracking-tight text-slate-50 sm:text-6xl">
        Stress free home renting
      </h1>
      <p className="mt-6 text-xl leading-8 text-slate-100">
        Find stress-free rental with Realistiq. Explore premium listings,
        connect with trusted landlords, and experience a hassle-free renting
        process.
      </p>
    </div>
  );
};

export default async function Home() {
  return (
    <section>
      <Image
        src={heroImage}
        alt="hero"
        className="absolute inset-0 h-screen object-cover"
        priority
      />
      <div className="absolute inset-0 flex h-screen w-screen flex-col items-center justify-center bg-black/70 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <Badge />
          <Text />
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <SearchBox />
          </div>
        </div>
      </div>
    </section>
  );
}

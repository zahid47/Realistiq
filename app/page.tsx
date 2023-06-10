"use client"

export default function Home() {
  return (
    <main>
      <button
        onClick={() => {
          throw new Error("Sentry Frontend Error");
        }}
      >
        Break the world
      </button>
    </main>
  );
}

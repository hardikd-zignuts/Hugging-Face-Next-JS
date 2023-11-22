"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  // Keep track of the classification result and the model loading status.
  const [result, setResult] = useState(null);
  const [ready, setReady] = useState<any>(null);
  const router = useRouter();

  const classify = async (text: string) => {
    if (!text) return;
    if (ready === null) setReady(false);

    // Make a request to the /classify route on the server.
    const result = await fetch(`/classify?text=${encodeURIComponent(text)}`);

    // If this is the first time we've made a request, set the ready flag.
    if (!ready) setReady(true);

    const json = await result.json();
    setResult(json);
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-12">
      <h1 className="text-5xl font-bold mb-2 text-center">Transformers.js</h1>
      <h2 className="text-2xl mb-4 text-center">
        Next.js template (server-side)
      </h2>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-3"
        onClick={() => router.push("/")}
      >
        {"<-"} Using Client Worker
      </button>
      <input
        type="text"
        className="w-full max-w-xs p-2 border border-gray-300 rounded mb-4"
        placeholder="Enter text here"
        onInput={(e: any) => {
          classify(e.target.value);
        }}
      />

      {ready !== null && (
        <pre className="bg-gray-100 p-2 rounded">
          {!ready || !result ? "Loading..." : JSON.stringify(result, null, 2)}
        </pre>
      )}
    </main>
  );
}

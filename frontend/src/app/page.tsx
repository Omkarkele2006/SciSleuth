export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6">
      <h1 className="text-5xl font-bold">SciSleuth</h1>

      <p className="text-xl text-gray-600">
        AI Misconception Detective
      </p>

      <button className="px-6 py-3 rounded-lg bg-black text-white">
        Start Diagnostic
      </button>
    </main>
  );
}
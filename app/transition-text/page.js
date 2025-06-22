export default function TransitionText() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white text-center p-8">
      <h1 className="text-3xl mb-4">You fought bravely 🕹️</h1>
      <p className="mb-6">Your journey continues... but not here.</p>
      <a href="/about" className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200 transition">Try Again</a>
    </div>
  );
}

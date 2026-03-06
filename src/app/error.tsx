"use client";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ reset }: ErrorProps) {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-400 mb-4">Error</h1>
        <p className="text-lg text-gray-600 mb-6">
          エラーが発生しました
        </p>
        <button
          onClick={reset}
          className="inline-block px-6 py-3 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 transition-colors"
        >
          もう一度試す
        </button>
      </div>
    </main>
  );
}

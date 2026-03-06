import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-300 mb-4">404</h1>
        <p className="text-lg text-gray-600 mb-6">
          ページが見つかりません
        </p>
        <Link
          href="/ja"
          className="inline-block px-6 py-3 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 transition-colors"
        >
          トップに戻る
        </Link>
      </div>
    </main>
  );
}

'use client';

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="bg-[#070b14] text-slate-200 min-h-screen flex items-center justify-center p-6">
        <div className="text-center max-w-md">
          <h2 className="text-xl font-bold mb-2">Application Error</h2>
          <p className="text-sm text-slate-400 mb-4">An unexpected error occurred.</p>
          <button
            type="button"
            onClick={() => reset()}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-medium transition-colors"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}

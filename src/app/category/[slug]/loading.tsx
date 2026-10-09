
export default function CategoryLoading() {
  return (
    <main className="mx-auto min-h-screen max-w-6xl animate-pulse px-4 py-10">
      <div className="h-4 w-28 rounded bg-gray-200" />

      <div className="mt-6 rounded-2xl bg-white p-8">
        <div className="h-10 w-56 rounded bg-gray-200" />
        <div className="mt-3 h-4 w-32 rounded bg-gray-200" />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="rounded-2xl bg-white p-5">
            <div className="h-24 rounded-xl bg-gray-200" />
            <div className="mt-4 h-5 w-2/3 rounded bg-gray-200" />
            <div className="mt-3 h-4 w-1/3 rounded bg-gray-200" />
            <div className="mt-5 h-7 w-1/2 rounded bg-gray-200" />
          </div>
        ))}
      </div>
    </main>
  );
}

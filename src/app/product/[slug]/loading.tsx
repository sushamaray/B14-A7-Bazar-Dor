
export default function ProductDetailsLoading() {
  return (
    <main className="mx-auto min-h-screen max-w-6xl animate-pulse px-4 py-10">
      <div className="h-4 w-32 rounded bg-gray-200" />

      <section className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="flex min-h-72 items-center justify-center rounded-3xl bg-white p-8">
          <div className="h-32 w-32 rounded-full bg-gray-200" />
        </div>

        <div className="rounded-3xl bg-white p-8">
          <div className="h-5 w-32 rounded bg-gray-200" />
          <div className="mt-4 h-10 w-48 rounded bg-gray-200" />

          <div className="mt-8 grid grid-cols-2 gap-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="rounded-xl bg-gray-100 p-5">
                <div className="h-4 w-24 rounded bg-gray-200" />
                <div className="mt-3 h-7 w-20 rounded bg-gray-200" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-3xl bg-white p-8">
        <div className="h-7 w-48 rounded bg-gray-200" />
        <div className="mt-6 h-48 rounded-xl bg-gray-100" />
      </section>
    </main>
  );
}

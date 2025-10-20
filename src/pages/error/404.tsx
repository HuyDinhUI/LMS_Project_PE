const ErrorNotFound = () => {
  return (
    <main className="grid min-h-full place-items-center bg-[url('/src/assets/top-view-circular-frame-with-supplies.jpg')] bg-cover px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-base font-semibold text-indigo-400">404</p>
        <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance sm:text-7xl">
          Page not found
        </h1>
        <p className="mt-6 text-lg font-medium text-blue-600 text-pretty sm:text-xl/8">
          Xin lỗi, trang hiện tại không tồn tại.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <div
            onClick={() => window.history.back()}
            className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          >
            Quay lại
          </div>
          <div  className="text-sm font-semibold">
            Liên hệ hỗ trợ <span aria-hidden="true">&rarr;</span>
          </div>
        </div>
      </div>
    </main>
  );
};
export default ErrorNotFound;

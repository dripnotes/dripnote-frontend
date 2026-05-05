export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-200 bg-gray-50 pt-12 pb-28 md:py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 sm:flex-row sm:px-6 lg:px-8">
        <div className="flex items-center space-x-2">
          <span className="text-xl font-bold tracking-tighter text-gray-900">Baristation</span>
        </div>
        <p className="text-center text-sm text-gray-500 sm:text-left">
          © {new Date().getFullYear()} Baristation. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

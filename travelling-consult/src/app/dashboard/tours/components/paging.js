export default function Pagination({ handleNext, handlePrevious, hasNextPage, hasPreviousPage, totalUsers }) {
  return (
    <nav
      aria-label="Pagination"
      className="flex items-center justify-between border-t border-gray-200 bg-white dark:bg-black px-4 py-3 sm:px-6"
    >
      <div className="flex flex-1 justify-between sm:justify-end">
        <button
          onClick={handlePrevious}
          disabled={!hasPreviousPage}
          className={`relative inline-flex items-center rounded-md bg-white dark:bg-black px-3 py-2 text-sm font-semibold text-gray-900 dark:text-gray-100 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0 ${!hasPreviousPage && 'opacity-50 cursor-not-allowed'}`}
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          disabled={!hasNextPage}
          className={`relative ml-3 inline-flex items-center rounded-md bg-white dark:bg-black px-3 py-2 text-sm font-semibold text-gray-900 dark:text-gray-100 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0 ${!hasNextPage && 'opacity-50 cursor-not-allowed'}`}
        >
          Next
        </button>
      </div>
    </nav>
  );
}

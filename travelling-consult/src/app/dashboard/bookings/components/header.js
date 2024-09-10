export default function Header() {
  return (
    <div className="md:flex md:items-center md:justify-between mx-4 pt-5">
      <div className="min-w-0 flex-1">
        <h2 className="text-2xl font-bold leading-7 text-gray-900 dark:text-gray-200 sm:truncate sm:text-3xl sm:tracking-tight">
          Bookings
        </h2>
      </div>
     {/*
     <button
          type="button"
          className="ml-3 inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          All Users
        </button>
      </div>
      */}
    </div>
  )
}

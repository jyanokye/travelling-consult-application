export default function Header() {
  return (
    <div className="md:flex md:items-center md:justify-between mx-4 pt-5">
      <div className="min-w-0 flex-1">
        <h2 className="text-2xl font-bold leading-7 text-gray-900 dark:text-gray-200 sm:truncate sm:text-3xl sm:tracking-tight">
          Users
        </h2>
      </div>
     {/* <div className="mt-4 flex md:ml-4 md:mt-0">
        <button
          type="button"
          className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          Admins
        </button>
        <button
          type="button"
          className="ml-3 inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          All Users
        </button>
      </div>*/}
    </div>
  )
}

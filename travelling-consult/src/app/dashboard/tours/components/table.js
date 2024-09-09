import { useEffect, useState } from "react";
import Pagination from "./paging";
import { getTours } from "../../../../../firebase/actions/tour-actions"; // Adjust path as needed

export default function Table() {
  const [tours, setTours] = useState([]);
  const [lastVisible, setLastVisible] = useState(null);
  const [paginationStack, setPaginationStack] = useState([]);

  const fetchTours = async (startAtDoc = null, direction = "forward") => {
    const { toursList, lastVisible: newLastVisible } = await getTours(startAtDoc, direction);
    console.log(toursList);

      setTours(toursList);
      setLastVisible(newLastVisible);

      if (direction === "forward") {
        setPaginationStack((prevStack) => [...prevStack, newLastVisible]);
      } else if (direction === "backward" && paginationStack.length > 0) {
        setPaginationStack((prevStack) => {
          const newStack = [...prevStack];
          newStack.pop();
          return newStack;
        });
      }

  };


  useEffect(() => {
    fetchTours();
  }, []);

  const handleNext = () => {
    if (lastVisible) {
      fetchTours(lastVisible, "forward");
    }
  };

  const handlePrevious = () => {
    if (paginationStack.length > 1) {
      fetchTours(paginationStack[paginationStack.length - 2], "backward");
    }
  };

  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <p className="mt-2 text-sm text-gray-700 dark:text-gray-100">
              A list of all the tours on your platform including their names, locations, and prices.
            </p>
          </div>
        </div>
        <div className="-mx-4 mt-8 sm:-mx-0">
          <table className="min-w-full divide-y divide-gray-300">
            <thead>
              <tr>
                <th
                  scope="col"
                  className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100 sm:pl-0"
                >
                  Customer
                </th>
                <th
                  scope="col"
                  className="hidden py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100 sm:pl-0 lg:table-cell"
                >
                  Tour Name
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100 sm:table-cell"
                >
                  Number Of People
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100 lg:table-cell"
                >
                  Total Price
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100 sm:table-cell"
                >
                  Payment Status
                </th>
                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white dark:bg-gray-900">
              {tours.map((tour) => (
                <tr key={tour.tourId}>
                  <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 dark:text-gray-100 sm:w-auto sm:max-w-none sm:pl-2">
                    {`${tour.tourName}`}
                    <dl className="font-normal lg:hidden">
                      <dt className="sr-only sm:hidden"></dt>
                      <dd className="mt-1 truncate text-gray-500 dark:text-gray-100 sm:hidden">
                        {tour.location}
                      </dd>
                    </dl>
                  </td>
                  <td className="hidden px-3 py-4 text-sm text-gray-500 dark:text-gray-100 lg:table-cell">
                    {tour.location}
                  </td>
                  <td className="px-3 py-4 text-sm text-gray-500 dark:text-gray-100">
                    {tour.dateOfDeparture.toDate().toDateString()}
                  </td>
                  <td className="px-3 py-4 text-sm text-gray-500 dark:text-gray-100">
                    {tour.dateofArrival.toDate().toDateString()}
                  </td>
                  <td className="px-3 py-4 text-sm text-gray-500 dark:text-gray-100">{tour.price}</td>
                  <td className="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                    <a href="#" className="text-indigo-600 hover:text-indigo-900 pr-0 sm:pr-2">
                      Edit<span className="sr-only">, {`${tour.tourName}`}</span>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Pagination
        handleNext={handleNext}
        handlePrevious={handlePrevious}
        hasNextPage={!!lastVisible}
        hasPreviousPage={paginationStack.length > 1}
      />
    </>
  );
}

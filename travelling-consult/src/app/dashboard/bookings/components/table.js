import { useEffect, useState } from "react";
import Pagination from "./paging";
import { getBookings, getUserByBooking, getTourByBooking } from "../../../../../firebase/actions/booking-actions"; // Adjust path as needed

export default function Table() {
  const [bookings, setBookings] = useState([]);
  const [lastVisible, setLastVisible] = useState(null);
  const [paginationStack, setPaginationStack] = useState([]);

  const fetchBookings = async (startAtDoc = null, direction = "forward") => {
    const { bookingsList, lastVisible: newLastVisible } = await getBookings(startAtDoc, direction);

    // Fetch bookerDetails and tourDetails asynchronously for each booking
    const newList = await Promise.all(
      bookingsList.map(async (booking) => {
        const [bookerDetails] = await getUserByBooking(booking.userId);
        const bookerName = `${bookerDetails.firstName} ${bookerDetails.lastName}`;
        const [tourDetails] = await getTourByBooking(booking.tourId);
        const tourName = tourDetails.tourName;
        return {
          ...booking,
          bookerName,
          tourName,
        };
      })
    );

    setBookings(newList);
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
    fetchBookings();
  }, []);

  const handleNext = () => {
    if (lastVisible) {
      fetchBookings(lastVisible, "forward");
    }
  };

  const handlePrevious = () => {
    if (paginationStack.length > 1) {
      fetchBookings(paginationStack[paginationStack.length - 2], "backward");
    }
  };

  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <p className="mt-2 text-sm text-gray-700 dark:text-gray-100">
              A list of all bookings on your platform.
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
                  Booker
                </th>
                <th
                  scope="col"
                  className="hidden py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100 sm:pl-0 lg:table-cell"
                >
                  Tour
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100 sm:table-cell"
                >
                  Number of People
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100 lg:table-cell"
                >
                  Price
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
              {bookings.map((booking) => (
                <tr key={booking.bookingId}>
                  <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 dark:text-gray-100 sm:w-auto sm:max-w-none sm:pl-2">
                    {`${booking.bookerName}`}
                    {/*<dl className="font-normal lg:hidden">
                      <dt className="sr-only sm:hidden"></dt>
                      <dd className="mt-1 truncate text-gray-500 dark:text-gray-100 sm:hidden">

                      </dd>
                    </dl>*/}
                  </td>
                  <td className="hidden px-3 py-4 text-sm text-gray-500 dark:text-gray-100 lg:table-cell">
                  {booking.tourName}
                  </td>
                  <td className="hidden px-3 py-4 text-sm text-gray-500 dark:text-gray-100 lg:table-cell">
                    {booking.numberOfPeople}
                  </td>
                  <td className="px-3 py-4 text-sm text-gray-500 dark:text-gray-100">
                    {booking.totalPrice}
                  </td>
                  <td className="px-3 py-4 text-sm text-gray-500 dark:text-gray-100">
                    {booking.paymentStatus}
                  </td>
                  <td className="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                    <a href="#" className="text-indigo-600 hover:text-indigo-900 pr-0 sm:pr-2">
                      Edit
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

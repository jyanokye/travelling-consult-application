import { useEffect, useState } from "react";
import Pagination from "./paging";
import { getUsers } from "../../../../../firebase/actions/user-actions"; // Adjust path as needed

export default function Table() {
  const [users, setUsers] = useState([]);
  const [lastVisible, setLastVisible] = useState(null);
  const [paginationStack, setPaginationStack] = useState([]); // Stack to manage previous pages
  const [currentPage, setCurrentPage] = useState(0); // Track the current page number
  const [totalUsers, setTotalUsers] = useState(0); // Track total number of users

  // Function to fetch users based on direction
  const fetchUsers = async (startAtDoc = null, direction = "forward") => {
    const { usersList, lastVisible: newLastVisible } = await getUsers(startAtDoc, direction);

    if (usersList) {
      setUsers(usersList);
      setLastVisible(newLastVisible);

      // Track total number of users (for pagination display)
      setTotalUsers(totalUsers + usersList.length);

      // For forward navigation: push the last visible to the stack
      if (direction === "forward") {
        setPaginationStack((prevStack) => [...prevStack, newLastVisible]);
        setCurrentPage((prevPage) => prevPage + 1); // Increment the page number
      }

      // For backward navigation: pop from the stack
      if (direction === "backward" && paginationStack.length > 0) {
        setPaginationStack((prevStack) => {
          const newStack = [...prevStack];
          newStack.pop(); // Remove the current page marker when moving backward
          return newStack;
        });
        setCurrentPage((prevPage) => prevPage - 1); // Decrement the page number
      }
    }
  };

  // Fetch the initial users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  // Pagination handling
  const handleNext = () => {
    if (lastVisible) {
      fetchUsers(lastVisible, "forward");
    }
  };

  const handlePrevious = () => {
    if (paginationStack.length > 1) {
      fetchUsers(paginationStack[paginationStack.length - 2], "backward"); // Go to the previous start point
    }
  };

  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <p className="mt-2 text-sm text-gray-700 dark:text-gray-100">
              A list of all the users on your platform including their name, email, and role.
            </p>
          </div>
        </div>
        <div className="-mx-4 mt-8 sm:-mx-0">
          <table className="min-w-full divide-y divide-gray-300">
            <thead>
              <tr>
                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100 sm:pl-0">
                  Name
                </th>
                <th scope="col" className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100 lg:table-cell">
                  Email
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100 sm:table-cell">
                  Role
                </th>
                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white dark:bg-gray-900">
              {users.map((person) => (
                <tr key={person.email}>
                  <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 dark:text-gray-100 sm:w-auto sm:max-w-none sm:pl-2">
                    {`${person.firstName} ${person.lastName}`}
                    <dl className="font-normal lg:hidden">
                      <dt className="sr-only sm:hidden">Email</dt>
                      <dd className="mt-1 truncate text-gray-500 dark:text-gray-100 sm:hidden">{person.email}</dd>
                    </dl>
                  </td>
                  <td className="hidden px-3 py-4 text-sm text-gray-500 dark:text-gray-100 sm:table-cell">{person.email}</td>
                  <td className="px-3 py-4 text-sm text-gray-500 dark:text-gray-100">{person.role}</td>
                  <td className="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                    <a href="#" className="text-indigo-600 hover:text-indigo-900 pr-0 sm:pr-2">
                      Edit<span className="sr-only">, {`${person.firstName} ${person.lastName}`}</span>
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
        currentPage={currentPage}
        totalUsers={totalUsers}
      />
    </>
  );
}

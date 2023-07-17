import React from "react";
import { Link } from "react-router-dom";

import { useGlobalContext } from "../../../context";
import Confirm from "../confirmation/Confirm";
import Loading from "../loading/Loading";
import NoData from "../no-data/NoData";

const ShowUsers = () => {
  const { users, loading, confirmDeletion, deleteItem } = useGlobalContext();

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      {confirmDeletion && <Confirm />}
      <div className="max-w-screen-xl mx-auto mt-[30px] px-4 md:px-8">
        <div className="items-start justify-between md:flex">
          <div className="max-w-lg">
            <h3 className="text-amber-700 text-xl font-bold sm:text-2xl">
              Users
            </h3>
          </div>
          <div className="mt-3 md:mt-0">
            <Link
              to="/add-user"
              className="inline-block px-4 py-2 text-white duration-150 font-medium bg-amber-600 rounded-lg hover:bg-amber-700 active:bg-amber-700 md:text-sm"
            >
              Add user
            </Link>
          </div>
        </div>
        {users.length < 1 && <NoData />}
        {users.length > 0 && (
          <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
            <table className="w-full table-auto text-sm text-left">
              <thead className="bg-gray-50 text-gray-600 font-medium border-b">
                <tr>
                  <th className="py-3 px-6">Username</th>
                  <th className="py-3 px-6">Phone Number</th>
                  <th className="py-3 px-6">Email</th>
                  <th className="py-3 px-6">Role</th>
                  <th className="py-3 px-6"></th>
                </tr>
              </thead>
              <tbody className="text-gray-600 divide-y">
                {users.map(
                  ({
                    _id,
                    first_name,
                    last_name,
                    email,
                    role,
                    avatar,
                    phone_number,
                  }) => (
                    <tr key={_id}>
                      <td className="flex items-center gap-x-3 py-3 px-6 whitespace-nowrap">
                        <img src={avatar} className="w-10 h-10 rounded-full" />
                        <div>
                          <span className="block text-gray-700 text-sm font-medium">
                            {first_name}
                          </span>
                          <span className="block text-gray-700 text-xs">
                            {last_name}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {phone_number}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">{email}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{role}</td>
                      <td className="text-right px-6 whitespace-nowrap">
                        <Link
                          to={`/edit-user/${_id}`}
                          className="py-2 px-3 font-medium text-indigo-600 hover:text-indigo-500 duration-150 hover:bg-gray-50 rounded-lg"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => deleteItem(_id, "user")}
                          className="py-2 leading-none px-3 font-medium text-red-600 hover:text-red-500 duration-150 hover:bg-gray-50 rounded-lg"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default ShowUsers;

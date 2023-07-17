import React, { useState } from "react";
import { Link } from "react-router-dom";

import Confirm from "../confirmation/Confirm";
import Loading from "../loading/Loading";
import NoData from "../no-data/NoData";
import { useGlobalContext } from "../../../context";

const ShowBrands = () => {
  const { brands, loading, confirmDeletion, deleteItem } = useGlobalContext();

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
              Brands
            </h3>
          </div>
          <div className="mt-3 md:mt-0">
            <Link
              to="/add-brand"
              className="inline-block px-4 py-2 text-white duration-150 font-medium bg-amber-600 rounded-lg hover:bg-amber-700 active:bg-amber-700 md:text-sm"
            >
              Add new brand
            </Link>
          </div>
        </div>
        {brands.length < 1 && <NoData />}
        {brands.length > 0 && (
          <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
            <table className="w-full table-auto text-sm text-left">
              <thead className="bg-gray-50 text-gray-600 font-medium border-b">
                <tr>
                  <th className="py-3 px-6">Brand Name</th>
                  <th className="py-3 px-6">Image</th>
                  <th className="py-3 px-6"></th>
                </tr>
              </thead>
              <tbody className="text-gray-600 divide-y">
                {brands.map(({ _id, brand_name, image }) => (
                  <tr key={_id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {brand_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {image?.url}
                    </td>
                    <td className="text-right px-6 whitespace-nowrap">
                      <Link
                        to={`/edit-brand/${_id}`}
                        className="py-2 px-3 font-medium text-indigo-600 hover:text-indigo-500 duration-150 hover:bg-gray-50 rounded-lg"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => deleteItem(_id, "brand")}
                        className="py-2 leading-none px-3 font-medium text-red-600 hover:text-red-500 duration-150 hover:bg-gray-50 rounded-lg"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default ShowBrands;

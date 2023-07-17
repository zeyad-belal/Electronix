import React from "react";

import { useGlobalContext } from "../../../context";

const Confirm = () => {
  const { cancelDeletion, toBeDeletedItem, module, deletionConfirm } =
    useGlobalContext();

  return (
    <>
      <div className="container flex justify-center absolute pl-[10%] top-[10%]">
        <div className="rounded-lg bg-white p-8 shadow-2xl">
          <h2 className="text-lg font-bold">
            {`Are you sure you want to delete this ${module}?`}
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Once deleted you can't undo, are you 100% sure it's OK?
          </p>

          <div className="mt-4 flex gap-2">
            <button
              onClick={() => deletionConfirm(toBeDeletedItem, module)}
              type="button"
              className="rounded bg-green-50 px-4 py-2 text-sm font-medium text-green-600"
            >
              Yes, I'm sure
            </button>

            <button
              onClick={() => cancelDeletion()}
              type="button"
              className="rounded bg-gray-50 px-4 py-2 text-sm font-medium text-gray-600"
            >
              No, cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Confirm;

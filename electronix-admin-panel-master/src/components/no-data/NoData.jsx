import React from "react";

import { HiOutlineExclamation } from "react-icons/hi";

const NoData = () => {
  return (
    <>
      <div className="container max-w-screen-xl mx-auto mt-[10%] px-4 md:px-8 flex flex-col justify-center items-center">
        <div className="iocn">
          <HiOutlineExclamation size={55} color="#b45309" />
        </div>
        <div className="msg text-amber-700 mt-[1rem] text-xl font-bold sm:text-2xl">
          No data to display, try adding some data!
        </div>
      </div>
    </>
  );
};

export default NoData;

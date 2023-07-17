import React from "react";

import { GiExitDoor } from "react-icons/gi";

import { useGlobalContext } from "../../../context";

const PopUp = () => {
  const { logout, loggedInUser } = useGlobalContext();

  return (
    <>
      <section className="flex flex-col justify-evenly px-[10px] py-1 absolute top-[5.1rem] right-[1rem] w-[200px] gap-3 bg-[#f5f5f5] rounded shadow-md shadow-indigo-500/40">
        <div className="info bg-[#fff] py-[15px] px-[5px] mt-[10px] rounded">
          <div className="text-[#b17a15] text-2xl font-bold rounded">
            {loggedInUser?.first_name + " " + loggedInUser?.last_name}
          </div>
          <div className="role text-[#7a7a7a]">
            {loggedInUser?.role || "super admin"}
          </div>
        </div>
        <div
          onClick={() => logout()}
          className="logout flex gap-[10px] cursor-pointer rounded py-[5px] px-[5px] hover:bg-[#fff]"
        >
          <GiExitDoor size={25} color="#b17a15" />
          <span className="font-bold text-[#666]">Logout</span>
        </div>
      </section>
    </>
  );
};

export default PopUp;

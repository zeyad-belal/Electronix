import React from "react";

const Card = ({ link, comp }) => {
  return (
    <div className="card-container w-[400px] shadow-md shadow-indigo-500/40 rounded-[10px] h-[200px] p-[2rem] mb-[3rem]">
      <div className="card-info flex justify-between">
        <div className="info">
          <div className="name text-[#835500]">All {link.text}</div>
          <div className="count text-[40px] font-bold text-[#835500]">
            {comp.length}
          </div>
        </div>
        <div className="icon">{<link.icon size={50} color="#b17a15" />}</div>
      </div>
      <div className="progress-bar h-[10px] rounded-[20px] w-[100%] bg-[#eee] mt-[2rem]">
        <div className="progress h-[10px] rounded-l-[20px] w-[25%] bg-[#b17a15]"></div>
      </div>
    </div>
  );
};

export default Card;

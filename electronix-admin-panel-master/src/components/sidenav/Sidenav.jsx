import React from "react";

import { Link } from "react-router-dom";

import { navLinks } from "./navData";

import { useGlobalContext } from "../../../context";

const SideNav = ({ isNavOpen }) => {
  const { loggedInUser } = useGlobalContext();

  return (
    <>
      <section
        className={`side-nav z-999 shadow-lg shadow-indigo-500/40 h-[100vh] fixed top-[0] left-[0] flex flex-col ${
          isNavOpen ? "w-[40%] md:w-[20%]" : "w-[12%] md:w-[6.2%]"
        }`}
      >
        <div className="flex justify-center items-center py-[1rem] h-[5rem]">
          <img
            className={isNavOpen ? "w-[80%] h-[80%]" : "w-[70%] h-[80%]"}
            src={isNavOpen ? "/assets/main-logo.png" : "/assets/icon.png"}
            alt=""
          />
        </div>
        <div className="splitter h-[1px] w-[100%] bg-[#eee]"></div>
        <div className="user-info flex flex-col justify-center items-center py-[35px]">
          <img
            className={`rounded-[50%] ${isNavOpen ? "w-[4rem]" : "w-[3rem]"}`}
            src={
              loggedInUser?.avatar ||
              "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?size=626&ext=jpg&ga=GA1.2.1326869177.1680443547&semt=sph"
            }
            alt={loggedInUser?.first_name || "name"}
          />
          {isNavOpen && (
            <div className="user-name pt-[15px] text-[#616161] font-bold">
              {loggedInUser?.first_name + " " + loggedInUser?.last_name ||
                "Eslam Sobhi"}
            </div>
          )}
        </div>
        <div className="splitter h-[1px] w-[100%] bg-[#eee]"></div>
        <article
          className={`nav flex flex-col pt-[35px] ${
            !isNavOpen ? "justify-center items-center" : ""
          }`}
        >
          {navLinks.map((link) => {
            return (
              <Link
                to={link.url}
                className="link flex mb-[40px] group"
                key={link.id}
              >
                <div
                  title={`${isNavOpen ? "" : link.text}`}
                  className={`icon flex justify-center items-center hover:cursor-pointer ${
                    isNavOpen ? "pl-[30px]" : ""
                  }`}
                >
                  {<link.icon size={25} color="#b17a15" />}
                </div>
                {isNavOpen && (
                  <div className="text font-semibold text-[#757070] pl-[10px] group-hover:text-[#b17a15] hover:cursor-pointer">
                    {link.text}
                  </div>
                )}
              </Link>
            );
          })}
        </article>
      </section>
    </>
  );
};

export default SideNav;

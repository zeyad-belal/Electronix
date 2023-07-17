import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <section className="max-w-screen-xl mx-auto mt-[10%] px-4 md:px-8 flex flex-col justify-center items-center">
      <article className="text-amber-700 mt-[1rem] text-xl font-bold sm:text-2xl">
        Not Found!
      </article>
      <span className="text-amber-700 mt-[1rem] text-xl font-bold sm:text-2xl">
        404
      </span>
      <Link
        to="/"
        className="inline-block px-4 py-2 mt-4 text-white duration-150 font-medium bg-amber-600 rounded-lg hover:bg-amber-700 active:bg-amber-700 md:text-sm"
      >
        Home
      </Link>
    </section>
  );
};

export default Error;

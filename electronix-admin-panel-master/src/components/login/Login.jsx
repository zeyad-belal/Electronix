import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

import { useGlobalContext } from "../../../context";

const Login = () => {
  const [invalidCredentials, setInvalidCredentials] = useState(false);
  const { login } = useGlobalContext();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    setInvalidCredentials(false);
    const { email, password } = data;
    try {
      const response = await axios.post(
        "http://localhost:8000/users/dashboard/login",
        { email, password }
      );
      login(response.data.user);
      localStorage.setItem("token", response.data.token);
      navigate("/");
      toast.success("Logged in successfully!");
    } catch (e) {
      setInvalidCredentials(true);
      console.log(e.response?.data.message);
    }
  };

  return (
    <>
      <section className="absolute w-full h-full flex justify-center items-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col md:flex-row gap-[30px] shadow-md shadow-indigo-500/40 bg-[#f5f5f5] md:pr-[30px] pb-[60px] md:pb-0 rounded"
        >
          <img
            src={`assets/login-${Math.floor(Math.random() * 3) + 1}.jpg`}
            alt=""
            className="w-[400px]"
          />
          <article className="flex flex-col justify-center items-center gap-[30px]">
            {invalidCredentials && (
              <p className="text-red-500" role="alert">
                Invalid Credentails!
              </p>
            )}
            <div className="form-group">
              <label
                htmlFor="email"
                className="block text-xs font-medium text-gray-700"
              >
                Email
              </label>

              <input
                {...register("email", {
                  required: true,
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid Email Address",
                  },
                })}
                aria-invalid={errors.email ? "true" : "false"}
                type="email"
                id="email"
                placeholder="john-doe@gmail.com"
                className="mt-1 rounded-md w-[18rem] md:w-[20rem] border-gray-200 shadow-sm sm:text-sm"
              />
            </div>
            {errors.email?.type === "required" && (
              <p className="text-red-500" role="alert">
                Email is required
              </p>
            )}
            {errors.email?.type === "pattern" && (
              <p className="text-red-500" role="alert">
                Email must be valid{" "}
              </p>
            )}
            <div className="form-group">
              <label
                htmlFor="password"
                className="block text-xs font-medium text-gray-700"
              >
                Password
              </label>

              <input
                {...register("password", {
                  required: true,
                })}
                aria-invalid={errors.password ? "true" : "false"}
                type="password"
                id="password"
                placeholder=""
                className="mt-1 rounded-md w-[18rem] md:w-[20rem] border-gray-200 shadow-sm sm:text-sm"
              />
            </div>
            {errors.password?.type === "required" && (
              <p className="text-red-500" role="alert">
                Password is required
              </p>
            )}
            <div className="mt-3 md:mt-0">
              <button className="inline-block px-4 py-2 text-white duration-150 font-medium bg-amber-600 rounded-lg hover:bg-amber-700 active:bg-amber-700 md:text-sm">
                Login
              </button>
            </div>
          </article>
        </form>
      </section>
    </>
  );
};

export default Login;

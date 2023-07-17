import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";

import { useGlobalContext } from "../../../context";

const UpdateUser = () => {
  // users stored in the global context (coming from db)
  const { users, updateUser } = useGlobalContext();

  // user being updated
  const { id } = useParams();
  const user = users.find((user) => user._id == id);

  // react hook from apis
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  // when submitting the form
  const onSubmit = async (data) => {
    const { first_name, last_name, role, email, phone_number } = data;
    const response = await axios.patch(
      `http://localhost:8000/users/dashboard/${id}`,
      {
        first_name,
        last_name,
        role,
        email,
        phone_number,
      },
      { headers: { Authorization: localStorage.getItem("token") } }
    );

    updateUser(response.data.updatedUser);

    toast.success("User updated successfully!");
  };

  useEffect(() => {
    setValue("first_name", user?.first_name);
    setValue("last_name", user?.last_name);
    setValue("email", user?.email);
    setValue("role", user?.role);
    setValue("phone_number", user?.phone_number);
  }, [users]);

  return (
    <section className="w-[100%] flex justify-center items-center mt-[30px]">
      <article className="w-[80%]">
        <div className="max-w-lg">
          <h3 className="text-amber-700 text-xl font-bold sm:text-2xl">
            Update user
          </h3>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="form-container mt-[50px] flex flex-col gap-[2rem] justify-center items-center"
        >
          <article className="inputs w-[100%] flex flex-wrap gap-[4rem] justify-between">
            <div className="form-group">
              <label
                htmlFor="firstName"
                className="block text-xs font-medium text-gray-700"
              >
                First Name
                <span className="text-[red] relative left-1 text-[16px]">
                  *
                </span>
              </label>

              <input
                {...register("first_name", {
                  required: true,
                  minLength: 3,
                  maxLength: 20,
                  pattern: { value: /^[^0-9].*$/i },
                })}
                aria-invalid={errors.first_name ? "true" : "false"}
                type="text"
                id="firstName"
                placeholder="John"
                className="mt-1 rounded-md w-full md:w-[25rem] border-gray-200 shadow-sm sm:text-sm"
              />
              {errors.first_name?.type === "required" && (
                <p className="text-red-500" role="alert">
                  First name is required
                </p>
              )}
              {errors.first_name?.type === "minLength" && (
                <p className="text-red-500" role="alert">
                  First name must be at least 3 chars
                </p>
              )}
              {errors.first_name?.type === "maxLength" && (
                <p className="text-red-500" role="alert">
                  First name must be less than 20 chars
                </p>
              )}
              {errors.first_name?.type === "pattern" && (
                <p className="text-red-500" role="alert">
                  Not valid product name
                </p>
              )}
            </div>
            <div className="form-group">
              <label
                htmlFor="lastName"
                className="block text-xs font-medium text-gray-700"
              >
                Last Name
                <span className="text-[red] relative left-1 text-[16px]">
                  *
                </span>
              </label>

              <input
                {...register("last_name", {
                  required: true,
                  minLength: 3,
                  maxLength: 20,
                  pattern: { value: /^[^0-9].*$/i },
                })}
                aria-invalid={errors.last_name ? "true" : "false"}
                type="text"
                id="lastName"
                placeholder="Doe"
                className="mt-1 rounded-md w-full md:w-[25rem] border-gray-200 shadow-sm sm:text-sm"
              />
              {errors.last_name?.type === "required" && (
                <p className="text-red-500" role="alert">
                  Last name is required
                </p>
              )}
              {errors.last_name?.type === "minLength" && (
                <p className="text-red-500" role="alert">
                  Last name must be at least 3 chars
                </p>
              )}
              {errors.last_name?.type === "maxLength" && (
                <p className="text-red-500" role="alert">
                  Last name must be less than 20 chars
                </p>
              )}
              {errors.last_name?.type === "pattern" && (
                <p className="text-red-500" role="alert">
                  Not valid user name
                </p>
              )}
            </div>
            <div className="form-group">
              <label
                htmlFor="email"
                className="block text-xs font-medium text-gray-700"
              >
                Email
                <span className="text-[red] relative left-1 text-[16px]">
                  *
                </span>
              </label>

              <input
                {...register("email", {
                  required: true,
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  },
                })}
                aria-invalid={errors.email ? "true" : "false"}
                type="email"
                id="email"
                placeholder="john-doe@gmail.com"
                className="mt-1 rounded-md w-full md:w-[25rem] border-gray-200 shadow-sm sm:text-sm"
              />
              {errors.email?.type === "required" && (
                <p className="text-red-500" role="alert">
                  Email is required
                </p>
              )}
              {errors.email?.type === "pattern" && (
                <p className="text-red-500" role="alert">
                  Not valid email
                </p>
              )}
            </div>
            <div className="form-group">
              <label
                htmlFor="phone"
                className="block text-xs font-medium text-gray-700"
              >
                Phone Number
                <span className="text-[red] relative left-1 text-[16px]">
                  *
                </span>
              </label>

              <input
                {...register("phone_number", {
                  required: true,
                  pattern: { value: /^\d{11}$/i },
                })}
                aria-invalid={errors.phone_number ? "true" : "false"}
                type="text"
                id="phone"
                placeholder="0101706613"
                className="mt-1 rounded-md w-full md:w-[25rem] border-gray-200 shadow-sm sm:text-sm"
              />
              {errors.phone_number?.type === "required" && (
                <p className="text-red-500" role="alert">
                  Phone number is required
                </p>
              )}
              {errors.phone_number?.type === "pattern" && (
                <p className="text-red-500" role="alert">
                  Not valid phone number
                </p>
              )}
            </div>
            <div className="form-group">
              <label
                htmlFor="role"
                className="block text-xs font-medium text-gray-700"
              >
                Role
                <span className="text-[red] relative left-1 text-[16px]">
                  *
                </span>
              </label>

              <select
                {...register("role", { required: true })}
                aria-invalid={errors.role ? "true" : "false"}
                defaultValue={user?.role}
                id="role"
                className="mt-1 w-full md:w-[25rem] rounded-md border-gray-200 text-gray-700 sm:text-sm"
              >
                <option value="">Please select</option>
                <option value="user">User</option>
                <option value="admin">Admin</option>
                <option value="superAdmin">Super admin</option>
              </select>
              {errors.role?.type === "required" && (
                <p className="text-red-500" role="alert">
                  Role is required
                </p>
              )}
            </div>
          </article>
          <div className="my-[30px]">
            <button className="inline-block px-4 py-2 text-white duration-150 font-medium bg-amber-600 rounded-lg hover:bg-amber-700 active:bg-amber-700 md:text-sm">
              Save User
            </button>
          </div>
        </form>
      </article>
    </section>
  );
};

export default UpdateUser;

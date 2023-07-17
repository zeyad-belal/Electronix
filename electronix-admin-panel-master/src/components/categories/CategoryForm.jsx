import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";

import { useGlobalContext } from "../../../context";

const CategoryForm = () => {
  const { createCategory } = useGlobalContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const { category_name, image, description } = data;

    const formData = new FormData();
    formData.append("category_name", category_name);
    if (image[0]) {
      formData.append("image", image[0]);
    }
    formData.append("description", description);

    const response = await axios.post(
      "http://localhost:8000/categories",
      formData
    );

    // console.log(response.data);
    createCategory(response.data.createdCategory);
    toast.success("Category added successfully!");
    reset();
  };

  return (
    <section className="w-[100%] flex justify-center items-center mt-[30px]">
      <article className="w-[80%]">
        <div className="max-w-lg">
          <h3 className="text-amber-700 text-xl font-bold sm:text-2xl">
            Add new category
          </h3>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="form-container mt-[50px] flex flex-col gap-[2rem] justify-center items-center"
        >
          <article className="inputs w-[100%] flex flex-wrap gap-[4rem]">
            <div className="form-group">
              <label
                htmlFor="catName"
                className="block text-xs font-medium text-gray-700"
              >
                Category Name
                <span className="text-[red] relative left-1 text-[16px]">
                  *
                </span>
              </label>

              <input
                {...register("category_name", {
                  required: true,
                })}
                aria-invalid={errors.category_name ? "true" : "false"}
                type="text"
                id="catName"
                placeholder="Laptops"
                className="mt-1 rounded-md w-full md:w-[25rem] border-gray-200 shadow-sm sm:text-sm"
              />
              {errors.category_name?.type === "required" && (
                <p className="text-red-500" role="alert">
                  Category name is required
                </p>
              )}
            </div>
            <div className="form-group">
              <label
                htmlFor="description"
                className="block text-xs font-medium text-gray-700"
              >
                Description
                <span className="text-[red] relative left-1 text-[16px]">
                  *
                </span>
              </label>

              <input
                {...register("description", {
                  required: true,
                  minLength: 15,
                })}
                aria-invalid={errors.description ? "true" : "false"}
                type="text"
                id="description"
                placeholder="description for laptops"
                className="mt-1 rounded-md w-full md:w-[25rem] border-gray-200 shadow-sm sm:text-sm"
              />
              {errors.description?.type === "required" && (
                <p className="text-red-500" role="alert">
                  Descriptoin is required
                </p>
              )}
              {errors.description?.type === "minLength" && (
                <p className="text-red-500" role="alert">
                  Description must be at least 15 chars
                </p>
              )}
            </div>
            <div className="form-group w-[90%] pl-[12px]">
              <label
                htmlFor="image"
                className="block text-xs font-medium text-gray-700"
              >
                Image
              </label>

              <input
                {...register("image")}
                type="file"
                id="image"
                className="mt-1 rounded-md w-full md:w-[25rem] border-gray-200 shadow-sm sm:text-sm"
              />
            </div>
          </article>
          <div className="mt-3 md:mt-0">
            <button className="inline-block px-4 py-2 text-white duration-150 font-medium bg-amber-600 rounded-lg hover:bg-amber-700 active:bg-amber-700 md:text-sm">
              Save category
            </button>
          </div>
        </form>
      </article>
    </section>
  );
};

export default CategoryForm;

import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";

import { useGlobalContext } from "../../../context";

const UpdateBrand = () => {
  const { brands, updateBrand } = useGlobalContext();
  const { id } = useParams();

  const brand = brands.find((br) => br._id == id);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const onSubmit = async (data) => {
    const { brand_name, image } = data;
    // console.log(data);

    const formData = new FormData();

    formData.append("brand_name", brand_name);
    if (image[0]) {
      formData.append("image", image[0]);
    }

    const response = await axios.patch(
      `http://localhost:8000/brands/${id}`,
      formData
    );

    updateBrand(response.data.updatedBrand);
    toast.success("Brand updated successfully!");
  };

  useEffect(() => {
    setValue("brand_name", brand?.brand_name);
  }, [brands]);

  return (
    <section className="w-[100%] flex justify-center items-center mt-[30px]">
      <article className="w-[80%]">
        <div className="max-w-lg">
          <h3 className="text-amber-700 text-xl font-bold sm:text-2xl">
            Update brand
          </h3>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="form-container mt-[50px] flex flex-col gap-[2rem] justify-center items-center"
        >
          <article className="inputs w-[100%] flex flex-wrap gap-[4rem]">
            <div className="form-group">
              <label
                htmlFor="brand_name"
                className="block text-xs font-medium text-gray-700"
              >
                Brand Name
                <span className="text-[red] relative left-1 text-[16px]">
                  *
                </span>
              </label>

              <input
                {...register("brand_name", {
                  required: true,
                })}
                aria-invalid={errors.brand_name ? "true" : "false"}
                type="text"
                id="brandName"
                placeholder="Apple"
                className="mt-1 rounded-md w-full md:w-[25rem] border-gray-200 shadow-sm sm:text-sm"
              />
              {errors.brand_name?.type === "required" && (
                <p className="text-red-500" role="alert">
                  Brand name is required
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
              Save brand
            </button>
          </div>
        </form>
      </article>
    </section>
  );
};

export default UpdateBrand;

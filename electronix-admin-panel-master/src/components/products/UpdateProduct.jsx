import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";

import { useGlobalContext } from "../../../context";

const RepeatedBlock = (props) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { error },
    reset,
  } = useForm();

  useEffect(() => {
    if (props.detailKey && props.detailValue) {
      setValue("key", props.detailKey);
      setValue("value", props.detailValue);
    }
  }, []);
  return (
    <div className="key-value-pair w-full flex gap-3">
      <div className="name-container">
        <label
          htmlFor="detail-name"
          className="block text-xs font-medium text-gray-700"
        >
          Name
        </label>

        <input
          {...register("key")}
          type="text"
          id="detail-name"
          placeholder="key name"
          className="mt-1 rounded-md w-full md:w-[12rem] border-gray-200 shadow-sm sm:text-sm"
        />
      </div>
      <div className="value-container">
        <label
          htmlFor="detail-value"
          className="block text-xs font-medium text-gray-700"
        >
          Value
        </label>

        <input
          {...register("value")}
          type="text"
          id="detail-value"
          placeholder="value"
          className="mt-1 rounded-md w-full md:w-[12rem] border-gray-200 shadow-sm sm:text-sm"
        />
      </div>
    </div>
  );
};

const UpdateProduct = () => {
  const navigate = useNavigate();

  const [blocks, setBlocks] = useState([]);

  // products stored in the global context (coming from db)
  const { products, categories, brands, updateProduct } = useGlobalContext();

  // product being updated
  const { id } = useParams();
  const product = products.find((product) => product._id == id);

  // react hook from apis
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  // when submitting the form
  const onSubmit = async (data) => {
    const {
      name,
      price,
      new_price,
      brand_name,
      category_name,
      images,
      stock_count,
    } = data;

    const details = gatherDetails();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("new_price", new_price);
    formData.append("category_name", category_name);
    formData.append("details", JSON.stringify(details));
    formData.append("brand_name", brand_name);
    formData.append("stock_count", stock_count);

    [...images].forEach((img) => {
      formData.append("images", img);
    });

    const response = await axios.put(
      `http://localhost:8000/products/${id}`,
      formData
    );

    updateProduct(response.data.toBeSentDocument);
    navigate("/products");
    toast.success("Product created successfully!");
  };

  const gatherDetails = () => {
    const details = {};
    const keys = document.querySelectorAll("#detail-name");
    const values = document.querySelectorAll("#detail-value");
    for (let i = 0; i < keys.length; i++) {
      if (keys[i].value && values[i].value) {
        details[keys[i].value] = values[i].value;
      }
    }
    return details;
  };

  // initialize the form with the product data
  useEffect(() => {
    setValue("name", product?.name);
    setValue("price", product?.price);
    setValue("new_price", product?.new_price);
    setValue("stock_count", product?.stock_count);
  }, [products]);

  // add another detail
  const handleRepeat = () => {
    setBlocks((prevBlocks) => [
      ...prevBlocks,
      <RepeatedBlock key={prevBlocks.length} />,
    ]);
  };

  return (
    <section className="w-[100%] flex justify-center items-center mt-[30px]">
      <article className="w-[80%]">
        <div className="max-w-lg">
          <h3 className="text-amber-700 text-xl font-bold sm:text-2xl">
            Update product
          </h3>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="form-container mt-[50px] flex flex-col gap-[2rem] justify-center items-center"
        >
          <article className="inputs w-[100%] flex flex-wrap gap-[4rem] justify-between">
            <div className="form-group">
              <label
                htmlFor="name"
                className="block text-xs font-medium text-gray-700"
              >
                Name
                <span className="text-[red] relative left-1 text-[16px]">
                  *
                </span>
              </label>

              <input
                {...register("name", {
                  required: true,
                  pattern: { value: /^[^0-9].*$/i },
                })}
                aria-invalid={errors.name ? "true" : "false"}
                type="text"
                id="name"
                placeholder="iPhone 8"
                className="mt-1 rounded-md w-full md:w-[25rem] border-gray-200 shadow-sm sm:text-sm"
              />
              {errors.name?.type === "required" && (
                <p className="text-red-500" role="alert">
                  Product name is required
                </p>
              )}
              {errors.name?.type === "pattern" && (
                <p className="text-red-500" role="alert">
                  Not valid product name
                </p>
              )}
            </div>
            <div className="form-group">
              <label
                htmlFor="stock_count"
                className="block text-xs font-medium text-gray-700"
              >
                Stock Count
                <span className="text-[red] relative left-1 text-[16px]">
                  *
                </span>
              </label>

              <input
                {...register("stock_count", {
                  required: true,
                  pattern: {
                    value: /^[0-9]+$/i,
                  },
                })}
                aria-invalid={errors.stock_count ? "true" : "false"}
                type="text"
                id="stock_count"
                placeholder="Number"
                className="mt-1 rounded-md w-full md:w-[25rem] border-gray-200 shadow-sm sm:text-sm"
              />
              {errors.stock_count?.type === "required" && (
                <p className="text-red-500" role="alert">
                  Count is required
                </p>
              )}
              {errors.stock_count?.type === "pattern" && (
                <p className="text-red-500" role="alert">
                  Count must be a number
                </p>
              )}
            </div>
            <div className="form-group">
              <label
                htmlFor="price"
                className="block text-xs font-medium text-gray-700"
              >
                Price
                <span className="text-[red] relative left-1 text-[16px]">
                  *
                </span>
              </label>

              <input
                {...register("price", {
                  required: true,
                  pattern: {
                    value: /^[1-9][0-9]*$/i,
                  },
                })}
                aria-invalid={errors.price ? "true" : "false"}
                type="text"
                id="price"
                placeholder="123.22 EGP"
                className="mt-1 rounded-md w-full md:w-[25rem] border-gray-200 shadow-sm sm:text-sm"
              />
              {errors.price?.type === "required" && (
                <p className="text-red-500" role="alert">
                  Price is required
                </p>
              )}
              {errors.price?.type === "pattern" && (
                <p className="text-red-500" role="alert">
                  Price must be a positive number
                </p>
              )}
            </div>
            <div className="form-group">
              <label
                htmlFor="new_price"
                className="block text-xs font-medium text-gray-700"
              >
                New Price
              </label>

              <input
                {...register("new_price", {
                  pattern: { value: /^[0-9]+$/i },
                })}
                aria-invalid={errors.new_price ? "true" : "false"}
                type="text"
                id="new_price"
                placeholder="123.22 EGP"
                className="mt-1 rounded-md w-full md:w-[25rem] border-gray-200 shadow-sm sm:text-sm"
              />
              {errors.new_price?.type === "pattern" && (
                <p className="text-red-500" role="alert">
                  New price must be a number
                </p>
              )}
            </div>
            <div className="form-group">
              <label
                htmlFor="brandName"
                className="block text-xs font-medium text-gray-700"
              >
                Brand
                <span className="text-[red] relative left-1 text-[16px]">
                  *
                </span>
              </label>

              <select
                {...register("brand_name", { required: true })}
                aria-invalid={errors.brand_name ? "true" : "false"}
                id="brand_name"
                className="mt-1 w-full md:w-[25rem] rounded-md border-gray-200 text-gray-700 sm:text-sm"
              >
                <option value="">Please select</option>
                {brands.map((brand) => {
                  return (
                    <option
                      key={brand._id}
                      value={brand.brand_name}
                      selected={brand._id == product.brand_id._id}
                    >
                      {brand.brand_name}
                    </option>
                  );
                })}
              </select>
              {errors.brand_name?.type === "required" && (
                <p className="text-red-500" role="alert">
                  Brand name is required
                </p>
              )}
            </div>
            <div className="form-group">
              <label
                htmlFor="category"
                className="block text-xs font-medium text-gray-700"
              >
                Category
                <span className="text-[red] relative left-1 text-[16px]">
                  *
                </span>
              </label>

              <select
                {...register("category_name", {
                  required: true,
                })}
                aria-invalid={errors.category_name ? "true" : "false"}
                id="category"
                className="mt-1 w-full md:w-[25rem] rounded-md border-gray-200 text-gray-700 sm:text-sm"
              >
                <option value="">Please select</option>
                {categories.map((category) => {
                  return (
                    <option
                      key={category._id}
                      value={category.category_name}
                      selected={category._id == product.category_id._id}
                    >
                      {category.category_name}
                    </option>
                  );
                })}
              </select>
              {errors.category_name?.type === "required" && (
                <p className="text-red-500" role="alert">
                  Category name is required
                </p>
              )}
            </div>
            <div className="form-group">
              <label
                htmlFor="images"
                className="block text-xs font-medium text-gray-700"
              >
                Images
              </label>

              <input
                {...register("images")}
                multiple
                type="file"
                id="images"
                className="mt-1 rounded-md w-full md:w-[25rem] border-gray-200 shadow-sm sm:text-sm"
              />
            </div>
            <div className="w-full h-[1px] bg-[#eee]"></div>
            <div className="w-full text-amber-700 text-md sm:text-2xl">
              Product Details:
            </div>
            <div className="form-group flex flex-wrap gap-3 items-center">
              {product?.details
                ? Object.entries(product?.details).map(
                    ([key, value], index) => (
                      <RepeatedBlock
                        key={index}
                        detailKey={key}
                        detailValue={value}
                      />
                    )
                  )
                : []}
              {blocks}
              <button
                onClick={() => handleRepeat()}
                type="button"
                className="inline-block mt-[18px] h-[38px] px-4 text-white duration-150 font-medium bg-amber-600 rounded-lg hover:bg-amber-700 active:bg-amber-700 md:text-sm"
              >
                Add Detail
              </button>
            </div>
          </article>
          <div className="my-[30px]">
            <button className="inline-block px-4 py-2 text-white duration-150 font-medium bg-amber-600 rounded-lg hover:bg-amber-700 active:bg-amber-700 md:text-sm">
              Save Product
            </button>
          </div>
        </form>
      </article>
    </section>
  );
};

export default UpdateProduct;

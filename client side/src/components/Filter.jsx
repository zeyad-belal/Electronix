/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

// const brands = ["All", "Brand A", "Brand B", "Brand C"]; // Replace with your brand options

const Filter = () => {
  // Filter Functionalities ///////////////////////////////////
  const [searchParams, setSearchParams] = useSearchParams();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOpenOrderBy, setIsOpenOrderBy] = useState(false);
  const [isOpenCategory, setIsOpenCategory] = useState(false);
  const [isOpenBrand, setIsOpenBrand] = useState(false);
  const [isOpenPrice, setIsOpenPrice] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(
    searchParams.get("brand") ? searchParams.get("brand") : "All"
  );
  const [selectedOrderBy, setSelectedOrderBy] = useState(
    searchParams.get("orderBy") ? searchParams.get("orderBy") : "bestSeller"
  );
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") ? searchParams.get("category") : "All"
  );
  const [priceRange, setPriceRange] = useState({
    min: searchParams.get("min") ? searchParams.get("min") : "",
    max: searchParams.get("max") ? searchParams.get("max") : ""
  });

  // Data /////////////////////////////////////////////////////
  const [brands, setBrands] = useState(null);
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    async function getAllBrands() {
      if (selectedCategory === "All") {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/brands`
        );
        console.log("brands", data);
        setBrands(data);
      } else {
        const { data } = await axios.get(
          `${
            import.meta.env.VITE_API_URL
          }/brands?category_name=${selectedCategory}`
        );
        console.log("here brand 2");

        setBrands(data);
      }
    }
    getAllBrands();
  }, [selectedCategory]);

  useEffect(() => {
    async function getAllCategories() {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/categories`
      );

      setCategories(data);
    }
    getAllCategories();
  }, []);

  // Togglers ////////////////////////////////////////////////////////
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleOrderBySection = () => {
    setIsOpenOrderBy(!isOpenOrderBy);
  };

  const toggleCategorySection = () => {
    setIsOpenCategory(!isOpenCategory);
  };

  const toggleBrandSection = () => {
    setIsOpenBrand(!isOpenBrand);
  };

  const togglePriceSection = () => {
    setIsOpenPrice(!isOpenPrice);
  };

  // Handlers ////////////////////////////////////////////////////
  const handleBackdropClick = () => {
    setIsMenuOpen(false);
  };

  const handlePriceChange = (e, type) => {
    const value = e.target.value;
    setPriceRange({ ...priceRange, [type]: value });
  };

  const handleBrandChange = (brand) => {
    setSelectedBrand(brand);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleOrderByChange = (order) => {
    setSelectedOrderBy(order);
  };

  const applyFilters = () => {
    const data = {};

    if (selectedBrand) {
      data.brand = selectedBrand;
    }
    if (selectedCategory) {
      data.category = selectedCategory;
    }
    if (selectedOrderBy) {
      data.orderBy = selectedOrderBy;
    }
    for (let key in priceRange) {
      if (priceRange[key] !== "") {
        data[key] = priceRange[key];
      }
    }

    setSearchParams(data);
    setIsMenuOpen(false);
  };

  return (
    <>
      <div className="md:hidden fixed min-w-0 max-w-full block top-[50%] left-3">
        <button
          className="rounded-full bg-orange-500 p-3 focus:outline-none"
          onClick={toggleMenu}
        >
          <FilterIcon />
        </button>
      </div>
      <div className="md:border-r">
        <div
          className={
            !isMenuOpen
              ? "min-w-0 max-w-full hidden md:block md:w-72 p-4 sticky top-12"
              : "fixed z-[900] left-0 top-0 h-screen w-64 p-4 bg-white shadow-lg"
          }
        >
          {/* Add Close Button to Menu */}
          {isMenuOpen && (
            <div className="flex justify-end pb-3">
              <span className="cursor-pointer" onClick={toggleMenu}>
                <CloseIcon />
              </span>
            </div>
          )}
          {/* ------------------------------------- Order By ------------------------------- */}
          <button
            className="flex items-center justify-between w-full px-4 py-2 text-lg font-medium text-left bg-gray-200 focus:outline-none focus:bg-gray-300 rounded-md"
            onClick={toggleOrderBySection}
          >
            Order By
            <ArrowIcon isOpen={isOpenOrderBy} />
          </button>
          {isOpenOrderBy && (
            <div className="mt-4">
              <div className="space-x-2">
                <input
                  type="radio"
                  checked={selectedOrderBy === "bestSeller"}
                  onChange={() => handleOrderByChange("bestSeller")}
                  name="best-seller"
                />
                <label htmlFor="best-seller">Best Seller</label>
              </div>
              <div className="space-x-2">
                <input
                  type="radio"
                  checked={selectedOrderBy === "newArrival"}
                  onChange={() => handleOrderByChange("newArrival")}
                  name="new-arrival"
                />
                <label htmlFor="new-arrival">New Arrival</label>
              </div>
              <div className="space-x-2">
                <input
                  type="radio"
                  checked={selectedOrderBy === "hasOffer"}
                  onChange={() => handleOrderByChange("hasOffer")}
                  name="has-offer"
                />
                <label htmlFor="has-offer">Has Offer</label>
              </div>
            </div>
          )}
          {/* ------------------------------------- Categories ------------------------------- */}
          <button
            className="flex items-center justify-between w-full mt-4 px-4 py-2 text-lg font-medium text-left bg-gray-200 focus:outline-none focus:bg-gray-300 rounded-md"
            onClick={toggleCategorySection}
          >
            Category
            <ArrowIcon isOpen={isOpenCategory} />
          </button>
          {isOpenCategory && (
            <div className="mt-4">
              <div className="space-x-2">
                <input
                  type="radio"
                  checked={selectedCategory === "All"}
                  onChange={() => handleCategoryChange("All")}
                  name="all-categories"
                />
                <label htmlFor="all-categories">All</label>
              </div>
              {categories &&
                categories.map((category) => (
                  <div key={category._id} className="space-x-2">
                    <input
                      type="radio"
                      checked={selectedCategory === category.category_name}
                      onChange={() =>
                        handleCategoryChange(category.category_name)
                      }
                      name={category.category_name}
                    />
                    <label htmlFor={category.category_name}>
                      {category.category_name}
                    </label>
                  </div>
                ))}
            </div>
          )}
          {/* ------------------------------------- Brands ------------------------------- */}
          <button
            className="flex items-center justify-between w-full px-4 py-2 mt-4 text-lg font-medium text-left bg-gray-200 focus:outline-none focus:bg-gray-300 rounded-md"
            onClick={toggleBrandSection}
          >
            Brands
            <ArrowIcon isOpen={isOpenBrand} />
          </button>
          {isOpenBrand && (
            <div className="mt-4">
              <div className="space-x-2">
                <input
                  type="radio"
                  checked={selectedBrand === "All"}
                  onChange={() => handleBrandChange("All")}
                  name="all-brands"
                />
                <label htmlFor="all-brands">All</label>
              </div>
              {console.log(brands)}
              {[...brands].length &&
                [...brands]?.map((brand) => (
                  <div key={brand._id} className="space-x-2">
                    <input
                      type="radio"
                      checked={selectedBrand === brand.brand_name}
                      onChange={() => handleBrandChange(brand.brand_name)}
                      name={brand.brand_name}
                    />
                    <label htmlFor={brand.brand_name}>{brand.brand_name}</label>
                  </div>
                ))}
            </div>
          )}
          <button
            className="flex items-center justify-between w-full px-4 py-2 mt-4 text-lg font-medium text-left bg-gray-200 focus:outline-none focus:bg-gray-300 rounded-md"
            onClick={togglePriceSection}
          >
            Price Range
            <ArrowIcon isOpen={isOpenPrice} />
          </button>
          {isOpenPrice && (
            <div className="mt-4">
              <div className="flex space-x-2">
                <input
                  type="number"
                  placeholder="Min"
                  min={0}
                  value={priceRange.min}
                  onChange={(e) => handlePriceChange(e, "min")}
                  className="w-1/2 px-2 py-1 text-sm border rounded-md"
                />
                <input
                  type="number"
                  placeholder="Max"
                  min={0}
                  value={priceRange.max}
                  onChange={(e) => handlePriceChange(e, "max")}
                  className="w-1/2 px-2 py-1 text-sm border rounded-md"
                />
              </div>
            </div>
          )}
          <button
            className="w-full px-4 py-2 mt-4 text-sm font-medium text-white bg-orange-500 rounded-md hover:bg-orange-600"
            onClick={applyFilters}
          >
            Apply Filters
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div
          className="fixed z-[900] inset-y-0 right-0 w-[calc(100%-16rem)] bg-gray-900 opacity-50"
          onClick={handleBackdropClick}
        />
      )}
    </>
  );
};

const ArrowIcon = ({ isOpen }) => {
  return (
    <>
      <svg
        className={`w-5 h-5 ml-2 transition-transform duration-300 transform ${
          isOpen ? "rotate-180" : "rotate-0"
        }`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </>
  );
};

const FilterIcon = () => {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z"
        />
      </svg>
    </>
  );
};

const CloseIcon = () => {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </>
  );
};

export default Filter;

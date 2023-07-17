import React from "react";
import {
  HiUserGroup,
  HiHome,
  HiViewBoards,
  HiViewGrid,
  HiSparkles,
} from "react-icons/hi";

export const navLinks = [
  {
    id: 1,
    url: "/",
    text: "Dashboard",
    icon: HiHome,
  },
  {
    id: 2,
    url: "/categories",
    text: "Categories",
    icon: HiViewBoards,
  },
  {
    id: 3,
    url: "/products",
    text: "Products",
    icon: HiViewGrid,
  },
  {
    id: 4,
    url: "/users",
    text: "Users",
    icon: HiUserGroup,
  },
  {
    id: 5,
    url: "/brands",
    text: "Brands",
    icon: HiSparkles,
  },
];

import React from "react";
import Header from "../header";
import { Outlet, NavLink } from "react-router-dom";
import { useStore } from "../store";

export default function RootLayout() {
const {theme} = useStore()

  return (
    <div className={` ${theme === "light" ? "base-color text-brand" : "base-dark text-dark"} w-full min-h-screen default-font `}>
<Header />
<Outlet />
<div className=" mt-20 sm:text-sm text-[11px] text-center pb-5 px-2 w-full">Copyright&copy; Seasoned Fireworks Ltd. for more info, visit <NavLink to="/contact-us"><span className="text-cta">contact us</span></NavLink></div>
    </div>
  );
}

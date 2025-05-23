import React, { useContext, useEffect } from "react";
import { HeaderContext } from "../header";
import { NavLink } from "react-router-dom";
import { useStore } from "../store";
import { useLocation } from "react-router-dom";

export default function MainNavbar() {
  const { navTog, setNavTog, setpageName, pageName } = useContext(HeaderContext);
  const { theme } = useStore();

  const location = useLocation();
  const basePath = "/" + location.pathname.split("/")[1];

  useEffect(
    function () {
      if (basePath === "/cart") {
        setpageName("Cart");
      }
      if (basePath === "/checkout") {
        setpageName("Checkout");
      }
      else{
         setpageName(null);
      }
    },
    [basePath],
  );

  return (
    <>
    {pageName !== "Checkout" && 
      <ul
        id="mainNavbar"
        className={`absolute mt-2 sm:mt-0 items-center ${navTog ? "opacity-100" : "hidden opacity-0"} z-20 flex h-screen w-screen flex-col 
        justify-between py-28 sm:flex ${theme === "light" ? "base-color" : "base-dark"} sm:relative sm:h-fit 
        sm:w-80 sm:flex-row sm:py-5 sm:opacity-100 md:w-96`}
      >
        <NavLink to="/">
          <div
            onClick={() => {
              setNavTog(!navTog);
            }}
          >
            <span>Home</span>
            <li className="transition-halfsec m-auto h-1 w-0 rounded-full border border-transparent text-center"></li>
          </div>
        </NavLink>

        <NavLink to="/products">
          <div
            onClick={() => {
              setNavTog(!navTog);
            }}
          >
            <span>Products</span>
            <li className="transition-halfsec m-auto h-1 w-0 rounded-full border border-transparent text-center"></li>
          </div>
        </NavLink>

        <NavLink to="/contact-us">
          <div
            onClick={() => {
              setNavTog(!navTog);
            }}
          >
            <span>Contact Us</span>
            <li className="transition-halfsec m-auto h-1 w-0 rounded-full border border-transparent text-center"></li>
          </div>
        </NavLink>

        <NavLink to="/privacy-policy">
          <div
            onClick={() => {
              setNavTog(!navTog);
            }}
          >
            <span>Privacy Policy</span>
            <li className="transition-halfsec m-auto h-1 w-0 rounded-full border border-transparent text-center"></li>
          </div>
        </NavLink>
      </ul>
      }
    </>
  );
}

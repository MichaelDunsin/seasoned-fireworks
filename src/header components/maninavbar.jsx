import React, { useContext, useEffect } from "react";
import { HeaderContext } from "../header";
import { NavLink } from "react-router-dom";
import { useStore } from "../store";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { div } from "motion/react-client";

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

const navchildren = [
  {path: "/", page: "Home" },
  {path: "/products", page: "Products"},
  {path: "/contact-us", page: "Contact Us"},
  {path: "/privacy-policy", page: "Privacy Policy"}
]

const ParentVariant = {
  initial: {opacity: 0, x: "100%"},
  animate: {opacity: 1, x:0 },
  exit: {opacity: 0, x: "100%"}
}

const ChildrenVariant = {
  initial: {opacity: 0, x: 10},
  animate: {opacity: 1, x:0 },
  exit: {opacity: 0, x: 10}
}

  return (
    <>
    <AnimatePresence>
    {navTog && 
      <motion.ul
      variants={ParentVariant}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{
        duration: 0.4,
        when: "beforeChildren",
        staggerChildren: 0.1
      }}
        id="mainNavbar"
        className={`absolute text-lg font-semibold mt-2 sm:mt-0 items-center z-20 flex h-screen w-screen flex-col 
        justify-between py-28 sm:flex ${theme === "light" ? "base-color" : "base-dark"} sm:relative sm:h-fit 
        sm:w-80 sm:flex-row sm:py-5 sm:opacity-100 md:w-96`}
      >
        {
          navchildren.map(child => {
            return(
              <motion.div
              variants={ChildrenVariant}
              transition={{duration: 0.1}}
              >
              <NavLink
              to={child.path}>
          <div
            onClick={() => {
              setNavTog(!navTog);
            }}
          >
            <span>{child.page}</span>
            <li className="transition-halfsec m-auto h-1 w-0 rounded-full border border-transparent text-center"></li>
          </div>
        </NavLink>
        </motion.div>
            )
          })
        }
        
      </motion.ul>
      }
      </AnimatePresence>
    </>
  );
}

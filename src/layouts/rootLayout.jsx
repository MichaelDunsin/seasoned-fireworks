import Header from "../header";
import { Outlet, NavLink, useLocation } from "react-router-dom";
import { useStore } from "../store";
import { AnimatePresence } from "motion/react";
import ScrollToTop from "../scrollToTop";

export default function RootLayout() {
const {theme} = useStore()
const location = useLocation();
 const basePath = "/" + location.pathname.split("/")[1];



  return (
    <div className={` ${theme === "light" ? "base-color text-brand" : "base-dark text-dark"} w-full min-h-screen `}>
<Header />
<ScrollToTop/> {/* with this, each route starts from the top of the page on render */}
<AnimatePresence mode="wait" >
  <div 
  key={basePath}>
<Outlet />
<div 
className=" mt-20 sm:text-sm text-[11px] text-center pb-5 px-2 w-full">
  Copyright&copy; Seasoned Fireworks Ltd. for more info, visit <NavLink to="/contact-us"><span className="text-cta">contact us</span></NavLink>
  </div>
  </div>
  </AnimatePresence>
    </div>
  );
}

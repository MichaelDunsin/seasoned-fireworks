import React, { useState, useRef, useEffect, useContext, useLayoutEffect } from "react";
import { HeaderContext } from "../header"
import { useStore } from "../store";
import { AnimatePresence, motion } from "motion/react";

export default function ThemeTog(){

const {theme, setTheme} = useStore()

     const { navTog } =useContext(HeaderContext)

    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState(localStorage.getItem("selected") || "Theme");
    const dropdownRef = useRef(null);
    const options = ["Light", "Dark", "System"];
  
    // Toggle dropdown
    const toggleDropdown = () => setIsOpen(!isOpen);
  
    // Close dropdown when clicking outside. still has to be studied though
    useEffect(() => {
      function handleClickOutside(event) {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          setIsOpen(false);
        }
      }
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    useLayoutEffect(() => {
       
        const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        
        if (selected === "Dark" || (selected === "System" && systemDark)){
          setTheme("dark")
        } else {
          setTheme("light")
        }
        /* the reason why i was encountering errors here was because on refresh, my selected state was
        re-initialised leading to the re-run of the function in the useEffect above. And when the function
        ran and (selected === "Dark" || (selected === "System" && systemDark)) evaluated to false i.e
         selected wasn't === Dark OR (selected wasn't  === "System" && systemDark(this was true though)), the setTheme state setter
         was triggered to set the theme to "light" and when the theme changed, it caused the useEffect for the theme to also change
         and when the function in the useEffect for the theme was triggered, it caused the light theme to be stored in local storage
         and since the theme gets its value from the local storage, the theme's valuewas light
         
         the way i fixed this was by throwing the selected state inside of localstorage and making the initial state value of the selected state
         the last state value in the local storage so that whenever the page refreshes, the selected state is already there and the theme is just
         assigned based on the value of the selected state */
         localStorage.setItem("selected", selected);
        
      }, [selected]);

      //state update is assynchronous so if you log a state immediately after updating it, you may see the previous state.
      //to fix this, make use of the useEffect hook and add the state in the dependency array so that you are always logging
      //the current state

return (
<>
<AnimatePresence>
{navTog && <motion.div 
 initial={{opacity: 0,}}
      animate={{opacity: 1, transition: {delay: 0.4}}}
      exit={{opacity: 0,}}
      transition={{
        duration: 0.1,
        
      }}
id="themetoogler" className={` sm:block absolute left-5 sm:left-0 sm:relative w-20 py-5 mr-2 z-20 `} ref={dropdownRef}>
      <div className=" font-medium border border-transparent px-1 cursor-pointer rounded-md flex justify-between items-center " onClick={toggleDropdown}>
        {selected || "Theme"}
        <span className={`arrow ${isOpen ? "rotate-0" : "rotate-180" }`}>▼</span>
      </div>
      {isOpen && (
        <div className=" glass absolute top-16 left-0 w-full flex flex-col rounded-md overflow-hidden z-20">
          {options.map((option) => (
            <div
              key={option}
              className={`dropdown-option ${theme === "light" ? "theme-l" : "theme-d"} ${selected === option ? "text-cta" : ""}`}
              onClick={() =>  { 
                                setSelected(option);
                                setIsOpen(false);
                                }}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </motion.div>}
    </AnimatePresence>
</>
)
};

/* 
here in the themetoogler, there will be the function to check whether it is on dark theme or dark system theme
if it is, the state setter will set the theme to be dark and if it isn't, the state setter will set the theme to be light
the theme state will be stored in the zustand store and will be persisted in the local storage
there will be dark and light classes that match with the theme state so that when the theme state changes, the classes w

*/
import React, { createContext, useState } from "react"

import LogoAndName from "./header components/logo$name";
import NavTog from "./header components/navtog";
import ThemeTog from "./header components/themetog";
import MainNavbar from "./header components/maninavbar";
import { useStore } from "./store";

export const HeaderContext = createContext()

export default function Header() {

  const [navTog, setNavTog] = useState(false);
  const [pageName, setpageName] = useState('');
  const {theme} = useStore()

  return (
    <header className={`sticky text-dark flex z-20 -top-1 h-20 w-full justify-between ${theme === "light" ? "bg-[#171511]" : "base-dark"} md:h-24`}>
      {/* note that whenever you use position sticky, add top-0 for it to actually stick */}
<HeaderContext.Provider value ={{navTog, setNavTog, pageName, setpageName}}>

  <LogoAndName />
  < MainNavbar />
  < NavTog />
  < ThemeTog />

</HeaderContext.Provider>
     </header>
  );
}


/* 

have a state that updates to true if (theme === "dark" || (theme === "system" && systemDark)) and to false if otherwise

*/
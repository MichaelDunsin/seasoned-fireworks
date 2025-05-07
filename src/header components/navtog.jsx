import React, { useContext } from "react"
import { HeaderContext } from "../header"


export default function NavTog(){

const {navTog, setNavTog, pageName} =useContext(HeaderContext)

return (
<>
{pageName !== "Checkout" && 
<div
        id="mobileNavTooglerButton"
        className={`z-20 my-3 mr-3 h-fit hover:cursor-pointer sm:hidden`}
      >
        <img
          src= {`${navTog ? '/images/close.png' : '/images/menu (1).png'}`}
          className={` filter-cta transition-halfsec ${navTog ? 'rotate-180' : 'rotate-0'} `}
          onClick={() => setNavTog(!navTog)}
        />
      </div>
}
</>
)
};


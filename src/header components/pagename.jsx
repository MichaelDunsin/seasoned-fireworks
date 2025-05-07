import React, { useContext } from "react"
import { HeaderContext } from "../header"

export default function PageName(){

    const { pageName } =useContext(HeaderContext)
    
return (
<>
{(pageName !== "Cart" && pageName !== "Checkout") &&
<div id="pageName" className=" sm:hidden m-auto">
      <span className=" text-cta font-medium">{pageName}</span>
       <div className=" m-auto h-1 w-5 rounded-full border cta-color border-transparent text-center"></div>
      </div>
}
</>
)
};


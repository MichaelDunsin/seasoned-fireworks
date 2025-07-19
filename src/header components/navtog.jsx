import { useContext } from "react"
import { HeaderContext } from "../header"
import { Menu, X } from "lucide-react"


export default function NavTog(){

const {navTog, setNavTog, pageName} =useContext(HeaderContext)

return (
<>
{pageName !== "Checkout" && 
<div
        id="mobileNavTooglerButton"
        className={`z-20 my-3 mr-3 h-fit hover:cursor-pointer sm:hidden`}
      >
        <div
          
          className={` filter-cta transition-halfsec ${navTog ? 'rotate-180' : 'rotate-0'} `}
          onClick={() => setNavTog(!navTog)}
        >
        {
          navTog ? < X size={30}/> : <Menu size={30}/>
        }
        </div>
      </div>
}
</>
)
};


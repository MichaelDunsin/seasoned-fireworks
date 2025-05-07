import React, { useEffect } from "react"
import { useLoaderData, useLocation } from "react-router-dom";
import { useStore } from "../store";

export default function Alcohol(){
  const location = useLocation();
  const isActive = location.pathname === "/products";

const {setViewDetails, setCategoryData, setCategoryIndex} = useStore()
    const products = useLoaderData()

  

    useEffect(()=> {
        if(isActive){
          setCategoryData(products)
        }
        
    }, [])
return (
<>
{products.map((product, index) => (
          <div key={product.id} className=" max-w-[350px] p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]">
            <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-md mb-4" />
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="text-gray-600">{product.price.toFixed(2)}</p>
            <button 
              onClick={()=> {
                setViewDetails(product)
                setCategoryIndex(index)
              }}
              className="mt-3 text-dark cta-color px-4 py-2 rounded "
            >
              View Details
            </button></div>
        ))}
</>
)
};

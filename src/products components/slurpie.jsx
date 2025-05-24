import React, { useEffect } from "react"
import { useLoaderData, useLocation } from "react-router-dom";
import { useStore } from "../store";
import { motion } from "motion/react";

export default function Slurpie(){
  const location = useLocation();
  const isActive = location.pathname === "/products/slurpie";

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
          <motion.div 
                     initial={{ opacity: 0, y: -20}}/* when using viewport in framer motion, always remember to set the initial 
                      prop because if there is no initial prop, "once: true," will not work */
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true, amount: 0.3, //don't go below 0.3 and don't use any of the text values 
                  }}
                    key={product.id} className=" max-w-[350px] p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]">
                      <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-md mb-4" />
                      <h2 className="md:text-xl font-semibold">{product.name}</h2>
                      <p className="text-gray-600 text-sm ">{product.price.toFixed(2)}</p>
                      <button 
                        onClick={()=> {
                          setViewDetails(product)
                          setCategoryIndex(index)
                        }}
                        className="mt-3 text-dark text-sm cta-color px-4 py-2 rounded "
                      >
                        View Details
                      </button></motion.div>
        ))}
</>
)
};


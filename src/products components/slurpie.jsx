import React, { useEffect } from "react"
import { useLoaderData, useLocation } from "react-router-dom";
import { useStore } from "../store";
import { motion } from "motion/react";

export default function Slurpie(){
  const location = useLocation();
  const isActive = location.pathname === "/products/slurpie";

const {setViewDetails, setCategoryData, setCategoryIndex} = useStore()
    const products = useLoaderData()

    const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.3, // delay between each child
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: {type: "spring", stiffness: 200, damping: 10}},
  };


    useEffect(()=> {
        if(isActive){
          setCategoryData(products)
        }
        
    }, [])
    
return (
 <motion.div 
     variants={containerVariants}
      initial="hidden"
      animate="visible" 
      
        className="m-auto grid max-w-[350px] grid-cols-1 items-center gap-3 pt-10 sm:max-w-none sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
{products.map((product, index) => (
          <motion.div 
           onClick={()=> {
                setViewDetails(product)
                setCategoryIndex(index)
              }}
         variants={childVariants}
          transition={{ type: "spring", stiffness: 200, damping: 10}}
          key={product.id} 
          className=" max-w-[350px] p-4 rounded-lg shadow-md hover:shadow-lg transition-all cursor-pointer duration-300 transform hover:scale-[1.02]">
            <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-md mb-4" />
            <h2 className="md:text-xl font-semibold">{product.name}</h2>
            <p className="text-gray-600 text-sm ">{product.price.toFixed(2)}</p>
            <button 
             
              className="mt-3 text-dark text-sm cta-color px-4 py-2 rounded "
            >
              View Details
            </button>
            </motion.div>
        ))}
</motion.div>
)
};


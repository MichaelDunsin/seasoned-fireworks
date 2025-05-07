import React, { useState, useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useStore } from "../store";

export default function Products() {
  const { viewDetails, cart, setNewCart, setViewDetails, categoryIndex, setCategoryIndex, categoryData, setCheckoutData, checkoutData } = useStore();
  const [quantity, setQuantity] = useState(1);
  const [flicker, setFlicker] = useState("");
  const [quantityNum, setQuantityNum] = useState(false)
  const { theme } = useStore();
  const prevIndex = (categoryIndex === 0 ? categoryData.length -1 : categoryIndex - 1 )
  const nextIndex = (categoryIndex + 1) % categoryData.length
const navigate = useNavigate()
  useEffect(() => {
    if (viewDetails) {
      document.body.style.overflow = "hidden";

    } else {
      document.body.style.overflow = "";
    }

    setFlicker("flicker")
setTimeout(() => setFlicker(""), 400);

setQuantity(1)

    // clean up on unmount
    return () => {
      document.body.style.overflow = "";
    };
  }, [viewDetails]);

  useEffect(
    ()=>{
      localStorage.setItem("cart", JSON.stringify(cart));
      setQuantityNum(
        ()=> {
          const total = cart.reduce((sum, item) => sum + item.quantity, 0);
          return total;
        }
      )
    }, [cart]
  )


  useEffect(
    function(){
setViewDetails(categoryData[categoryIndex]);

    },[categoryIndex]);

    useEffect(
      ()=>{
        localStorage.setItem("checkoutData", JSON.stringify(checkoutData));
      }, [checkoutData]
    )

    const handleBuyNow = ()=> {
      const subtotal = (viewDetails.price * quantity)
      const shipping = subtotal < 50 ? 10 : 0;
      const tax = (subtotal * 0.15625)
      const total = (subtotal + shipping + tax)
navigate('/checkout')
setCheckoutData([subtotal, shipping, tax, total])
    }

  return (
    <div>
      <div className="container mx-auto px-4 py-10">
        <div className="px-5">
          <h1 className="mb-6 text-center text-2xl sm:text-3xl md:text-4xl font-semibold">
            Our Products
          </h1>
          <figure 
           onClick={()=> navigate('/cart')}
/* this might be one of the most importantest notes in the build of this project. whenever you are using useNavigate,
please use '' instead of "" for the routes. Also note that the routes are going to start with a / for absolute routes */

          className="relative ml-auto w-fit">
            <img
              src="/images/cart.png"
              className="filter-cta mb-2 cursor-pointer"
            />
          <figcaption className={`text-dark ${quantityNum ? '' : 'hidden'} absolute -right-4 -top-3 rounded-xl bg-red-600 px-2`}>
                    {quantityNum}
                  </figcaption>
          </figure>
        </div>
        <div id="categories" className="mb-6 flex justify-center space-x-1">
          <NavLink to="/products" end>
            <button 
            onClick={()=> setCategoryIndex(null)}
            className="plain-glass rounded px-1 py-1 text-sm sm:px-4 sm:py-2 md:text-lg">
              Fruit Wine
            </button>
          </NavLink>
          <NavLink to="bottle">
            <button
            onClick={()=> setCategoryIndex(null)}
            className="plain-glass rounded px-1 py-1 text-sm sm:px-4 sm:py-2 md:text-lg">
              Bottles
            </button>
          </NavLink>
          <NavLink to="picnic">
            <button
            onClick={()=> setCategoryIndex(null)}
            className="plain-glass rounded px-1 py-1 text-sm sm:px-4 sm:py-2 md:text-lg">
              Picnic
            </button>
          </NavLink>
          <NavLink to="slurpie">
            <button
            onClick={()=> setCategoryIndex(null)}
            className="plain-glass rounded px-1 py-1 text-sm sm:px-4 sm:py-2 md:text-lg">
              Slurpies
            </button>
          </NavLink>
        </div>

        <div className="m-auto grid max-w-[350px] grid-cols-1 items-center gap-3 pt-10 sm:max-w-none sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <Outlet />
        </div>

        {viewDetails && (
          <div className="fixed transition-all inset-0 z-20 flex items-center justify-center bg-black bg-opacity-70">
            <div
              className={` ${theme === "light" ? "base-color text-brand" : "base-dark text-dark"} relative h-5/6 w-11/12 overflow-auto rounded-lg pt-6 shadow-lg lg:w-5/6`}
            >
              <button
                onClick={() => setViewDetails(null)}
                className="plain-glass absolute left-7 top-5 z-10 rounded-full px-3 py-1 text-2xl font-extrabold md:top-10"
              >
                🡠
              </button>

              <button
              onClick={()=> navigate('/cart')}
              className="absolute right-7 top-7 z-10 md:right-20 md:top-12">
                <figure className="relative ml-auto w-fit">
                  <img
                    src="/images/cart.png"
                    className="filter-cta mb-2 cursor-pointer"
                  />
                  <figcaption className={`text-dark ${quantityNum ? '' : 'hidden'} absolute -right-4 -top-3 rounded-xl bg-red-600 px-2`}>
                    {quantityNum}
                  </figcaption>
                </figure>
              </button>
              <button
              onClick={()=> {
                if(categoryIndex < 1){
                  setCategoryIndex(categoryData.length - 1)
                }
                else{
                  setCategoryIndex(categoryIndex - 1)
                }
              }}
                className={` ${theme === "light" ? "bg-stone-300" : "bg-stone-700"} absolute left-2 top-[260px] z-10 rounded-full px-3 py-2 text-2xl font-extrabold xl:left-16`}
              >
                🡰
              </button>
              <button
               onClick={()=> {
                if(categoryIndex >= categoryData.length - 1){
                  setCategoryIndex(0)
                }
                else{
                  setCategoryIndex(categoryIndex + 1)
                }
              }}
                className={` ${theme === "light" ? "bg-stone-300" : "bg-stone-700"} absolute right-2 top-[260px] z-10 rounded-full px-3 py-2 text-2xl font-extrabold xl:right-16`}
              >
                🡲
              </button>

              <div className="relative mx-auto max-w-4xl   p-6">
                {/* Header */}
                <div className="m-auto mb-6 flex items-center justify-between">
                  <h2 className="m-auto text-lg font-bold md:text-xl">
                    Product Preview
                  </h2>
                </div>
                {/* details section */}
                <div className="flex flex-col   sm:flex-row">
                  {/* image plus thumbnails */}
                  <div className="w-[100%]   sm:w-1/2">
                    <img
                      src={viewDetails.image}
                      alt={viewDetails.name}
                      className={`relative h-[275px] w-full ${flicker} rounded-xl object-cover sm:h-[300px]`}
                    />
                    <div className="mt-7 flex w-[100%] items-center justify-center  space-x-4   sm:w-[220%] md:w-[200%]">
                     {[categoryData[prevIndex], categoryData[categoryIndex], categoryData[nextIndex]].map((i) => (
                        <div
                            key={i.id}
                          className={` ${i.id === viewDetails.id ? "rounded border border-neutral-400 " : "h-20 w-20"} transition-all ${flicker} `}
                        >
                          <img
                            src={i.image}
                            alt={i.name}
                            className={` rounded ${i.id === viewDetails.id ? " w-20 h-20 m-1" : "h-full w-full"} object-cover`}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="w-[100%]   object-cover sm:w-[60%] md:w-1/2">
                    <div className="plain-glass relative m-auto mt-3 max-h-[320px] min-h-[310px] w-[97%] space-y-1 overflow-auto rounded-xl px-4 pt-2 sm:mt-0 sm:h-[300px]">
                    <div className=' space-y-1'>
                      <h3 className="text-2xl font-bold">{viewDetails.name}</h3>
                      <div className={`text-sm ${flicker} p-1 bg-[rgba(185, 178, 178, 0.1)] sm:h-20 rounded backdrop-blur-[10px]`}>{viewDetails.description}</div>
                      <p className="text-xl">${viewDetails.price.toFixed(2)}</p>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span className="text-cta mb-1 text-3xl">★</span>
                        <span className={`${flicker} ml-2 text-sm`}>
                          {viewDetails.rating} Stars
                        </span>
                      </div>

                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() =>
                              setQuantity(Math.max(1, quantity - 1))
                            }
                            className="bg-[rgba(185, 178, 178, 0.1)] rounded px-2 py-1 backdrop-blur-[10px] transition duration-200 hover:bg-orange-500"
                          >
                            −
                          </button>
                          <span>{quantity}</span>
                          <button
                            onClick={() => setQuantity(quantity + 1)}
                            className="bg-[rgba(185, 178, 178, 0.1)] rounded px-2 py-1 backdrop-blur-[10px] transition duration-200 hover:bg-orange-500"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between   pb-1">
                        <button
                        onClick={()=> setNewCart({id:viewDetails.id, name:viewDetails.name, category:viewDetails.category, quantity:quantity, price:viewDetails.price, image:viewDetails.image})}
                        className="rounded bg-orange-500 px-4 py-2 backdrop-blur-[10px] transition duration-200 hover:bg-transparent">
                          Add to Cart
                        </button>
                        <button 
                        onClick={()=> handleBuyNow()}
                        className="bg-[rgba(185, 178, 178, 0.1)] rounded px-4 py-2 backdrop-blur-[10px] transition duration-200 hover:bg-orange-500">
                          Buy Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div> 
    </div>
  );
}

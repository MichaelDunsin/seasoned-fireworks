import { useState, useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useStore } from "../store";
import { motion, AnimatePresence } from "motion/react";

export default function Products() {
  const {
    viewDetails, cart, setNewCart, setViewDetails, categoryIndex, setCategoryIndex, categoryData, setCheckoutData, checkoutData, } = useStore();
  const [quantity, setQuantity] = useState(1);
  const [flicker, setFlicker] = useState("");
  const [quantityNum, setQuantityNum] = useState(false);
  const { theme } = useStore();
  const prevIndex =
    categoryIndex === 0 ? categoryData.length - 1 : categoryIndex - 1;
  const nextIndex = (categoryIndex + 1) % categoryData.length;
  const navigate = useNavigate();
  useEffect(() => {
    if (viewDetails) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    setFlicker("flicker");
    setTimeout(() => setFlicker(""), 400);

    setQuantity(1);

    // clean up on unmount
    return () => {
      document.body.style.overflow = "";
    };
  }, [viewDetails]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    setQuantityNum(() => {
      const total = cart.reduce((sum, item) => sum + item.quantity, 0);
      return total;
    });
  }, [cart]);

  useEffect(
    function () {
      setViewDetails(categoryData[categoryIndex]);
    },
    [categoryIndex],
  );

  useEffect(() => {
    localStorage.setItem("checkoutData", JSON.stringify(checkoutData));
  }, [checkoutData]);

  const handleBuyNow = () => {
    const subtotal = viewDetails.price * quantity;
    const shipping = subtotal < 50 ? 10 : 0;
    const tax = subtotal * 0.15625;
    const total = subtotal + shipping + tax;
    navigate("/checkout");
    setCheckoutData([subtotal, shipping, tax, total]);
  };

  const pageVariants = {
   initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -40 },
};

  return (
    <motion.div
    variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
         transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-8 py-10">
        <div className="px-5">
          <h1 className="mb-6 text-center text-2xl font-semibold sm:text-3xl md:text-4xl">
            Our Products
          </h1>
          <figure
            onClick={() => navigate("/cart")}
            /* this might be one of the most importantest notes in the build of this project. whenever you are using useNavigate,
please use '' instead of "" for the routes. Also note that the routes are going to start with a / for absolute routes */

            className="relative ml-auto w-fit"
          >
            <img
              src="/images/cart.webp"
              className="filter-cta mb-2 w-5 cursor-pointer md:w-7"
            />
            <figcaption
              className={`text-dark ${quantityNum ? "" : "hidden"} absolute -right-4 -top-3 rounded-full bg-red-600 px-2 text-[12px] md:text-sm`}
            >
              {quantityNum}
            </figcaption>
          </figure>
        </div>
        <div
          id="categories"
          className="plain-glass mx-auto mb-6 flex max-w-[410px] justify-center rounded p-1"
        >
          <NavLink to="/products" end>
            <button
              onClick={() => setCategoryIndex(null)}
              className="rounded p-2 text-[13px] sm:px-4 sm:py-2 sm:text-sm md:text-lg"
            >
              Fruit Wine
            </button>
          </NavLink>
          <NavLink to="bottle">
            <button
              onClick={() => setCategoryIndex(null)}
              className="rounded p-2 text-[13px] sm:px-4 sm:py-2 sm:text-sm md:text-lg"
            >
              Bottles
            </button>
          </NavLink>
          <NavLink to="picnic">
            <button
              onClick={() => setCategoryIndex(null)}
              className="rounded p-2 text-[13px] sm:px-4 sm:py-2 sm:text-sm md:text-lg"
            >
              Picnic
            </button>
          </NavLink>
          <NavLink to="slurpie">
            <button
              onClick={() => setCategoryIndex(null)}
              className="rounded p-2 text-[13px] sm:px-4 sm:py-2 sm:text-sm md:text-lg"
            >
              Slurpies
            </button>
          </NavLink>
        </div>

        {/* Outlet for nested routes of the various drinks */}
          <Outlet />

{/* viewdetails section */}

        <AnimatePresence >
          {/* note that whenever you use Animatepresence for conditional rendering or mapping components, the <Animatepresence></Animatepresence> must be outside the {} (the curly braces where
the render logic sits). Else, your exit animation won't work */}
        {viewDetails && (
          <motion.div 
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          exit={{opacity: 0}}
           transition= {{duration: 0.1}}
           
          className="fixed inset-0 z-20 flex items-center justify-center bg-black bg-opacity-70 transition-all">
            <div
              className={` ${theme === "light" ? "base-color text-brand" : "base-dark text-dark"} relative h-[90%] w-[95%] overflow-x-hidden rounded-lg pt-6 shadow-lg sm:w-11/12 lg:w-5/6`}
            >
              <button
                onClick={() => {
                  setViewDetails(null)
                setCategoryIndex(null)}}
                className="plain-glass absolute left-2 top-5 z-10 rounded-full px-3 text-[12px] font-extrabold md:left-7 md:top-10 py-2 md:text-sm"
              >
             ✖
              </button>

              <button
                onClick={() => navigate("/cart")}
                className="absolute right-7 top-7 z-10 md:right-20 md:top-12"
              >
                <figure className="relative ml-auto w-fit">
                  <img
                    src="/images/cart.webp"
                    className="filter-cta mb-2 w-5 cursor-pointer md:w-7"
                  />
                  <figcaption
                    className={`text-dark ${quantityNum ? "" : "hidden"} absolute -right-4 -top-3 rounded-full bg-red-600 px-2 text-[12px] md:text-sm`}
                  >
                    {quantityNum}
                  </figcaption>
                </figure>
              </button>
              <button
                onClick={() => {
                  if (categoryIndex < 1) {
                    setCategoryIndex(categoryData.length - 1);
                  } else {
                    setCategoryIndex(categoryIndex - 1);
                  }
                }}
                className={` ${theme === "light" ? "bg-stone-300" : "bg-stone-700"} absolute left-2 top-[260px] z-10 w-10 rounded-full py-1 text-2xl font-extrabold xl:left-16`}
              >
                &#10094;
              </button>
              <button
                onClick={() => {
                  if (categoryIndex >= categoryData.length - 1) {
                    setCategoryIndex(0);
                  } else {
                    setCategoryIndex(categoryIndex + 1);
                  }
                }}
                className={` ${theme === "light" ? "bg-stone-300" : "bg-stone-700"} absolute right-2 top-[260px] z-10 w-10 rounded-full py-1 text-2xl font-extrabold xl:right-16`}
              >
                &#10095;
              </button>

              <div className="relative mx-auto max-w-4xl py-6">
                {/* Header */}
                <div className="m-auto mb-6 flex items-center justify-between">
                  <h2 className="m-auto text-lg font-bold md:text-xl">
                    Product Preview
                  </h2>
                </div>
                {/* details section */}
                <div className="flex flex-col sm:flex-row">
                  {/* image plus thumbnails */}
                  <div className="w-[100%] sm:w-1/2">
                    <motion.img
                    initial={{opacity: 0, y: 50}}
                    animate={{opacity: 1, y: 0}}
                    transition={{type: "spring", stiffness: 80}}
                      src={viewDetails.image}
                      alt={viewDetails.name}
                      key={categoryIndex}
                      className={`relative mx-auto h-[275px] w-[97%] rounded-xl object-cover sm:h-[300px]`}
                    />
                    <div className="mt-7 flex w-[100%] items-center justify-center space-x-4 sm:w-[220%] md:w-[200%]">
                      {[
                        categoryData[prevIndex],
                        categoryData[categoryIndex],
                        categoryData[nextIndex],
                      ].map((i) => (
                        <motion.div
                          key={i.id}
                          className={` ${i.id === viewDetails.id ? "rounded border border-neutral-400" : "h-20 w-20"} transition-all ${flicker} `}
                        >
                          <img
                            src={i.image}
                            alt={i.name}
                            className={`rounded ${i.id === viewDetails.id ? "m-1 h-20 w-20" : "h-full w-full"} object-cover`}
                          />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  <div className="w-[100%] sm:w-[60%] md:w-1/2">
                    <motion.div 
                      initial={{opacity: 0, x: 50}}
                    animate={{opacity: 1, x: 0}}
                    transition={{type: "spring", stiffness: 80}}
                    key={categoryIndex}
                    className="plain-glass relative m-auto mt-3 max-h-[320px] min-h-[310px] w-[97%] space-y-2 overflow-auto rounded-xl px-2 pt-2 sm:mt-0 sm:h-[300px] md:space-y-1 md:px-4">
                      <div className="space-y-2 md:space-y-1">
                        <h3 className="font-semibold md:text-2xl">
                          {viewDetails.name}
                        </h3>
                        <div
                          className={`text-sm ${flicker} bg-[rgba(185, 178, 178, 0.1)] rounded p-1 backdrop-blur-[10px] sm:h-20`}
                        >
                          {viewDetails.description}
                        </div>
                        <p className="text-sm md:text-xl">
                          ${viewDetails.price.toFixed(2)}
                        </p>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span className="text-cta mb-1 md:text-3xl">★</span>
                        <span className={`${flicker} ml-2 text-sm`}>
                          {viewDetails.rating.toFixed(1)} Stars
                        </span>
                      </div>

                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-2 text-sm">
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
                      <div className="flex items-center justify-between pb-1">
                        <button
                          onClick={() =>
                            setNewCart({
                              id: viewDetails.id,
                              name: viewDetails.name,
                              category: viewDetails.category,
                              quantity: quantity,
                              price: viewDetails.price,
                              image: viewDetails.image,
                            })
                          }
                          className="rounded bg-orange-500 px-4 py-2 text-sm backdrop-blur-[10px] transition duration-200 hover:bg-transparent"
                        >
                          Add to Cart
                        </button>
                        <button
                          onClick={() => handleBuyNow()}
                          className="bg-[rgba(185, 178, 178, 0.1)] rounded px-4 py-2 text-sm backdrop-blur-[10px] transition duration-200 hover:bg-orange-500"
                        >
                          Buy Now
                        </button>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

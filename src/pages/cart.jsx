import {  useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../store";
import { motion, AnimatePresence } from "motion/react"; //AnimatePresence enables the animation of components that have been removed from the tree.
                                                        //When adding/removing more than a single child, every child must be given a unique key prop.

export default function Cart() {
    const { cart, setNewCart, removeCart, setCheckoutData, checkoutData, isOrderFromCart, setIsOrderFromCart } = useStore();

  const navigate = useNavigate()
  const increaseQuantity = (id, delta) => {
    const existingItem = cart.find((i) => i.id === id)
setNewCart({...existingItem, quantity: delta})
  };

  const decreaseQuantity = (id, delta) => {
    const existingItem = cart.find((i) => i.id === id)
setNewCart({...existingItem, quantity: delta})
  };


  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const shipping = subtotal < 50 && cart.length > 0 ? 10 : 0;
  const tax = (subtotal * 0.15625)
  const total = (subtotal + shipping + tax)

  useEffect(
    ()=>{
      localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]
  )

  useEffect(
    ()=>{
      localStorage.setItem("isOrderFromCart", JSON.stringify(isOrderFromCart));
    }, [isOrderFromCart]
  )

  useEffect(
    ()=>{
      localStorage.setItem("checkoutData", JSON.stringify(checkoutData));
    }, [checkoutData]
  )

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
    className="mx-auto flex max-w-6xl flex-col gap-10 p-6 lg:flex-row">
      {/* Cart Items */}
      <button
onClick={()=>navigate(-1)}
                className="plain-glass absolute rounded-full px-3 py-2 text-[12px] font-semibold  "
              >
                  ✖
              </button>
      <div className="flex-1">
        <h2 className="mb-6 text-2xl w-full text-center font-semibold">Cart</h2>
        <div className="space-y-2 overflow-y-scroll max-h-[360px] lg:h-96">
          {cart.length === 0 ? (<div className="flex lg:h-full h-[300px] items-center justify-center text-3xl md:text-5xl lg:text-6xl text-black/20 w-full rounded-lg plain-glass py-4 pr-2">Empty cart</div>)
          : 
          <AnimatePresence mode="sync">
          {cart.map((item) => (
            <motion.div
              key={item.id}
              className="flex text-sm md:text-base items-center justify-between rounded-lg plain-glass py-4 pr-2"
              initial={{ opacity: 1 }}
               animate={{ opacity: 1 }}
                exit={{ opacity: 0, x: -300 }}
                transition={{ duration: 0.3 }}
            >
              <div >
              <img
                src={item.image}
                alt={item.name}
                className="h-14 w-14 rounded object-cover"
              />
                <button
                onClick={() => removeCart(item.id)}
                className="ml-4 text-red-500"
              >
              ✖
              </button>
              </div>
              <div className="flex-1 px-4">
                <h4 className="font-semibold">{item.name}</h4>
                <p className=" text-gray-600">{item.category}</p>
              </div>
              <div > 
                <p className="w-16 mb-1 text-right font-semibold">
                 ${(item.price * item.quantity).toFixed(2)}
                </p>
                <div className="flex w-24 items-center justify-center gap-2">
                  <button
                  disabled={item.quantity === 1}
                    onClick={() => decreaseQuantity(item.id, -1)}
                    className="bg-[rgba(185, 178, 178, 0.1)] rounded px-2 py-1 backdrop-blur-[10px] transition duration-200"
                  >
                    −
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => increaseQuantity(item.id, 1)}
                    className="bg-[rgba(185, 178, 178, 0.1)] rounded px-2 py-1 backdrop-blur-[10px] transition duration-200"
                  >
                    +
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
          </AnimatePresence>
          }
          
        </div>
        <p className="mt-4 text-xs text-gray-500">
          Free shipping for all orders over $50
        </p>
      </div>


      {/* Summary */}
      <div className="h-fit plain-glass w-full rounded p-4 lg:h-[415px] lg:w-80">
        <h3 className="mb-4 text-lg font-semibold">Cart Summary</h3>
        <div className="flex flex-col justify-between lg:h-80">
          <div className=" ">
            <div className="mb-2 flex justify-between text-sm">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="mb-2 flex justify-between text-sm">
              <span>Shipping</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
            <div className="mb-2 flex justify-between text-sm">
              <span>Tax</span>
              <span>${tax.toFixed(2)}</span>
            </div>
          </div>
          <div className="border-t border-black">
            <div className="flex justify-between border-t pt-2 text-base font-bold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
           {cart.length > 0 && <button
           onClick={()=> {
            navigate('/checkout')
            setIsOrderFromCart(true)
            setCheckoutData([subtotal, shipping, tax, total])
          }}
           className="mt-4 w-full text-dark bg-orange-500 text-sm md:text-base backdrop-blur-[10px] transition duration-200 rounded py-2 ">
              Checkout  
            </button>}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

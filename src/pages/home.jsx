import  { useState } from "react";
import { useStore } from "../store";
import { NavLink } from "react-router-dom";
import { motion } from "motion/react";

export default function Home() {
  const { theme } = useStore();

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);

  const handleSubmit = () => {
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError(
        <div
          className={`m-auto w-fit ${theme === "light" ? "brand-color" : "white-brand"} rounded-lg p-2`}
        >
          <span className="text-red-600">❌</span> Please enter a valid email
          address
        </div>,
      );
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 5000);
    } else {
      setError(
        <div
          className={`m-auto w-fit ${theme === "light" ? "brand-color" : "white-brand"} rounded-lg p-2`}
        >
          <span className="text-green-600">✔</span> Subscribed successfully
        </div>,
      );
      setEmail("");
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
        setError("");
      }, 5000);
    }
  };

  return (
    <div>
      <motion.section 
      initial={{
        opacity: 0,
        x: -100
      }}
      animate={{
        opacity: 1,
        x: 0,
        transition: {
          duration: 0.7,
          delay: 0.6
        }
      }}
      className=" -mb-3 -mt-3 px-6 md:px-4">
        <div className="container mx-auto flex flex-col-reverse items-center justify-between py-5 lg:flex-row lg:px-1 xl:px-16 2xl:px-48">
          <div className="max-w-sm text-center sm:max-w-xl lg:w-1/2 lg:text-left">
            <h1 className="text-2xl font-bold sm:text-4xl lg:text-5xl xl:max-w-lg">
              Savour each M<span className="text-xl sm:text-2xl md:text-3xl">🍊</span>ment
              Sip By Sip
            </h1>
            
            <p className="mt-4 text-sm sm:text-lg mb:text-xl lg:mb-16 lg:mt-10">
              Delicious vegetarian softdrink, crafted with fresh ingredients to
              bring back the flavours you love🍹.
            </p>
            <div className="mt-6 lg:mb-20 xl:mb-28">
              <NavLink to="/products">
                <button className="swelling-hover cursor-pointer rounded-lg px-6 py-3 font-semibold shadow-lg md:text-xl lg:ml-8">
                  Shop now
                </button>
              </NavLink>
            </div>
          </div>
          <div className="relative lg:w-1/2">
            <img
              src="/images/floating orange.png"
              className="bounce1 absolute w-1/4 max-w-40"
            />
            <img
              src="/images/hero.png"
              className="m-auto w-2/3 max-w-md lg:max-w-none"
            />
            <img
              src="/images/floating avocado.png"
              className="bounce2 absolute bottom-3 right-3 w-1/4 max-w-40"
            />
          </div>
        </div>
      </motion.section>
      <section 
      className={`py-20 text-dark rounded-t-xl -z-10 text-center ${theme === "light" ? "bg-[#171511]" : "bg-[#2a2926]"}`}>
        <motion.div 
          initial={{
          opacity: 0,
          marginTop: "20px"
        
        }}/* when using viewport in framer motion, always remember to set the initial prop because if there is no initial prop, "once: true," will not work */
        whileInView={{
          opacity: 1,
          marginTop: "0px"
        }}
        transition={{
          duration: 0.5
        }}
        viewport={{
          once: true,
          amount: 'all', //don't go below 0.3 and don't use any of the text values 
        }}
        className="text-3xl font-bold sm:text-4xl lg:text-3xl">
          Our Values
        </motion.div>
        <div className="m-auto mt-10 grid max-w-6xl grid-cols-1 gap-8 px-8 md:grid-cols-2 md:gap-12 lg:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 40 }}/* when using viewport in framer motion, always remember to set the initial 
            prop because if there is no initial prop, "once: true," will not work */
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        viewport={{ once: true, amount: 0.3, //don't go below 0.3 and don't use any of the text values 
        }}
            className={`mx-auto max-w-96 py-12 md:h-72 md:max-h-96 lg:h-auto lg:max-h-none ${theme === "light" ? "glass" : "glass-tiles"} rounded-xl p-6 shadow-lg`}
          >
            <div className="transition-all duration-[0.5s] hover:-translate-y-4">
              <h3 className="text-cta text-xl font-semibold md:text-2xl">
                Fresh Ingredients, Timeless Taste
              </h3>
              <p className="mt-2">
                At Seasoned Fireworks, we believe that great taste starts with
                great ingredients. Our vegetarian soft drinks are made with
                fresh, natural ingredients, carefully blended to give you a sip
                of nolstagia with every bottle.
              </p>
            </div>
          </motion.div>
          <motion.div
          initial={{ opacity: 0, y: 40 }}/* when using viewport in framer motion, always remember to set the initial 
            prop because if there is no initial prop, "once: true," will not work */
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        viewport={{ once: true, amount: 0.3, //don't go below 0.3 and don't use any of the text values 
        }}
            className={`mx-auto max-w-96 py-12 md:h-72 md:max-h-96 lg:h-auto lg:max-h-none ${theme === "light" ? "glass" : "glass-tiles"} rounded-xl p-6 shadow-lg`}
          >
            <div className="transition-all duration-[0.5s] hover:-translate-y-4">
              <h3 className="text-cta text-xl font-semibold md:text-2xl">
                For Women, By Women
              </h3>
              <p className="mt-2">
                We celebrate the strength, elegance and vibrance of women
                everywhere. Our drinks are crafted with you in mind --
                interesting, energizing, and full of character
              </p>
            </div>
          </motion.div>
          <motion.div
          initial={{ opacity: 0, y: 40 }}/* when using viewport in framer motion, always remember to set the initial 
            prop because if there is no initial prop, "once: true," will not work */
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        viewport={{ once: true, amount: 0.3, //don't go below 0.3 and don't use any of the text values 
        }}
            className={`mx-auto max-w-96 py-12 md:col-span-2 md:h-72 md:max-h-96 lg:col-auto lg:h-auto lg:max-h-none ${theme === "light" ? "glass" : "glass-tiles"} rounded-xl p-6 shadow-lg`}
          >
            <div className="transition-all duration-[0.5s] hover:-translate-y-4">
              <h3 className="text-cta text-xl font-semibold md:text-2xl">
                A Colourful Experience
              </h3>
              <p className="mt-2">
                Every drink we make is designed to light up your day. Whether
                you're reminiscing about the good old days, or making new
                memories, every sip is fireworks 🎉.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
      <motion.section
      initial={{ opacity: 0, y: 40 }}/* when using viewport in framer motion, always remember to set the initial 
            prop because if there is no initial prop, "once: true," will not work */
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        viewport={{ once: true, amount: 0.3, //don't go below 0.3 and don't use any of the text values 
        }}
      >
        <div className={`relative ${theme === "light" ? "header-color" : ""} m-auto w-full px-8 py-12 text-center`}>
          <h2 className="mb-4 text-2xl font-bold md:text-3xl">
            Join our weekly newsletter
          </h2>
          <p className="mb-6">
            Be the first to catch exciting offers and exclusive updates 🧨
          </p>
          <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full ${theme === "light" ? "base-color" : "glass-tiles"} rounded-lg px-4 py-3 focus:outline-none md:w-1/3 md:max-w-xl`}
            />
            <button
              onClick={handleSubmit}
              className="swelling-hover rounded-lg px-6 py-3 font-bold shadow-md"
            >
              Submit
            </button>
          </div>
          <div
            className={`absolute left-1 right-1 mt-3 transition-all duration-300 ${showError ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"}`}
          >
            {error}
          </div>
        </div>
      </motion.section>
    </div>
  );
}

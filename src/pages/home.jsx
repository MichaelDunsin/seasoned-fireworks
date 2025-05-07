import React, { useState} from "react";
import { useStore } from "../store";
import { NavLink } from "react-router-dom";

export default function Home() {
  const { theme } = useStore();

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);

  const handleSubmit = () => {
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError(<div className={`w-fit m-auto ${theme === "light" ? "brand-color" : "white-brand"} rounded-lg p-1`}><span className="text-red-600">❌</span> Please enter a valid email address</div>);
      setShowError(true)
      setTimeout(() => {
      setShowError(false)
    }, 5000)
    } else {
      setError(<div className={`w-fit m-auto ${theme === "light" ? "brand-color" : "white-brand"} rounded-lg p-1`}><span className="text-green-600">✔</span> Subscribed successfully</div>);
      setEmail("");
      setShowError(true)
      setTimeout(() => {
      setShowError(false)
      setError("")
    }, 5000)
    }
  };

  return (
    <div>
      <section>
        <div className="container mx-auto flex flex-col-reverse items-center justify-between py-5 lg:px-1 xl:px-16 2xl:px-48 lg:flex-row">
          <div className="max-w-sm text-center sm:max-w-xl lg:w-1/2 lg:text-left">
            <h1 className="text-3xl font-bold sm:text-4xl lg:text-5xl xl:max-w-lg">
              Savour each M<span className="text-xl sm:text-3xl">🍊</span>ment
              Sip By Sip
            </h1>-
            <p className="mt-4 text-lg sm:text-xl lg:mb-16 lg:mt-10">
              Delicious vegetarian softdrink, crafted with fresh ingredients to
              bring bact the flavours you love🍹.
            </p>
            <div className="mt-6 lg:mb-20 xl:mb-28">
            <NavLink to="/products">
              <button
                className="swelling-hover cursor-pointer rounded-lg px-6 py-3 font-semibold shadow-lg md:text-xl lg:ml-8"
              >
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
      </section>
      <section className=" py-20 text-center">
        <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
          Our Values
        </h2>
        <div className="m-auto mt-10 grid max-w-6xl grid-cols-1 gap-8 px-8 md:grid-cols-2 md:gap-12 lg:grid-cols-3">
          <div
            className={`mx-auto max-w-96 py-12 md:h-72 md:max-h-96 lg:h-auto lg:max-h-none ${theme === "light" ? "glass" : "glass-tiles"} rounded-xl p-6 shadow-lg`}
          >
        <div className=" hover:scale-105 transition-all duration-700">
            <h3 className="text-cta text-xl font-semibold md:text-2xl">
              Fresh Ingredients, Timeless Taste
            </h3>
            <p className="mt-2">
              At Seasoned Fireworks, we believe that great taste starts with
              great ingredients. Our vegetarian soft drinks are made with fresh,
              natural ingredients, carefully blended to give you a sip of
              nolstagia with every bottle.
            </p>
            </div>
          </div>
          <div
            className={`mx-auto max-w-96 py-12 md:h-72 md:max-h-96 lg:h-auto lg:max-h-none ${theme === "light" ? "glass" : "glass-tiles"} rounded-xl p-6 shadow-lg`}
          >
        <div className=" hover:scale-105 transition-all duration-700">
            <h3 className="text-cta text-xl font-semibold md:text-2xl">
              For Women, By Women
            </h3>
            <p className="mt-2">
              We celebrate the strength, elegance and vibrance of women
              everywhere. Our drinks are crafted with you in mind --
              interesting, energizing, and full of character
            </p>
            </div>
          </div>
          <div
            className={`mx-auto max-w-96 py-12 md:col-span-2 md:h-72 md:max-h-96 lg:col-auto lg:h-auto lg:max-h-none ${theme === "light" ? "glass" : "glass-tiles"} rounded-xl p-6 shadow-lg `}
          >
        <div className=" hover:scale-105 transition-all duration-700">
            <h3 className="text-cta text-xl font-semibold md:text-2xl">
              A Colourful Experience
            </h3>
            <p className="mt-2">
              Every drink we make is designed to light up your day. Whether
              you're reminiscing about the good old days, or making new
              memories, every sip is fireworks 🎉.
            </p>
            </div>
          </div>
        </div>
      </section>
      <section>
      <div className="  relative w-full m-auto rounded-xl py-12 px-6 text-center">
      <h2 className="text-2xl  md:text-3xl font-bold mb-4">Join our weekly newsletter</h2>
      <p className="mb-6">Be the first to catch exciting offers and exclusive updates 🧨</p>
      <div className="flex flex-col md:flex-row justify-center items-center gap-4">
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`w-full ${theme === "light" ? "glass" : "glass-tiles"} md:w-1/3 md:max-w-xl px-4 py-3 rounded-lg focus:outline-none`}
        />
        <button 
        onClick={handleSubmit}
        className="swelling-hover font-bold px-6 py-3 rounded-lg shadow-md ">
          Submit
        </button> 
      </div>
       <div
     className={` mt-3 left-1 right-1 absolute transition-all duration-300 ${showError ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}
      >{error}</div>
    </div>
      </section>
    </div>
  );
}

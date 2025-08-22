import React from "react"
import { motion } from "motion/react";

export default function Contact(){

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
      <section className="text-center px-5 pt-10">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-4">Get In Touch With Us</h1>
      </section>

      <section className="container overflow-x-hidden mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-20">
        <motion.div 
          initial={{
        opacity: 0,
        x: -60
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
         transition={{duration: 0.3, ease: "easeInOut"}}
        className=" p-5 rounded-3xl glass-tiles">
          <h3 className="text-2xl font-semibold m-4">Customer Support</h3>
          <div className="flex items-center text-sm">
            <img className=" filter-cta w-12 h-12" src="/images/customer line.webp"/>
            <div className=" pl-6">
            <p className="mb-1 font-semibold">Customer Line :</p>
            <p className="text-sm">+44 7412 345678</p>
            </div>
          </div>
          <div className="flex md:mt-8 mt-3 items-center text-sm">
            <img className=" filter-cta w-12 h-12" src="/images/email.webp"/>
            <div className=" pl-6">
            <p className="mb-1 font-semibold">Email Address :</p>
            <p className="text-sm">drinks@seasoned fireworks.com</p>
            </div>
          </div>
          <div className="flex md:mt-8 mt-3 items-center text-sm">
            <img className=" filter-cta w-12 h-12" src="/images/location.webp"/>
            <div className=" pl-6">
            <p className="mb-1 font-semibold">HQ Address :</p>
            <p className="text-sm">Seasoned Fireworks Ltd. 32 Brookfield Road, United Kingdom</p>
            </div>
          </div>
        </motion.div>
         <motion.div 
          initial={{
        opacity: 0,
        x: 60
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
        transition={{duration: 0.3, ease: "easeInOut"}}
        className=" p-5 rounded-3xl glass-tiles">
          <h3 className="text-2xl font-semibold m-4">Socials</h3>
          <div className="flex items-center text-sm">
            <img className=" filter-cta w-12 h-12" src="/images/instagram.webp"/>
            <div className=" pl-6">
            <p className="mb-1 font-semibold">Instagram :</p>
            <p className="text-sm">@seasoned.fx</p>
            </div>
          </div>
          <div className="flex md:mt-8 mt-3 items-center text-sm">
            <img className=" filter-cta w-12 h-12" src="/images/twitter.webp"/>
            <div className=" pl-6">
            <p className="mb-1 font-semibold">Twitter/X :</p>
            <p className="text-sm ">@SeasonedFireworksLtd</p>
            </div>
          </div>
          <div className="flex md:mt-8 mt-3 items-center text-sm">
            <img className=" filter-cta w-12 h-12" src="/images/facebook.webp"/>
            <div className=" pl-6">
            <p className="mb-1 font-semibold">Facebook :</p>
            <p className="text-sm">facebook.com/ SeasonedFireworks</p>
            </div>
          </div>
        </motion.div>
      </section>

      <div className=" mx-4 h-64 ">
        <iframe 
          src="https://www.google.com/maps?q=London+Eye,+London,+UK&output=embed"
          width="100%"
          height="100%"
          className="border-0 w-full h-full rounded-xl"
          allowFullScreen=""
          loading="lazy"
          title="Location Map"
        ></iframe>
      </div>
</motion.div>
)
};

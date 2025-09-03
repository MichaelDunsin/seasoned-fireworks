import React from "react"

export default function LogoAndName(){

return (
    <div
    id="logo&namewrapper"
    className="flex w-20 justify-between sm:w-24 md:w-32"
  >
    <img
      src="/images/logo-large.webp"
      className="-ml-5 md:-ml-8 h-max w-max scale-[1.7] pt-2"
      alt="logo"
    />
    <b className=" font-logo -ml-5 pt-4 sm:-ml-6 md:pt-6 md:-ml-8 sm:text-sm">
      Seasoned Fireworks
    </b>
  </div>
)
};


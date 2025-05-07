import React from "react"

export default function LogoAndName(){

return (
    <div
    id="logo&namewrapper"
    className="flex w-20 justify-between sm:w-36"
  >
    <img
      src="/images/logo.png"
      className="-ml-5 md:-ml-8 scale-150 pt-2"
    />
    <b className=" font-logo -ml-5 pt-4 sm:-ml-6 md:pt-6 md:-ml-8 sm:text-sm">
      Seasoned Fireworks
    </b>
  </div>
)
};


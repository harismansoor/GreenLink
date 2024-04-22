import React from 'react'
import BG from "../assets/bg.png";

const HeroSection = () => {
  return (
    <div>
        
          {/* Cover */}
      <div className="mt-8 flex-col overflow-hidden relative flex min-h-[450px] w-full px-20 py-12 items-start max-md:max-w-full max-md:px-5">
        <img
          src={BG}
          className="absolute h-full w-full object-cover object-center inset-0"
        />
        <div className="relative text-white text-5xl font-bold uppercase max-w-[612px] mt-12 max-md:max-w-full max-md:text-4xl max-md:mt-10">
          Enhancing Supply
          <br />
          Chain Transparency
          <br />
          through Blockchain
        </div>
        <div className="transition-transform transform-gpu hover:-translate-y-1 cursor-pointer hover:shadow-lg relative text-lime-400 text-base font-semibold leading-4 whitespace-nowrap justify-center items-stretch shadow-sm bg-white mt-8 mb-14 px-6 py-4 rounded-lg max-md:ml-0.5 max-md:mb-10 max-md:pr-5">
          <a href="#learn-more">Learn More</a>
        </div>
      </div>

     
    </div>
  )
}

export default HeroSection
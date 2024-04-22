import Logo from "../assets/GreenLink.png";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import HeroSection from "../components/herosection";
import LearnMore from "../components/LearnMore";

function Home() {
  return (
    <div className=" flex flex-col font-montserrat">
      <HeroSection />
      {/* Learn More */}
      <section id="learn-more" className="flex flex-col">
        <LearnMore />
      </section>
      {/* Stats */}
      <div className="bg-lime-400 self-stretch flex w-full flex-col justify-center items-center mt-36 px-16 py-10 max-md:max-w-full max-md:mt-10 max-md:px-5">
        <div className="flex w-full max-w-[1280px] items-stretch justify-between gap-5 max-md:max-w-full max-md:flex-wrap">
          <div className="text-center text-6xl font-bold grow shrink basis-auto max-md:text-4xl">
            <span className="text-white">25</span>
            <div className="text-white text-xl mt-5">
              Organic Farms Affiliated
            </div>
          </div>
          <div className=" text-center text-6xl font-bold max-md:text-4xl">
            <span className="text-white">250</span>
            <div className=" text-white text-xl mt-5">Traces made</div>
          </div>
          <div className="text-center text-6xl font-bold grow shrink basis-auto self-start max-md:text-4xl">
            <span className="text-white">75</span>
            <div className=" text-xl text-white mt-5">
              Cups of Coffee Consumed
            </div>
          </div>
        </div>
      </div>

      {/* Trace now */}
      <img
        loading="lazy"
        srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/a758cc3e24aaa4f5e4eaa3909cd1502d6ee0be502e513f51b6e00916c003b1db?apiKey=3057031b0bd84e409b949a9462a13b45&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/a758cc3e24aaa4f5e4eaa3909cd1502d6ee0be502e513f51b6e00916c003b1db?apiKey=3057031b0bd84e409b949a9462a13b45&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/a758cc3e24aaa4f5e4eaa3909cd1502d6ee0be502e513f51b6e00916c003b1db?apiKey=3057031b0bd84e409b949a9462a13b45&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/a758cc3e24aaa4f5e4eaa3909cd1502d6ee0be502e513f51b6e00916c003b1db?apiKey=3057031b0bd84e409b949a9462a13b45&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/a758cc3e24aaa4f5e4eaa3909cd1502d6ee0be502e513f51b6e00916c003b1db?apiKey=3057031b0bd84e409b949a9462a13b45&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/a758cc3e24aaa4f5e4eaa3909cd1502d6ee0be502e513f51b6e00916c003b1db?apiKey=3057031b0bd84e409b949a9462a13b45&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/a758cc3e24aaa4f5e4eaa3909cd1502d6ee0be502e513f51b6e00916c003b1db?apiKey=3057031b0bd84e409b949a9462a13b45&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/a758cc3e24aaa4f5e4eaa3909cd1502d6ee0be502e513f51b6e00916c003b1db?apiKey=3057031b0bd84e409b949a9462a13b45&"
        className="aspect-[1.09] object-contain object-center w-[120px] overflow-hidden self-center max-w-full mt-40 max-md:mt-10"
      />
      <div
        className="text-white 
      cursor-pointer 
      bg-gradient-to-br from-lime-00 to-lime-600 
      shadow-xl 
      hover:bg-gradient-to-br hover:from-lime-300 hover:to-lime-400 
      text-xl 
      font-semibold 
      leading-9 
      whitespace-nowrap 
      bg-lime-400 
      self-center 
      w-[300px] 
      max-w-full 
      justify-center 
      items-center 
      mt-12 
      px-[75px]
      py-2 
      rounded-[84px] 
      max-md:mt-10 
      max-md:px-5"
      >
        <Link to="/login">TRACE NOW!</Link>
      </div>
    </div>
  );
}
export default Home;

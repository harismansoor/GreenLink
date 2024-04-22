import logo from "../assets/GreenLink.png";
export default function Footer() {
  return (
    <div className="bg-white self-stretch flex w-full flex-col items-stretch mt-48 pt-12 pb-8 px-20 border-t-black border-t-opacity-20 border-t border-solid max-md:max-w-full max-md:mt-10 max-md:px-5">
      <div className="max-md:max-w-full max-md:mr-2.5">
        <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
          <div className="flex flex-col items-stretch w-[37%] max-md:w-full max-md:ml-0">
            <div className="flex flex-col mt-6 items-start max-md:mt-10">
              <img
                loading="lazy"
                src={logo}
                className="aspect-[4.83] object-contain object-center w-[198px] overflow-hidden max-w-full ml-3.5 max-md:ml-2.5"
              />
              <div className="text-neutral-400 text-base self-stretch mt-6">
                The Hong Kong Polytechnic
                <br />
                University, Hung Hom
                <br />
                20081671D COMP
              </div>
            </div>
          </div>
          <div className="flex flex-col items-stretch w-2/5 ml-5 max-md:w-full max-md:ml-0">
            <div className="flex grow items-stretch justify-between gap-5 pr-20 max-md:mt-10 max-md:pr-5">
              <div className="flex flex-col items-stretch">
                <div className="text-neutral-400 text-base font-medium whitespace-nowrap">
                  Links
                </div>
                <div className="text-black text-base font-medium whitespace-nowrap mt-16 max-md:mt-10">
                  <a href="">Home</a>
                </div>
                <div className="text-black text-base font-medium whitespace-nowrap mt-14 max-md:mt-10">
                  <a href="">Sign Up</a>
                </div>
                <div className="text-black text-base font-medium whitespace-nowrap mt-14 max-md:mt-10">
                  <a href="">Log In</a>
                </div>
                <div className="text-black text-base font-medium whitespace-nowrap mt-14 max-md:mt-10">
                  <a href="">About</a>
                </div>
              </div>
              <div className="flex flex-col items-stretch self-start">
                <div className="text-neutral-400 text-base font-medium">
                  Help
                </div>
                <div className="text-black text-base font-medium mt-16 max-md:mt-10">
                  Contact
                </div>
                <div className="text-black text-base font-medium mt-14 max-md:mt-10">
                  Inquiry
                </div>
                <div className="text-black text-base font-medium whitespace-nowrap mt-14 max-md:mt-10">
                  Privacy Policies
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-stretch w-[23%] ml-5 max-md:w-full max-md:ml-0">
            <div className="flex flex-col items-stretch max-md:mt-10">
              <div className="text-neutral-400 text-base font-medium">
                Newsletter
              </div>
              <div className="text-neutral-400 text-sm whitespace-nowrap mt-16 max-md:mt-10">
                Enter Your Email Address
              </div>
              <div className="bg-black shrink-0 h-px mt-2.5" />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-zinc-300 w-[1102px] shrink-0 max-w-full h-px mt-14 max-md:mr-2.5 max-md:mt-10" />
      <div className="text-black text-base mt-12 max-md:max-w-full max-md:mr-2.5 max-md:mt-10">
        2024 GreenLink. All rights reserved
      </div>
    </div>
  );
}

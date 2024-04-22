import Logo from "../assets/GreenLink.png";
import { Link } from "react-router-dom";

export default function Signup() {
  return (
    <>
      <div className="bg-white flex flex-col items-center signup">
        <div className=" bg-white flex w-full max-w-[900px] flex-col items-stretch mt-32 pb-0 rounded-3xl max-md:max-w-full max-md:mt-10">
          <div className="max-md:max-w-full">
            <div className="gap-1 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
              <div className="flex flex-col items-stretch w-6/12 max-md:w-full max-md:ml-0">
                <div className=" text-gray-400 text-xl font-bold leading-2 whitespace-nowrap bg-gray-100 hover:bg-gray-200 justify-center text-center items-center w-full pt-3 pb-3 rounded-3xl max-md:max-w-full max-md:px-5">
                  <span>
                    <Link to="/login">Log In</Link>
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-stretch w-6/12 max-md:w-full max-md:ml-0">
                <div className="text-white text-xl font-bold leading-2 whitespace-nowrap bg-lime-400 justify-center text-center items-center w-full pt-3 pb-3 rounded-3xl max-md:max-w-full max-md:px-5">
                  Sign Up
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center for-box-shadow">
              <form className="mt-8 rounded px-8 pt-6 pb-8 mb-4 w-[800px]">
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="username"
                  >
                    Email
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="username"
                    type="text"
                    placeholder="Username"
                  />
                </div>
                <div className="mb-2">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="password"
                    type="password"
                    placeholder="******************"
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="password"
                  >
                    Confirm Password
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="cpassword"
                    type="cpassword"
                    placeholder="******************"
                  />
                </div>
              </form>
            </div>
          </div>
          <div className="text-white text-center text-xl font-semibold leading-6 bg-lime-400 self-center w-[200px] max-w-full justify-center items-center mt-2 px-8 py-4 rounded-[84px] max-md:mt-10 max-md:px-5 hover:bg-lime-500">
            <span>
              <Link to="/dashboard">Submit</Link>
            </span>
          </div>
        </div>
      </div>
      ;
    </>
  );
}

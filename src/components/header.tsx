import React, { useEffect } from "react";
import Logo from "../assets/GreenLink.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import user_icon from "../assets/user_icon.webp";
import cartimg from "../assets/cart.png";
import { useCart } from "../cartContext";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    getTotalQuantity,
    quantity,
  } = useCart();

  useEffect(() => {
    console.log(quantity);
  }, [quantity]);
  return (
    <div className="bg-white flex flex-col  font-montserrat header-main">
      {/* top bar */}
      <div className="self-center flex w-full max-w-[1195px] items-stretch justify-between gap-5 max-md:max-w-full max-md:flex-wrap">
        <div className="flex items-stretch justify-between gap-5 px-5">
          <img
            onClick={() => {
              navigate("/");
            }}
            loading="lazy"
            src={Logo}
            className="object-contain object-center w-[180px] overflow-hidden cursor-pointer shrink-0 max-w-full ml-[-60px]"
          />
          <div
            className={
              location.pathname == "/seller"
                ? "d-none"
                : "rounded-md px-3.5 py-2 m-1 ml-8 overflow-hidden border-[1px] font-medium border-gray-400 text-gray-400"
            }
          >
            {location.pathname == "/sellerportal" ? (
              <span>Seller Portal</span>
            ) : (
              <span>Customer Portal</span>
            )}
          </div>
          <Link
            to="/dashboard"
            className={
              location.pathname == "/" || location.pathname == "/dashboard"
                ? "d-none"
                : ""
            }
          >
            <div className="rounded-md px-3.5 py-2 m-1 ml-8 overflow-hidden border-[1px] font-medium border-gray-400 text-gray-400">
              GreenLink Market
            </div>
          </Link>
        </div>
        {/* login signup buttons */}

        {location.pathname == "/dashboard" ||
        location.pathname == "/cart" ||
        location.pathname == "/profile" ||
        location.pathname == "/sellerportal" ? (
          <div className="flex items-stretch justify-between gap-5 self-start">
            <div
              className={
                location.pathname == "/sellerportal" ? "d-none" : "mt-[4px]"
              }
            >
              <span>
                <Link to="/cart" className="cart-link-redirection">
                  <div className="cart-quantity">{quantity?.totalQuantity}</div>
                  <img
                    loading="lazy"
                    src={cartimg}
                    className="aspect-[0.97] object-contain object-center w-[31px] fill-black shrink-0"
                  />
                </Link>
              </span>
            </div>
            <img
              onClick={() => {
                navigate("/profile");
              }}
              loading="lazy"
              src={user_icon}
              className="aspect-[1.28] object-contain object-center w-[50px] fill-black shrink-0"
            />
          </div>
        ) : (
          <div
            className={
              location.pathname == "/product-requested" ||
              location.pathname == "/login" ||
              location.pathname == "/signup"
                ? "d-none"
                : "flex items-stretch justify-between gap-5 self-start"
            }
          >
            <div className="text-[#87C467] text-base border-[0.1px] font-semibold leading-4 whitespace-nowrap shadow-sm bg-white grow justify-center items-stretch px-10 py-3.5 cursor-pointer rounded-lg max-md:px-5 hover:bg-gray-100">
              <span>
                <Link to="/login">Log In</Link>
              </span>
            </div>

            <div className="text-white text-base font-semibold leading-4 whitespace-nowrap shadow-sm bg-[#87C467] grow justify-center items-stretch px-9 py-3.5 cursor-pointer rounded-lg max-md:px-5 hover:bg-lime-400">
              <Link to="/signup">Sign up</Link>
            </div>
          </div>
        )}

        <ConnectButton />
      </div>
    </div>
  );
};

export default Header;

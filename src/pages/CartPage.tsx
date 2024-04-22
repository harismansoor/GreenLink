import { useEffect } from "react";
import cartImg from "../assets/cart.svg";
import img from "../assets/Images.png";
import { useCart } from "../cartContext";
const CartPage = () => {
  const {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    getTotalQuantity,
    quantity,
    placeOrder,
    orders,
  } = useCart();

  const handlePlaceOrder = () => {
    placeOrder();
    console.log("Order placed!");
  };

  useEffect(() => {
    console.log(cart);
  }, [cart]);
  useEffect(() => {
    console.log(orders);
  }, [orders]);
  return (
    <>
      <div className="container cart">
        <h6 className="text-center text-[40px] d-flex fw-semibold  justify-content-center align-items-center mt-5">
          Your Cart
          <img src={cartImg} alt="" className="img" />
        </h6>

        <div className="max-w-screen-lg m-auto mt-5">
          <p>Products</p>
          {localStorage.getItem("cart")?.length != undefined && (
            <p
              className="text-[13px] bg-[#87C467] w-fit text-white px-10 py-2 mb-2 cursor-pointer"
              onClick={() => {
                localStorage.removeItem("cart");
                window.location.reload();
              }}
            >
              Empty my cart
            </p>
          )}

          {localStorage.getItem("cart")?.length == undefined && (
            <h2>your cart is empty</h2>
          )}

          {cart &&
            cart.map((item, index) => {
              return (
                <>
                  <div className="  bg-grey order-wrapper d-flex justify-content-betweens  align-items-center gap-5">
                    <div className="prduct-img">
                      <img
                        className="product-image"
                        src={item.product.data.image}
                        alt=""
                      />
                    </div>
                    <div className="center w-1/3  px-5">
                      <ul>
                        <li className="d-flex align-items-end">
                          <p>{item.product.data.productName}</p>

                          <span className="ms-3 fw-semibold">12 items</span>
                        </li>
                        {/* <li className="fw-semibold">
                          date of order: <span>01/01/2024</span>
                        </li> */}
                        <li className="fw-semibold">
                          Quantity: <span>{item.quantity}</span>
                        </li>
                        <li>
                          Mansoor Enterprises <span>12 items</span>
                        </li>
                        {/* <li className="fw-semibold">
                          date of delivery: <span>N.A.</span>
                        </li> */}
                        <li>
                          GreenLink Organic Rating:{" "}
                          <span className="fw-semibold">9.8</span>
                        </li>
                      </ul>
                    </div>
                    <p className="text-[20px]">
                      HKD {item.product.data.sellingPrice}{" "}
                      <span className="text-[10px]">per 12 pieces</span>
                    </p>
                    <p className="text-[20px]">
                      Total HKD {item.product.data.sellingPrice * item.quantity}
                    </p>
                  </div>
                </>
              );
            })}

          <div className="d-flex justify-content-end mt-5 ">
            <div className="product-amount w-100 max-w-xs	">
              <div className="d-flex  items-center justify-between px-3 border-b-2 pb-3">
                <p className="text-sm">Total</p>
                <p className="text-green">HKD {quantity?.totalPrice}</p>
              </div>
              <p className="text-sm mt-3">
                Billing Information:{" "}
                <span className="text-green">404-76*************</span>{" "}
              </p>
              <button
                className="w-100 border-2 py-2 mt-4 rounded fw-semibold"
                onClick={handlePlaceOrder}
              >
                Place order
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartPage;

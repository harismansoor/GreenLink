import React, { useState, createContext, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// Step 1: Create a Context
// @ts-ignore
const CartContext = createContext();

// Step 2: Create a Context Provider
// @ts-ignore
export const CartProvider = ({ children }) => {
  const navigate = useNavigate();
  // @ts-ignore
  const initialCart = JSON.parse(localStorage.getItem("cart")) || [];
  // @ts-ignore
  const initialOrders = JSON.parse(localStorage.getItem("orders")) || [];

  const initialtotalquantity =
    // @ts-ignore
    JSON.parse(localStorage.getItem("totalquantity")) || [];

  const [cart, setCart] = useState(initialCart);
  const [quantity, setQuantity] = useState();
  const [orders, setOrders] = useState(initialOrders);
  // @ts-ignore
  const addToCart = (productData, quantityFromCart) => {
    // console.log("hlelo");

    // Your addToCart logic here
    const existingProductIndex = cart.findIndex(
      // @ts-ignore
      (cartItem) => cartItem.product.docId === productData.docId
    );

    if (existingProductIndex !== -1) {
      // Product already exists in cart, update its quantity
      // @ts-ignore
      setCart((prevCart) => {
        const updatedCart = [...prevCart];
        updatedCart[existingProductIndex].quantity += quantityFromCart;
        return updatedCart;
      });
    } else {
      // Product not found in cart, add it with initial quantity of 1

      // @ts-ignore
      setCart((prevCart) => [
        ...prevCart,
        { product: productData, quantity: quantityFromCart },
      ]);
    }
    toast("Added to cart successfully");
  };
  // @ts-ignore
  const removeFromCart = (productId) => {
    // Your removeFromCart logic here
  };
  // @ts-ignore
  const updateQuantity = (productId, newQuantity) => {
    // Your updateQuantity logic here
  };

  const getTotalQuantity = () => {
    let totalQuantity = 0;
    let totalPrice = 0;

    // Iterate over each product in the cart and sum up their quantities
    //@ts-ignore
    cart.forEach((productInfo) => {
      (totalQuantity += productInfo.quantity),
        (totalPrice +=
          Number(productInfo.quantity) *
          Number(productInfo.product.data.sellingPrice));
    });
    console.log({ totalQuantity: totalQuantity, totalPrice: totalPrice });
    setQuantity({ totalQuantity: totalQuantity, totalPrice: totalPrice });

    // return totalQuantity;
  };

  const placeOrder = () => {
    // setOrders((prevOrders) => [...prevOrders, ...cart]);
    // setCart([]);
    // localStorage.removeItem("cart");
    // localStorage.setItem("orders", JSON.stringify([...orders, ...cart]));
    // toast("Order placed successfully");

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    const hours = String(currentDate.getHours()).padStart(2, "0");
    const minutes = String(currentDate.getMinutes()).padStart(2, "0");
    const seconds = String(currentDate.getSeconds()).padStart(2, "0");

    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    const orderedProducts = cart.map((item) => ({
      ...item,
      orderDate: formattedDate,
    }));

    setOrders((prevOrders) => [...prevOrders, ...orderedProducts]);
    setCart([]);
    localStorage.setItem(
      "orders",
      JSON.stringify([...orders, ...orderedProducts])
    );
    localStorage.removeItem("cart");
    toast("Order placed successfully");
    navigate("/profile");
  };

  useEffect(() => {
    getTotalQuantity();
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        quantity,
        orders,
        placeOrder,
        addToCart,
        removeFromCart,
        updateQuantity,
        getTotalQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Step 3: Create a Custom Hook to use the Context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

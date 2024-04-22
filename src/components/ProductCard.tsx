import React, { useEffect, useState } from "react";
// import QuantitySelector from "./QuantitySelector";

interface Product {
  id: number;
  name: string;
  farmer: string;
  price: number;
  image: string;
}
interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [cart, setCart] = useState([]); // Initialize cart as an array of CartItem objects

  const addToCart = (productData) => {
    const existingProductIndex = cart.findIndex(
      (cartItem) => cartItem.product.id === productData.id
    );

    if (existingProductIndex !== -1) {
      // Product already exists in cart, update its quantity
      setCart((prevCart) => {
        const updatedCart = [...prevCart];
        updatedCart[existingProductIndex].quantity += 1;
        return updatedCart;
      });
    } else {
      // Product not found in cart, add it with initial quantity of 1
      setCart((prevCart) => [
        ...prevCart,
        { product: productData, quantity: 1 },
      ]);
    }
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) =>
      prevCart.filter((cartItem) => cartItem.product.id !== productId)
    );
  };

  const updateQuantity = (productId, newQuantity) => {
    // Handle negative quantities appropriately (e.g., remove product if quantity reaches 0)
    setCart((prevCart) => {
      const updatedCart = prevCart.map((cartItem) => {
        if (cartItem.product.id === productId) {
          return { ...cartItem, quantity: newQuantity };
        }
        return cartItem;
      });
      return updatedCart;
    });
  };
  const getTotalQuantity = () => {
    let totalQuantity = 0;

    // Iterate over each product in the cart and sum up their quantities
    Object.values(cart).forEach((productInfo) => {
      totalQuantity += productInfo.quantity;
    });
    console.log(totalQuantity);

    // return totalQuantity;
  };
  useEffect(() => {
    getTotalQuantity();
  }, [cart]);

  return (
    <div className="p-4 sm:w-1/2 lg:w-1/3">
      <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
        <img
          className="lg:h-72 md:h-48 w-full object-cover object-center"
          src={product.data.image}
          alt={product.data.productName}
        />
        <div className="p-6">
          <h1 className="text-3xl font-medium text-apple-300 mb-1">
            {product.data.productName}
          </h1>
          <h1 className="text-m font-semibold mb-3">{product.farmer}</h1>
          <p className="leading-relaxed mb-3">
            HKD {product.data.sellingPrice}{" "}
            <span className="text-[10px]"> / 12 pieces</span>
          </p>
          <div className="flex items-center flex-wrap hover:cursor-pointer">
            {/* <a className="text-black-300 inline-flex items-center md:mb-2 lg:mb-0">
              Read More
              <svg
                className="w-4 h-4 ml-2"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14"></path>
                <path d="M12 5l7 7-7 7"></path>
              </svg>
            </a> */}
            {/* <div className="ml-[70px]">
              <QuantitySelector />
            </div> */}
          </div>
          <div>
            {/* <button
              className="w-full h-10 bg-white text-black mt-4 rounded flex items-center justify-center shadow hover:bg-slate-100 hover:cursor-pointer"
              onClick={() => {
                addToCart(product.docId, product.data);
              }}
            >
              Add to Cart
            </button> */}
          </div>
          <button
            className="w-full h-10 bg-white text-black mt-4 rounded flex items-center justify-center shadow hover:bg-slate-100 hover:cursor-pointer"
            onClick={() => addToCart(product)} // Pass product data instead of docId
          >
            Add to Cart
          </button>
          {/* <button
            onClick={() =>
              updateQuantity(product.docId, productData.quantity - 1)
            }
          >
            -
          </button> */}
          <button onClick={() => removeFromCart(product.docId)}>Remove</button>
          <button
            onClick={() =>
              updateQuantity(product.docId, productData.quantity + 1)
            }
          >
            +
          </button>
        </div>
      </div>

      {Object.entries(cart).map(([productId, productInfo]) => (
        <div key={productId}>
          <h3>{productInfo.productData?.name}</h3>
          <p>Price: ${productInfo.productData?.price}</p>
          <p>Quantity: {productInfo?.quantity}</p>
          <button
            onClick={() => updateQuantity(productId, productInfo.quantity - 1)}
          >
            Decrease Quantity
          </button>
          <button
            onClick={() => updateQuantity(productId, productInfo.quantity + 1)}
          >
            Increase Quantity
          </button>
          <button onClick={() => removeFromCart(productId)}>
            Remove from Cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductCard;

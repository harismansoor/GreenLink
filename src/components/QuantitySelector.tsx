import { useState } from "react";

const QuantitySelector = () => {
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="flex items-center">
      <button
        className="bg-lime-500 text-white px-3 py-1 rounded-l focus:outline-none"
        onClick={handleDecrement}
      >
        -
      </button>
      <span className="bg-gray-100 px-3 py-1">{quantity}</span>
      <button
        className="bg-lime-500 text-white px-3 py-1 rounded-r focus:outline-none"
        onClick={handleIncrement}
      >
        +
      </button>
    </div>
  );
};

export default QuantitySelector;

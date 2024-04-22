import React, { useEffect, useState } from "react";
import { useCart } from "../cartContext";
import { Modal } from "react-bootstrap";
import barcode from "../assets/barcode.png";
import img from "../assets/Images.png";

const ProductList: React.FC = (props) => {
  //@ts-ignore
  const { myProdcuts } = props;
  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState();
  const [quantity, setQuantity] = useState(1);

  const handleModel = () => setShow(!show);

  //@ts-ignore
  const handleShowAddToCart = (product) => {
    console.log(product);
    setCurrentProduct(product);
    setShowModal(true);
  };

  //@ts-ignore
  const { cart, addToCart, removeFromCart, updateQuantity, getTotalQuantity } =
    useCart();
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart)); // Save cart to localStorage
  }, [cart]);
  useEffect(() => {
    console.log(currentProduct);
  }, [currentProduct]);

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <>
      <div className="flex items-center text-gray-600 w-[1080px]">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4">
            {myProdcuts.length > 0 &&
              //@ts-ignore
              myProdcuts.map((product, index) => (
                <div
                  className="p-4 sm:w-1/2 lg:w-1/3"
                  onClick={() => {
                    handleShowAddToCart(product);
                  }}
                >
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
                      <h1 className="text-m font-semibold mb-3">
                        {product.farmer}
                      </h1>
                      <p className="leading-relaxed mb-3">
                        HKD {product.data.sellingPrice}{" "}
                        <span className="text-[10px]"> / 12 pieces</span>
                      </p>
                      <div className="flex items-center flex-wrap hover:cursor-pointer"></div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      {/* modal for add to cart */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        className="modal-for-add-to-cart"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="main flex gap-4">
            <div className="left">
              <div className="addToCartImage">
                <img src={currentProduct?.data?.image} alt="" />
              </div>
            </div>
            <div className="right">
              <h2 className="font-bold capitalize">
                {currentProduct?.data?.productName}
              </h2>
              <h2 className="font-bold pt-2">
                HKD {currentProduct?.data?.sellingPrice}{" "}
                <span className="text-[12px]">/12 peices</span>
              </h2>
              <h3 className="text-[10px]">Producer: Mansoor Enterprise</h3>
              <h3 className="mt-2">
                Green Link Organic Rating:{" "}
                <span className="text-black font-bold">9.8</span>
              </h3>

              <div className="flex items-center gap-2 pt-2 pb-2">
                <div>
                  <p className="font-green text-[12px] text-[#87C467] ">
                    To read more about the farming practices, Scan the QR code
                  </p>
                </div>
                <div>
                  <img
                    onClick={handleModel}
                    src="../../assets/images/barcode.png"
                    alt=""
                  />
                </div>
              </div>

              <div className="flex items-center">
                <button
                  className="bg-[#87C467] text-white px-3 py-1 rounded-l focus:outline-none"
                  onClick={handleDecrement}
                >
                  -
                </button>
                <span className="bg-gray-100 px-3 py-1">{quantity}</span>
                <button
                  className="bg-[#87C467] text-white px-3 py-1 rounded-r focus:outline-none"
                  onClick={handleIncrement}
                >
                  +
                </button>
              </div>

              <button
                className="bg-[#87C467] mt-2 text-white px-4 py-2 rounded-full font-bold text-[14px]"
                onClick={() => addToCart(currentProduct, quantity)}
              >
                Add to cart
              </button>
            </div>
          </div>
          <div className="flex mt-4 justify-content-around ">
            <div>
              <h4 className="">Date Harvested</h4>
              <p className="text-sm  font-bold">
                {currentProduct?.data?.dateOfHarvest}
              </p>
            </div>
            <div>
              <h4>Date Packaged</h4>
              <p className="text-sm font-bold">
                {currentProduct?.data?.dateOfProcessing}
              </p>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {/* modal for qr code click */}
      <Modal
        show={show}
        onHide={handleModel}
        className="order-track-modal"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="cart-tracker mb-5">
            <div className="header">
              <h6 className="text-xl	text-center">Apple</h6>
              <p className="text-center text-xs	">Timepline</p>
            </div>
            {/* <img src={img} alt="" className="w-[25px]" /> */}
            <div className="track-wrapper">
              {/* <div className="mt-4 pb-2 track-content">
                <label className="text-[14px] fw-semibold text-blue-800">
                  Out for delivery
                </label>
                <p className="text-[10px] text-gray-800 leading-1">
                  1 hung lai road, Hung hom
                </p>
                <p className="text-[10px] text-gray-800 leading-1">
                  January 2, 2024, 2:10pm
                </p>
              </div> */}
              {/* <div className="mt-4 pb-2 track-content">
                <label className="text-[14px] fw-semibold text-blue-800">
                  Order Placed
                </label>
                <p className="text-[10px] text-gray-800 leading-1">
                  by haris mansoor
                </p>
                <p className="text-[10px] text-gray-800 leading-1">
                  January 1, 2024, 10:00am
                </p>
              </div> */}
              <div className="mt-4 pb-2 track-content">
                <label className="text-[14px] fw-semibold text-blue-800">
                  Arrived at Warehouse
                </label>
                <p className="text-[10px] text-gray-800 leading-1">
                  ISLAMABAD, ri 02904{" "}
                </p>
                <p className="text-[10px] text-gray-800 leading-1">
                  {currentProduct?.data?.departureDateToWarehouse}
                </p>
              </div>
              <div className="mt-4 pb-2 track-content">
                <label className="text-[14px] fw-semibold text-blue-800">
                  Departed to Warehouse
                </label>
                <p className="text-[10px] text-gray-800 leading-1">
                  {currentProduct?.data?.departureDateToWarehouse}
                </p>
              </div>
              <div className="mt-4 pb-2 track-content">
                <label className="text-[14px] fw-semibold text-blue-800">
                  Packaged by {currentProduct?.data?.packagingCompany}
                </label>
                <p className="text-[10px] text-gray-800 leading-1">
                  {currentProduct?.data?.dateOfProcessing}
                </p>
              </div>{" "}
              <div className="mt-4 pb-2 track-content">
                <label className="text-[14px] fw-semibold text-blue-800">
                  Harvested by Mansoor Enterprises{" "}
                </label>
                <p className="text-[10px] text-gray-800 leading-1">
                  Pakistan, LHR Batch #234441{" "}
                </p>
                <p className="text-[10px] text-gray-800 leading-1">
                  {currentProduct?.data?.dateOfHarvest}
                </p>
              </div>
            </div>
          </div>
          <p className="text-[11px]">
            Average weight per piece:{" "}
            <span className="fw-semibold">
              {currentProduct?.data?.averageWeightPerPiece} grams
            </span>
          </p>{" "}
          <p className="text-[11px]">
            Storage Conditions: <span className="fw-semibold"> Excellent</span>
          </p>
          <p className="text-[11px]">
            Soil Condition:{" "}
            <span className="fw-semibold">
              {" "}
              {currentProduct?.data?.soilConditions}
            </span>
          </p>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ProductList;

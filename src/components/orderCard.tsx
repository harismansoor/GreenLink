import React, { useEffect, useState } from "react";
import img from "../assets/Images.png";
import barcode from "../assets/barcode.png";
import { Modal } from "react-bootstrap";
import { useCart } from "../cartContext";

const OrderCard = (props: any) => {
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

  const { status } = props;
  console.log(status);
  const [show, setShow] = useState(false);
  const [currentItem, setCurrentItem] = useState();

  const handleModel = (item) => {
    console.log(item);
    setCurrentItem(item);
    setShow(!show);
  };

  useEffect(() => {
    console.log(orders);
  }, [orders]);
  // useEffect(() => {
  //   console.log(localStorage.getItem("orders"));
  // }, []);

  return (
    <div>
      <div className="order-wrapper">
        <div className="order-card">
          <p className="mb-2  ">
            {status == "ongoing" ? "On-going" : " Delivered Successfully"}
          </p>

          {localStorage.getItem("orders")?.length == undefined && (
            <h2>you have no orders</h2>
          )}

          {orders.map((item, index) => {
            return (
              <>
                <div
                  className=" card-wrapper d-flex justify-content-between align-items-center"
                  key={index}
                >
                  <div className="prduct-img">
                    <img src={item.product.data.image} alt="" />
                  </div>
                  <div className="center w-100 px-5">
                    <ul>
                      <li className="d-flex align-items-end">
                        {" "}
                        <p>{item.product.data.productName}</p>
                        <span className="ms-3 fw-semibold">12 items</span>
                      </li>
                      <li className="fw-semibold">
                        date of order: <span>{item.orderDate}</span>
                      </li>
                      <li>
                        Mansoor Enterprises <span>12 items</span>
                      </li>
                      <li className="fw-semibold">
                        date of delivery: <span>N.A.</span>
                      </li>
                      <li>
                        GreenLink Organic Rating:{" "}
                        <span className="fw-semibold">9.8</span>
                      </li>
                    </ul>
                  </div>
                  <div className="prduct-img">
                    <img
                      src={barcode}
                      alt=""
                      className="d-flex pointer"
                      onClick={() => handleModel(item)}
                    />
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>

      <Modal show={show} onHide={handleModel} className="order-track-modal">
        <Modal.Body>
          <div className="cart-tracker mb-5">
            <div className="header">
              <h6 className="text-xl	text-center">
                {currentItem?.product?.data?.productName}
              </h6>
              <p className="text-center text-xs	">Timeline</p>
            </div>
            <img
              src={currentItem?.product?.data?.image}
              alt=""
              className="w-[50px]"
            />
            <div className="track-wrapper">
              <div className="mt-4 pb-2 track-content">
                <label className="text-[14px] fw-semibold text-blue-800">
                  Out for delivery
                </label>
                <p className="text-[10px] text-gray-800 leading-1">
                  1 hung lai road, Hung hom
                </p>
                <p className="text-[10px] text-gray-800 leading-1">
                  {currentItem?.orderDate}
                </p>
              </div>
              <div className="mt-4 pb-2 track-content">
                <label className="text-[14px] fw-semibold text-blue-800">
                  Order Placed
                </label>
                <p className="text-[10px] text-gray-800 leading-1">
                  by haris mansoor
                </p>
                <p className="text-[10px] text-gray-800 leading-1">
                  {currentItem?.orderDate}
                </p>
              </div>
              <div className="mt-4 pb-2 track-content">
                <label className="text-[14px] fw-semibold text-blue-800">
                  Arrived at Warehouse
                </label>
                <p className="text-[10px] text-gray-800 leading-1">
                  ISLAMABAD, ri 02904{" "}
                </p>
                <p className="text-[10px] text-gray-800 leading-1">
                  {currentItem?.product?.data?.departureDateToWarehouse}
                </p>
              </div>
              <div className="mt-4 pb-2 track-content">
                <label className="text-[14px] fw-semibold text-blue-800">
                  Departed to Warehouse
                </label>
                <p className="text-[10px] text-gray-800 leading-1">
                  {currentItem?.product?.data?.departureDateToWarehouse}
                </p>
              </div>
              <div className="mt-4 pb-2 track-content">
                <label className="text-[14px] fw-semibold text-blue-800">
                  Packaged by Cheen Packaging Ltd
                </label>
                <p className="text-[10px] text-gray-800 leading-1">
                  {currentItem?.product?.data?.dateOfProcessing}
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
                  {currentItem?.product?.data?.dateOfHarvest}
                </p>
              </div>
            </div>
          </div>
          <p className="text-[11px]">
            Average weight per piece:{" "}
            <span className="fw-semibold">
              {currentItem?.product?.data?.averageWeightPerPiece} grams{" "}
            </span>
          </p>{" "}
          <p className="text-[11px]">
            Storage Conditions: <span className="fw-semibold"> Excellent</span>
          </p>
          <p className="text-[11px]">
            Soil Condition:{" "}
            <span className="fw-semibold">
              {" "}
              {currentItem?.product?.data?.soilConditions}
            </span>
          </p>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default OrderCard;

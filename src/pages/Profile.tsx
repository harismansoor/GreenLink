import React from "react";
import OrderCard from "../components/orderCard";

const Profile = () => {
  return (
    <div className="container">
      <div className="seller-profile container mt-5">
        <h6>
          Welcome <span>user</span>
        </h6>
        <h5>Personal Details</h5>

        <div className="d-flex flex-column gap-2">
          <p>
            Name: <span>Haris Mansoor </span>
          </p>
          <p>
            Address Line 1:{" "}
            <span> 1 Hung Lai Road, PolyU student residence halls </span>
          </p>
          <p>
            Address Line 2: <span>Hung Hom, Kowloon, HK </span>
          </p>
          <p>
            Telephone number: <span> +852 94444444 </span>
          </p>{" "}
          <p>
            Billing Information: <span> 404-76************* </span>
          </p>
          {/* <div className="d-flex flex-start">
            <button>Edit</button>
          </div> */}
        </div>

        <h6 className="mt-3">Orders</h6>
        {/* @ts-ignore */}
        <OrderCard status="ongoing" />

        <br />
        {/* @ts-ignore */}
        {/* <OrderCard status="success" /> */}

        {/* <p className="mt-5 pt-5">Canceled Orders</p> */}
      </div>
    </div>
  );
};

export default Profile;

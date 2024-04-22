import React, { useEffect } from "react";
import SellerPortal from "../components/sellerportal";

const SellerPortalPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <div>
      <SellerPortal />
    </div>
  );
};

export default SellerPortalPage;

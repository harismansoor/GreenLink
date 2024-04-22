import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./sellermain.css";
type ErrorsType = {
  email?: string; // Make email property optional to prevent the TypeScript error
  password?: string;
  confirmPassword?: string;
  // Add more properties if needed
};
const SellerMain = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // State variables to store input values and errors
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isOrganic, setIsOrganic] = useState(false);
  const [isPackagingDistribution, setIsPackagingDistribution] = useState(false);
  const [errors, setErrors] = useState<ErrorsType>({});

  // Function to handle form submission
  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Clear previous errors
    setErrors({});

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Invalid email address",
      }));
      return;
    }

    // Validate password and confirm password
    if (password !== confirmPassword) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: "Passwords do not match",
      }));
      return;
    }

    if (password.length < 6) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password must be at least 6 characters long",
      }));
      return;
    }

    // Additional validation logic can be added here

    // If all validations pass, log input values
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Confirm Password:", confirmPassword);
    console.log("Is Organic:", isOrganic);
    console.log("Is Packaging/Distribution:", isPackagingDistribution);

    // Clear form inputs
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setIsOrganic(false);
    setIsPackagingDistribution(false);
  };

  return (
    <div>
      <div className="font-poppins text-25 font-bold leading-9 tracking-normal text-left flex items-center w-full justify-center mt-10">
        <div>
          <h3 className="font-poppins text-center font-bold leading-38 tracking-normal text-left">
            Sell Your Organic Greens
          </h3>

          {/* login signup buttons */}
          <div className="flex items-stretch justify-between gap-5 self-start max-w-xs mt-5">
            <div className="text-[#87C467] text-base border-[0.1px] font-semibold leading-4 whitespace-nowrap shadow-sm bg-white grow justify-center items-stretch px-10 py-3.5 cursor-pointer rounded-lg max-md:px-5 hover:bg-gray-100">
              <span>
                <Link to="/sellerportal">Log In</Link>
              </span>
            </div>

            <div
              onClick={handleShow}
              className="text-white text-base font-semibold leading-4 whitespace-nowrap shadow-sm bg-[#87C467] grow justify-center items-stretch px-9 py-3.5 cursor-pointer rounded-lg max-md:px-5 hover:bg-lime-400"
            >
              <a>Sign up</a>
            </div>
          </div>
        </div>

        <Modal show={show} onHide={handleClose} className="sellersignup">
          <Modal.Header className="border-none" closeButton>
            {/* <Modal.Title>Modal heading</Modal.Title> */}
            <div className="text-center w-full flex justify-center">
              {/* <img src="../../../assets/icons/registration.svg" alt="" /> */}
            </div>
          </Modal.Header>
          <Modal.Body>
            <div className="mb-10 pt-3">
              <form onSubmit={handleSubmit}>
                <div>
                  <input
                    className="w-full pb-1"
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  <input
                    className="w-full mt-4 pb-1"
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">{errors.email}</p>
                  )}
                </div>
                <div>
                  <input
                    className={`w-full mt-4 pb-1 ${
                      errors.password && "border-red-500"
                    }`}
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm">{errors.password}</p>
                  )}
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-sm">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
                <div>
                  <input
                    className="w-full mt-4 pb-1"
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block mt-4">Select your role:</label>
                </div>
                <div className="flex items-center mt-4 gap-10">
                  <label className="flex gap-2 ">
                    {" "}
                    <input
                      type="checkbox"
                      checked={isOrganic}
                      onChange={(e) => setIsOrganic(e.target.checked)}
                    />{" "}
                    Organic Form:
                  </label>
                </div>
                <div className="mt-4 flex items-center gap-10">
                  <label className="flex gap-2">
                    {" "}
                    <input
                      type="checkbox"
                      checked={isPackagingDistribution}
                      onChange={(e) =>
                        setIsPackagingDistribution(e.target.checked)
                      }
                    />{" "}
                    Packaging/Distribution:
                  </label>
                </div>

                <button
                  className="button3  bg-[#87C467] mt-2 text-white px-4 py-2 rounded-full font-bold text-[14px]"
                  type="submit"
                >
                  Submit
                </button>
                <p className="text-sm text-gray-500 mt-2">
                  Note: You may need to submit your organic certifications.
                </p>
              </form>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default SellerMain;

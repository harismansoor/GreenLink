import React, { useEffect, useState } from "react";
import "./index.scss";
import { firestoredb, uploadImg } from "../../firebase/config";
import {
  collection,
  addDoc,
  getDoc,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";

const SellerPortal = () => {
  const [formData, setFormData] = useState({
    averageWeightPerPiece: "", // Add this line
    batchNumber: "", // Add this line
    dateOfHarvest: "", // Add this line
    organicallyProduced: null,
    organicFertilizers: null,
    packager: null, // Assuming packager is a boolean value, set to null initially
    packagingCompany: "",
    productName: "",
    sellingPrice: "",
    soilConditions: "",
    totalWeight: "",
    dateOfSending: "",
  });
  const [image, setImage] = useState();
  const [showModal, setShowModal] = useState(false);

  //@ts-ignore
  const handleOptionChange = (fieldName, value) => {
    setFormData({
      ...formData,
      [fieldName]: value,
    });
  };
  //@ts-ignore
  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleSubmit = async () => {
    console.log(formData);
    console.log(image);
    uploadImg(image).then(async (res) => {
      if (res.success) {
        // Add a new document with a generated id.
        try {
          const docRef = await addDoc(collection(firestoredb, "products"), {
            averageWeightPerPiece: formData.averageWeightPerPiece,
            batchNumber: formData.batchNumber,
            dateOfHarvest: formData.dateOfHarvest,
            organicFertilizers: formData.organicFertilizers,
            organicallyProduced: formData.organicallyProduced,
            packager: formData.packager,
            packagingCompany: formData.packagingCompany,
            productName: formData.productName,
            sellingPrice: formData.sellingPrice,
            soilConditions: formData.soilConditions,
            totalWeight: formData.totalWeight,
            image: res.imageUrl,
            remarks: false,
            dateOflisting: Date.now(),
            dateOfSending: formData.dateOfSending,
          });
          console.log("Document written with ID: ", docRef.id);
          setShowModal(false);
          getMyproducts();
          window.scrollTo(0, 0);
        } catch (error) {
          console.log(error);
          setShowModal(false);
        }
      }
    });
  };
  const [myProdcuts, setMyProdcuts] = useState([]);
  const getMyproducts = async () => {
    setMyProdcuts([]);
    const querySnapshot = await getDocs(collection(firestoredb, "products"));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      //@ts-ignore
      setMyProdcuts((prev) => [...prev, { docid: doc.id, data: doc.data() }]);
    });
  };

  useEffect(() => {
    getMyproducts();
  }, []);
  useEffect(() => {
    console.log(myProdcuts);
  }, [myProdcuts]);
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const formattedDate = `${date.getDate()}-${
      date.getMonth() + 1
    }-${date.getFullYear()}`;
    return formattedDate;
  };

  const handleDelete = async (item: any) => {
    console.log(item.docid);
    const confirmed = window.confirm("Are you sure you want to delete?");
    if (confirmed) {
      try {
        // Create a reference to the document
        const documentRef = doc(firestoredb, "products", item.docid);

        // Delete the document
        await deleteDoc(documentRef);

        toast("Document successfully deleted!");
      } catch (error) {
        console.error("Error deleting document:", error);
        toast.error("Error deleting document");
      }
    } else {
      // Perform action when delete is cancelled
      console.log("Delete cancelled");
      toast("Delete cancelled");
    }
  };
  return (
    <div className="sellerportal">
      <h1 className="mb-5">
        Welcome <span>Mansoor Enterprise</span>
      </h1>

      <h1>My products</h1>

      <div>
        {myProdcuts.length > 0 ? (
          myProdcuts.map((item, index) => {
            return (
              <>
                <div className="myproducts-firebase">
                  <div className="order-wrapper">
                    <div className="order-card">
                      <div className=" card-wrapper d-flex justify-content-between align-items-center">
                        <div className="prduct-img">
                          <img
                            className="product-image"
                            src={item.data.image}
                            alt=""
                          />
                        </div>
                        <div className="center w-100 px-5">
                          <ul>
                            <li className="d-flex align-items-end ">
                              {" "}
                              <p>{item.data.productName}</p>{" "}
                              <span className="ms-3 fw-semibold">12 items</span>
                            </li>
                            <li className="fw-semibold">
                              date of harvest::{" "}
                              <span>{item.data.dateOfHarvest}</span>
                            </li>

                            <li className="fw-semibold">
                              Revenue: <span>{item.data.sellingPrice} HKD</span>
                            </li>
                            <li>
                              GreenLink Organic Rating:{" "}
                              <span className="fw-semibold">9.8</span>
                            </li>
                            <li>
                              date of listing:
                              <span className="fw-semibold">
                                {formatDate(item.data.dateOflisting)}
                              </span>
                            </li>
                            <li>
                              GreenLink Commission:
                              <span className="fw-semibold">0 HKD</span>
                            </li>
                            <li>
                              {item.data.remarks == false ? (
                                <button
                                  className="edit-btn"
                                  onClick={() => handleDelete(item)}
                                >
                                  Delete
                                </button>
                              ) : (
                                <></>
                              )}
                            </li>
                            <li>
                              Number of product Sold:
                              <span className="fw-semibold">0 HKD</span>
                            </li>

                            <li>
                              Remarks:
                              {item.data.remarks == false ? (
                                <span
                                  className="fw-semibold"
                                  style={{ color: "red" }}
                                >
                                  "Waiting for
                                  <b> {item.data.packagingCompany + " "}</b>
                                  to receive your harvest"
                                </span>
                              ) : (
                                <span className="fw-semibold">"Received"</span>
                              )}
                            </li>
                          </ul>
                        </div>
                        <div className="prduct-img">
                          {/* <img src={barcode} alt="" className="d-flex" /> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            );
          })
        ) : (
          <p className="mt-2 mb-2">no Data</p>
        )}
        <img src="" alt="" />
      </div>

      <h1 className="mt-5">Add products</h1>

      <div className="add-product">
        <div className="left">
          <div className="field">
            <label htmlFor="productName">What are you selling</label>
            <div>
              <input type="text" id="productName" onChange={handleChange} />
            </div>
          </div>
          <div className="field">
            <label htmlFor="sellingPrice">
              How much are you selling them for (12 pieces)?
            </label>
            <div>
              <input type="text" id="sellingPrice" onChange={handleChange} />
            </div>
          </div>

          <div className="field">
            <label className="field-label">
              Are they Organically Produced? Select one
            </label>
            <div className="flex gap-2">
              <input
                type="radio"
                id="organicallyProducedYes"
                name="organicallyProduced"
                className="m-0 visually-hidden"
                value="yes"
                onChange={() =>
                  handleOptionChange("organicallyProduced", "yes")
                }
              />
              <label
                htmlFor="organicallyProducedYes"
                className={`m-0 radio-label ${
                  formData.organicallyProduced === "yes" ? "selected" : ""
                }`}
              >
                Yes
              </label>
            </div>
            <div className="flex gap-2">
              <input
                type="radio"
                id="organicallyProducedNo"
                name="organicallyProduced"
                className="m-0 visually-hidden"
                value="no"
                onChange={() => handleOptionChange("organicallyProduced", "no")}
              />
              <label
                htmlFor="organicallyProducedNo"
                className={`m-0 radio-label ${
                  formData.organicallyProduced === "no" ? "selected" : ""
                }`}
              >
                No
              </label>
            </div>
          </div>

          <div className="field">
            <label className="field-label">
              Did you use organic fertilizers?
            </label>
            <div className="flex gap-2">
              <input
                type="radio"
                id="organicFertilizersYes"
                name="organicFertilizers"
                className="m-0 visually-hidden"
                value="yes"
                onChange={() => handleOptionChange("organicFertilizers", "yes")}
              />
              <label
                htmlFor="organicFertilizersYes"
                className={`m-0 radio-label ${
                  formData.organicFertilizers === "yes" ? "selected" : ""
                }`}
              >
                Yes
              </label>
            </div>
            <div className="flex gap-2">
              <input
                type="radio"
                id="organicFertilizersNo"
                name="organicFertilizers"
                className="m-0 visually-hidden"
                value="no"
                onChange={() => handleOptionChange("organicFertilizers", "no")}
              />
              <label
                htmlFor="organicFertilizersNo"
                className={`m-0 radio-label ${
                  formData.organicFertilizers === "no" ? "selected" : ""
                }`}
              >
                No
              </label>
            </div>
          </div>

          <div className="field">
            <label htmlFor="soilConditions">What are the soil conditions</label>
            <input
              type="text"
              id="soilConditions"
              placeholder="N/A"
              onChange={handleChange}
            />
          </div>

          <div className="field">
            <label htmlFor="imagepicker">
              <input
                type="file"
                id="imagepicker"
                className="d-none"
                onChange={(e) => {
                  //@ts-ignore
                  setImage(e.target.files[0]);
                }}
              />
              {image == null ? (
                <img src="../../../assets/images/upload.png" alt="" />
              ) : (
                <img
                  className="image-picker-prev"
                  src={URL.createObjectURL(image)}
                  alt=""
                />
              )}
            </label>
          </div>
        </div>
        <div className="right">
          <div className="field">
            <label htmlFor="dateOfHarvest">Date of harvest</label>
            <div>
              <input type="date" id="dateOfHarvest" onChange={handleChange} />
            </div>
          </div>

          <div className="field">
            <label htmlFor="averageWeightPerPiece">
              Average Weight per piece
            </label>
            <div>
              <input
                type="text"
                id="averageWeightPerPiece"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="field">
            <label htmlFor="batchNumber">Batch Number</label>
            <div>
              <input type="text" id="batchNumber" onChange={handleChange} />
            </div>
          </div>
          <div className="field">
            <label htmlFor="totalWeight">Total Weight</label>
            <div>
              <input type="text" id="totalWeight" onChange={handleChange} />
            </div>
          </div>

          <div className="field">
            <label className="field-label">
              Are you also the packager for the product
            </label>
            <div className="flex gap-2">
              <input
                type="radio"
                id="packagerYes"
                name="packager"
                className="m-0 visually-hidden"
                value="yes"
                onChange={() => handleOptionChange("packager", "yes")}
              />
              <label
                htmlFor="packagerYes"
                className={`m-0 radio-label ${
                  formData.packager === "yes" ? "selected" : ""
                }`}
              >
                Yes
              </label>
            </div>
            <div className="flex gap-2">
              <input
                type="radio"
                id="packagerNo"
                name="packager"
                className="m-0 visually-hidden"
                value="no"
                onChange={() => handleOptionChange("packager", "no")}
              />
              <label
                htmlFor="packagerNo"
                className={`m-0 radio-label ${
                  formData.packager === "no" ? "selected" : ""
                }`}
              >
                No
              </label>
            </div>
          </div>

          <div>
            <label htmlFor="packagingCompany">Select Packaging Company:</label>
            <select
              id="packagingCompany"
              value={formData.packagingCompany}
              onChange={handleChange}
            >
              <option value="">Select an option</option>
              <option value="Cheen Packaging Limited">
                Cheen Packaging Limited
              </option>
              <option value="Pak Packaging Limited">
                Pak Packaging Limited
              </option>
            </select>
            {formData.packagingCompany && (
              <p>You have selected: {formData.packagingCompany}</p>
            )}
          </div>
        </div>
      </div>
      <div className="submit-btn-wrapper mt-4">
        <div onClick={() => setShowModal(true)}>
          <a className="mt-8 text-white text-base font-semibold leading-4 whitespace-nowrap shadow-sm bg-[#87C467] grow justify-center items-stretch px-9 py-3.5 cursor-pointer rounded-lg max-md:px-5 hover:bg-lime-400">
            Continue
          </a>
        </div>
      </div>

      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        className="modal-on-sellerportal"
      >
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="header-ing text-center">
            Apple <br /> Mansoor Enterpirse
          </div>
          <div>
            <label htmlFor="">
              Date of sending it to the packager
              <input
                className="w-100"
                type="date"
                id="dateOfSending"
                onChange={handleChange}
              />
            </label>
          </div>
          <div>
            <label htmlFor="">
              Packager/Distributor
              <input
                className="w-100 mt-1"
                type="text"
                value={formData.packagingCompany}
              />
            </label>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="mt-8 text-white text-base font-semibold leading-4 whitespace-nowrap shadow-sm bg-[#87C467] grow justify-center items-stretch px-9 py-3.5 cursor-pointer rounded-lg max-md:px-5 hover:bg-lime-400"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SellerPortal;

import React, { useEffect, useState } from "react";
import img from "../assets/Images.png";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { firestoredb } from "../firebase/config";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";
import contractjson from "../abis/mintcontract.json";
import Web3 from "web3";
import { useAccount, useWalletClient } from "wagmi";

const ProductRequest = () => {
  const [myProdcuts, setMyProdcuts] = useState([]);
  const [selectedpackagingCompany, setSelectedPackagingCompany] = useState(
    "Cheen Packaging Limited"
  );
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [documentId, setDocumentId] = useState();
  const [formData, setFormData] = useState({
    dateOfProcessing: "",
    departureDateToWarehouse: "",
  });
  const { data: signer } = useWalletClient();
  const { address } = useAccount();

  //=================================================================================//

  const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;
  console.log(import.meta.env.VITE_RPC_URL);

  const web3 = new Web3(import.meta.env.VITE_RPC_URL);

  const mint_contract = new web3.eth.Contract(contractjson, contractAddress);
  //=================================================================================//

  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSelectChange = (event) => {
    setSelectedPackagingCompany(event.target.value);
  };
  const getMyproducts = async () => {
    setMyProdcuts([]);
    const querySnapshot = await getDocs(collection(firestoredb, "products"));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      //@ts-ignore
      setMyProdcuts((prev) => [...prev, { docId: doc.id, data: doc.data() }]);
    });
  };

  useEffect(() => {
    getMyproducts();
  }, []);

  const pinJSONToIPFS = async (JSONBody: any) => {
    const key = "90022544055cb6ecc5d9";
    const secret =
      "8a4dcf1600c246916edc11a60e6e20efbcd57de49678c93cda97ae35403d381d";
    const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
    //axios POST Request to pinata
    return axios
      .post(url, JSONBody, {
        headers: {
          pinata_api_key: key,
          pinata_secret_api_key: secret,
        },
      })
      .then(function (response) {
        return {
          success: true,
          pinataUrl:
            "https://cloudflare-ipfs.com/ipfs/" + response.data.IpfsHash,
        };
      })
      .catch(function (error) {
        console.log(error);
        return {
          success: false,
          message: error.message,
        };
      });
  };

  const handleAnother = async () => {
    setisLoading(true);
    if (
      formData.departureDateToWarehouse == "" ||
      formData.dateOfProcessing == ""
    ) {
      toast("please fill the fields", { toastId: "dasdsad" });
      return;
    }

    const metadata = new Object();
    metadata.pinataMetadata = {
      name: documentId.data.productName,
    };
    metadata.pinataContent = {
      averageWeightPerPiece: documentId.data.averageWeightPerPiece,
      batchNumber: documentId.data.batchNumber,
      dateOfHarvest: documentId.data.dateOfHarvest,
      organicFertilizers: documentId.data.organicFertilizers,
      organicallyProduced: documentId.data.organicallyProduced,
      packager: documentId.data.packager,
      packagingCompany: documentId.data.packagingCompany,
      productName: documentId.data.productName,
      sellingPrice: documentId.data.sellingPrice,
      soilConditions: documentId.data.soilConditions,
      totalWeight: documentId.data.totalWeight,
      image: documentId.data.image,
      dateOflisting: Date.now(),
      dateOfSending: formData.dateOfSending,
      departureDateToWarehouse: formData.departureDateToWarehouse,
      dateOfProcessing: formData.dateOfProcessing,
      remarks: true,
    };

    pinJSONToIPFS(metadata)
      .then((res) => {
        console.log(" pinataUrl:", res.pinataUrl);

        let transaction = {
          to: contractAddress,
          chainId: 11155111,
          data: mint_contract.methods
            .safeMint(address, res.pinataUrl)
            .encodeABI(),
        };

        signer
          .sendTransaction(transaction)
          .then(async (hash) => {
            for (let index = 0; index > -1; index++) {
              try {
                var receipt = await web3.eth.getTransactionReceipt(hash);
                if (receipt != null) {
                  const cityRef = doc(
                    firestoredb,
                    "products",
                    documentId.docId
                  );
                  await setDoc(
                    cityRef,
                    {
                      remarks: true,
                      dataOfProcessing: formData.dateOfProcessing,
                      departureDateToWarehouse:
                        formData.departureDateToWarehouse,
                    },
                    { merge: true }
                  )
                    .then((res) => {
                      console.log(res);
                      handleCloseModal();
                      getMyproducts();
                      toast("Acknowledge Success", {
                        toastId: "donotDuplicate",
                      });
                      setisLoading(false);
                    })
                    .catch((err) => {
                      console.log(err);
                    });

                  break;
                }
              } catch (error) {
                console.log(error);
              }
            }
          })
          .catch((error) => {
            setisLoading(false);
            console.log(error);

            if (error.code == 4001) {
              toast.warning("Transaction Rejected!", {
                toastId: "buyError",
              });
            } else {
              toast.error("Something went wrong", {
                toastId: "buyError",
              });
            }
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({ dateOfProcessing: "", departureDateToWarehouse: "" });
  };
  const handleAcknowledge = (item) => {
    console.log(item.docId);
    setDocumentId(item);
    setShowModal(true);
  };
  return (
    <div>
      <div className="container pt-5">
        <h6 className="mt-5 text-3xl">
          Welcome
          <select
            name=""
            id=""
            value={selectedpackagingCompany}
            onChange={handleSelectChange}
          >
            <option value="Cheen Packaging Limited">
              Cheen Packaging Limited
            </option>
            <option value="Pak Packaging Limited">Pak Packaging Limited</option>
          </select>
        </h6>
        <h5>you have selected {selectedpackagingCompany} </h5>
        <h6 className="mt-5 text-3xl	">Product Requested</h6>

        {/* <p className="mt-5 text-xs">No Data</p> */}
        {myProdcuts &&
          myProdcuts.map((item, index) => {
            if (item.data.packagingCompany == selectedpackagingCompany) {
              if (item.data.remarks == false) {
                return (
                  <div className="requested-card shadow p-4 rounded mt-5">
                    <div className="flex gap-3 items-center">
                      <div className="product-requested-image-wrapper">
                        <img src={item.data.image} alt="" />
                      </div>
                      <div>
                        <p className="text-2xl	">
                          {item.data.productName}{" "}
                          <span className="text-xs"> 12 pieces</span>
                        </p>
                        <p className="text-base	 text-gray">
                          {item.data.packagingCompany}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center ps-5 ms-5 mt-4">
                      <ul className="flex gap-5">
                        <li>
                          <label className="text-xl fw-semibold">
                            Date of harvest
                          </label>
                          <p className="text-xs">{item.data.dateOfHarvest}</p>
                        </li>
                        <li>
                          <label className="text-xl fw-semibold">
                            Total Weight
                          </label>
                          <p className="text-xs">{item.data.totalWeight} kg</p>
                        </li>
                        <li>
                          <label className="text-xl fw-semibold">
                            Batch Number
                          </label>
                          <p className="text-xs">{item.data.batchNumber}</p>
                        </li>
                      </ul>
                    </div>
                    <div className="ps-5 ms-5 mt-3">
                      <button
                        className="text-base rounded bg-sky-600	 text-white	font-semibold	py-2 px-3 bg-green "
                        onClick={() => handleAcknowledge(item)}
                      >
                        Acknowledge Receival{" "}
                      </button>
                    </div>
                  </div>
                );
              }
            }
          })}
      </div>

      <Modal
        show={showModal}
        onHide={() => handleCloseModal()}
        className="modal-on-sellerportal"
      >
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div className="header-ing text-center">
              Apple <br /> Mansoor Enterpirse
            </div>
            <div>
              <label htmlFor="dateOfProcessing">
                Date of Processing
                <input
                  className="w-100"
                  type="date"
                  id="dateOfProcessing"
                  value={formData.dateOfProcessing}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div>
              <label htmlFor="departureDateToWarehouse">
                Departure Date to Warehouse
                <input
                  className="w-100 mt-1"
                  type="date"
                  id="departureDateToWarehouse"
                  value={formData.departureDateToWarehouse}
                  onChange={handleChange}
                />
              </label>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="mt-8 text-white text-base font-semibold leading-4 whitespace-nowrap shadow-sm bg-[#87C467] grow justify-center items-stretch px-9 py-3.5 cursor-pointer rounded-lg max-md:px-5 hover:bg-lime-400"
            onClick={handleAnother}
          >
            {isLoading ? "Loading..." : "Submit"}
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProductRequest;

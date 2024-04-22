import Footer from "../components/Footer";
import Logo from "../assets/GreenLink.png";
import ProductList from "../components/ProductList";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestoredb } from "../firebase/config";
import { useAccount } from "wagmi";
import Web3 from "web3";
import contractjson from "../abis/mintcontract.json";
import axios from "axios";

export default function Dashboard() {
  const [myProdcuts, setMyProdcuts] = useState([]);
  const { address } = useAccount();

  // const [selectedpackagingCompany, setSelectedPackagingCompany] = useState(
  //   "Cheen Packaging Limited"
  // );
  // const [showModal, setShowModal] = useState(false);
  // const [documentId, setDocumentId] = useState("");
  // const [formData, setFormData] = useState({
  //   dateOfProcessing: "",
  //   departureDateToWarehouse: "",
  // });
  //=================================================================================//

  const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;
  const web3 = new Web3(import.meta.env.VITE_RPC_URL);
  const mint_contract = new web3.eth.Contract(contractjson, contractAddress);
  //=================================================================================//

  const getMyproducts = async () => {
    if (address) {
      setMyProdcuts([]);
      try {
        const TokenUri = await mint_contract.methods.getAllNFTs(address).call();
        console.log(TokenUri);
        TokenUri.map((item, index) => {
          axios
            .get(item)
            .then((res) => {
              console.log(res.data);
              setMyProdcuts((prev) => [
                ...prev,
                { docId: index, data: res.data },
              ]);
            })
            .catch((err) => {
              console.log(err);
            });
        });
      } catch (error) {
        console.log(error);
      }

      // const querySnapshot = await getDocs(collection(firestoredb, "products"));
      // querySnapshot.forEach((doc) => {
      //   // doc.data() is never undefined for query doc snapshots
      //   // console.log(doc.id, " => ", doc.data());
      //   //@ts-ignore
      //   setMyProdcuts((prev) => [...prev, { docId: doc.id, data: doc.data() }]);
      // });
    }
  };

  useEffect(() => {
    getMyproducts();
  }, [address]);
  useEffect(() => {
    // console.log(myProdcuts);
  }, [myProdcuts]);

  return (
    <>
      <div className="bg-white flex flex-col items-center">
        <div className="justify-center text-neutral-400 text-center text-2xl font-semibold mt-20 max-md:mt-10">
          <span className="font-bold">Welcome</span>{" "}
          <span className="text-neutral-400">User</span>
        </div>
        <div className="text-zinc-800 text-4xl font-bold whitespace-nowrap mt-16 max-md:mt-10">
          GreenLink Market
        </div>

        <div>
          <ProductList myProdcuts={myProdcuts} />
        </div>
      </div>
    </>
  );
}

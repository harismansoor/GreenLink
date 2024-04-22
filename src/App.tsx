import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import CartPage from "./pages/CartPage";
import SellerPage from "./pages/sellerpage";
import Footer from "./components/Footer";
import Header from "./components/header";
import SellerPortalPage from "./pages/sellerportalpage";
import ProductRequest from "./pages/productRequest";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CartProvider } from "./cartContext";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { sepolia } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

function App() {
  const config = getDefaultConfig({
    appName: "My RainbowKit App",
    projectId: "c864bec03ad8bd5ac6b91db2e137fbb4",
    chains: [sepolia],
    ssr: true, // If your dApp uses server side rendering (SSR)
  });
  const queryClient = new QueryClient();

  return (
    <div>
      {/* hello */}
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider>
            <BrowserRouter>
              <CartProvider>
                <Header />
                <ToastContainer />
                <Routes>
                  <Route index element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/seller" element={<SellerPage />} />
                  <Route path="/sellerportal" element={<SellerPortalPage />} />
                  <Route
                    path="/product-requested"
                    element={<ProductRequest />}
                  />
                </Routes>
              </CartProvider>
            </BrowserRouter>
            <Footer />
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </div>
  );
}

export default App;

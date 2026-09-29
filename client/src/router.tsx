import { createBrowserRouter } from "react-router-dom";

import IndexPage from "./pages";
import BagPage from "./pages/bag";
import PricingPage from "./pages/pricing";
import AboutPage from "./pages/about";
import LoginPage from "./features/auth/pages/LoginPage";
import SignUpPage from "./features/auth/pages/SIgnUpPage";
import ProductDetails from "./features/products/pages/ProductDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <IndexPage />,
  },
  {
    path: "/product/:id",
    element: <ProductDetails />,
  },

  {
    path: "/bag",
    element: <BagPage />,
  },
  {
    path: "/pricing",
    element: <PricingPage />,
  },
  {
    path: "/about",
    element: <AboutPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignUpPage />,
  },
]);

export default router;

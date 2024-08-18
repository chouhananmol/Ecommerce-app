import "./App.css";
import { useEffect, useState } from "react";
import WebFont from "webfontloader";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { Toaster } from 'react-hot-toast';
import ProtectedRoute from "./components/Route/ProtectedRoute.js";

import Header from "./components/layout/Header/Header.js";
import Footer from "./components/layout/Footer/Footer.js";
import Home from "./components/Home/Home.js";
import UserOptions from "./components/layout/Header/userOptions";
import Products from "./components/Product/Products";
import ProductDetails from "./components/Product/ProductDetails.js";
import Search from "./components/Product/Search";
import About from "./components/layout/About/About.js";
import Contact from "./components/layout/Contact/Contact.js";
import NotFound from "./components/layout/NotFound/NotFound.js";


import LoginSignUp from "./components/User/LoginSignUp";
import Profile from "./components/User/Profile";
import UpdateProfile from "./components/User/UpdateProfile";
import UpdatePassword from "./components/User/UpdatePassword";
import ForgotPassword from "./components/User/ForgotPassword";
import ResetPassword from "./components/User/ResetPassword";

import Cart from "./components/Cart/Cart";
import Shipping from "./components/Cart/Shipping";
import ConfirmOrder from "./components/Cart/ConfirmOrder";
import OrderSuccess from "./components/Cart/OrderSuccess";
import Orders from "./components/Order/Orders";
import OrderDetails from "./components/Order/OrderDetails";

import Dashboard from "./components/Admin/Dashboard.js";
import ProductList from "./components/Admin/ProductList.js";
import NewProduct from "./components/Admin/NewProduct.js";
import UpdateProduct from "./components/Admin/UpdateProduct.js";
import OrderList from "./components/Admin/OrderList.js";
import ProcessOrder from "./components/Admin/ProcessOrder.js";
import UserList from "./components/Admin/UserList.js";
import UpdateUser from "./components/Admin/UpdateUser.js";
import ReviewsList from "./components/Admin/ReviewsList.js";

import Payment from "./components/Cart/Payment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import { store } from "./store";
import { loadUser } from "./actions/userAction";


function App() {

  const { loading, isAuthenticated, user } = useSelector(state => state.user);
  const [stripeApiKey, setStripeApiKey] = useState("");

  const getStripeApiKey = async () => {
    console.log("getStripeApiKey");
    try {
      const { data } = await axios.get(`/api/v1/stripeapikey`);
      setStripeApiKey(data.stripeApiKey);
    }
    catch (error) {
      console.log("Error id = " + error);
    }

  };


  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      }
    })

    store.dispatch(loadUser());

    getStripeApiKey();
  }, [])


  return (
    <div className="App">
      <Router>
        <Header />
        {isAuthenticated && <UserOptions user={user} />}
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/product/:id" element={<ProductDetails />} />
          <Route exact path="/products" element={<Products />} />
          <Route path="/products/:keyword" element={<Products />} />
          <Route exact path="/search" element={<Search />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route exact path="/about" element={<About />} />
          <Route path="/password/forgot" element={<ForgotPassword />} />
          <Route exact path="/password/reset/:token" element={<ResetPassword />} />
          <Route exact path="/login" element={<LoginSignUp />} />
          <Route exact path="/cart" element={<Cart />} />



          {/* Protected Routes -- authenticated only */}
          <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/account" element={<Profile />} />
            <Route path="/me/update" element={<UpdateProfile />} />
            <Route path="/password/update" element={<UpdatePassword />} />
            <Route path="/order/confirm" element={<ConfirmOrder />} />
            <Route path="/success" element={<OrderSuccess />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/order/:id" element={<OrderDetails />} />
          </Route>

          {/* stripe */}
          <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
            {stripeApiKey && (
              <Route
                path="/payment"
                element={
                  <Elements stripe={loadStripe(stripeApiKey)}>
                    <Payment />
                  </Elements>
                }
              />
            )}
          </Route>


          {/* Admin protected routes */}
          {loading === false && <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} adminRoute={true} />}>
            <Route path="/admin/dashboard" element={<Dashboard />} />

            <Route path="/admin/products" element={<ProductList />} />
            <Route path="/admin/product" element={<NewProduct />} />
            <Route path="/admin/product/:id" element={<UpdateProduct />} />
            <Route path="/admin/orders" element={<OrderList />} />
            <Route path="/admin/order/:id" element={<ProcessOrder />} />
            <Route path="/admin/users" element={<UserList />} />
            <Route path="/admin/user/:id" element={<UpdateUser />} />
            <Route path="/admin/reviews" element={<ReviewsList />} />

          </Route>
          }



          <Route path="*" element={window.location.pathname === "/payment" ? null : <NotFound />} />

        </Routes>
        <Toaster />
        <Footer />
      </Router>
    </div>
  );
}

export default App;
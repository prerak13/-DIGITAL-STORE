import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import Navigation from "./Components/Navigation";
import Home from "./Components/Home/Home";
import SignUp from "./Components/UserAuth/SignUp";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ListProducts from "./Components/Product/ListProducts";
import ProductDetails from "./Components/Product/ProductDetails";
import AddProduct from "./Components/Product/AddProduct";
import OrderManagement from "./Components/Order/OrderManagement";
import ViewOrders from "./Components/Order/ViewOrders";
import { Component } from "react";
import { Account } from "./Components/UserAuth/Accounts";
import Login from "./Components/UserAuth/Login";
import UserProfile from "./Components/UserAuth/UserProfile";
import User from "./Components/UserAuth/User";

function App() {
  return (
    <Account>
      <div className="App">
        <Navigation />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ListProducts />} />
            <Route path="/addProduct" element={<AddProduct />} />
            <Route path="/products/:id" element={<ProductDetails />} />

            <Route path="/manageOrder" element={<OrderManagement />} />
            <Route path="/viewOrders" element={<ViewOrders />} />

            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/userprofile" element={<UserProfile />} />
            <Route path="/user" element={<User />} />

            {/* <Route path="/profile">
            <Route path="/profile/:id" element={<ProfileDetails />} />
            <Route index element={<Profile />} />
          </Route> */}
          </Routes>
        </BrowserRouter>
      </div>
    </Account>
  );
}

export default App;

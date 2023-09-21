import React, { useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import "./Home.css";
import ProductCard from "./ProductCard.js";
import MetaData from "../layout/MetaData";
import { clearErrors, getProduct } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";


const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, products } = useSelector((state) => state.products);

  const viewAllProducts = () => {
    navigate("/products");
  }

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    // toast.success("Product Loaded Successfully");
    dispatch(getProduct());

  }, [dispatch, error]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={"Cart Bliss"} />
          {/* <div className="banner">
            <h1>SAVE MORE WITH US!</h1>

            <a href="#container">
              <button>
                Featured <CgMouse />
              </button>
            </a>
          </div> */}

          <div className="banner">
            <div className="banner-content">
              <h1>Welcome to Cart Bliss</h1>
              <p>Your One-Stop Shop for Amazing Deals</p>
              <a href="#container">
                <button>
                  Explore Now <CgMouse />
                </button>
              </a>
            </div>
          </div>


          <h2 className="homeHeading">Featured Products</h2>

          <div className="container" id="container">
            {products &&
              products.map((product, index) => (
                <ProductCard key={index} product={product} />
              ))}
          </div>
          <div className="btn-div">
            <button className="showmorebtn" onClick={viewAllProducts}>View All Products</button>
          </div>
        </>
      )}</>
  );
};

export default Home;


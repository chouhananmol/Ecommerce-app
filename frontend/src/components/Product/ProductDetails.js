import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Carousel from "react-material-ui-carousel";
import { Rating } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProductDetails } from "../../actions/productAction";
import Loader from "../layout/Loader/Loader";
import { toast } from "react-hot-toast";
import MetaData from "../layout/MetaData";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import "./ProductDetails.css";
import ReviewCard from "./ReviewCard.js";
import { addToCart } from "../../actions/cartAction";
import { NEW_REVIEW_RESET } from "../../constants/productConstants";
import { newReview } from "../../actions/productAction";

import ProductAlt from "../../images/logo2.jpeg"

const ProductDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [open, setOpen] = useState(false);

  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  const { success, error: reviewError } = useSelector(state => state.newReview);

  const options = {
    size: "large",
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };

  const increaseQty = () => {
    if (product.Stock <= quantity) return;
    const qty = quantity + 1;
    setQuantity(qty);
  };

  const decreaseQty = () => {
    if (quantity <= 1) return;
    const qty = quantity - 1;
    setQuantity(qty);
  };

  const addToCartHandler = () => {
    if (product.Stock <= 0) {
      toast.error("Product is out of stock!");
      return;
    }
    dispatch(addToCart(id, quantity));
    toast.success("Product Added to Cart!");
  };

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };
  const reviewSubmitHandler = () => {
    const reviewData = {
      rating: rating,
      comment,
      productId: id
    }
    dispatch(newReview(reviewData));
    setOpen(false);
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      toast.success("Review Submitted Successfully");
      dispatch({ type: NEW_REVIEW_RESET });
    }

    if (reviewError) {
      toast.error(reviewError);
      dispatch(clearErrors());
    }

    dispatch(getProductDetails(id));
  }, [dispatch, id, error, success, reviewError]);

  return (
    <>
      {loading ? <Loader /> : (
        <Fragment>
          <MetaData title={`${product.name} - Cart Bliss`} />

          <div className="ProductDetails">
            <div>
              <Carousel className="corouselStyle" autoplay={false}>
                {product &&
                  product.images &&
                  product.images.length > 0 ? (product.images.map((item, i) => (
                    <img
                      className="CarouselImage"
                      key={i}
                      src={item.url}
                      alt={`${i} Slide`}
                    />
                  ))) : (
                  <img
                    className="CarouselImage"
                    src={ProductAlt}
                    alt="Default Slide"
                  />
                )
                }
              </Carousel>
            </div>
            <div>
              <div className="detailsBlock-1">
                <h2> {product.name}</h2>
                <p>Cart Bliss # {product._id}</p>
              </div>
              <div className="detailsBlock-2">
                <Rating {...options} />
                <span className="detailsBlock-2-span">
                  ({product.numOfReviews} Reviews)
                </span>
              </div>
              <div className="detailsBlock-3">
                <h1>{`$${product.price}`}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button onClick={decreaseQty}>-</button>
                    <input readOnly type="number" value={quantity} />
                    <button onClick={increaseQty}>+</button>
                  </div>
                  <button
                    onClick={addToCartHandler}
                  >
                    Add to Cart
                  </button>
                </div>
                <p>
                  Status:
                  <b className={product.Stock > 0 ? "greenColor" : "redColor"}>
                    {product.Stock > 0 ? ` InStock` : " Out Of Stock"}
                  </b>
                  <b>{` --  ${product.Stock} left`} </b>
                </p>
              </div>
              <div className="detailsBlock-4">
                Description: <p>{product.description}</p>
              </div>
              <button
                onClick={submitReviewToggle}
                className="submitReview">
                Submit Your Review
              </button>
            </div>
          </div>

          <h3 className="reviewsHeading">REVIEWS</h3>
          <Dialog
            area-labelledby="alert-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle id="alert-dialog-title">{"Submit Your Review"}</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />
              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                onChange={(e) => setComment(e.target.value)}
                value={comment}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={submitReviewToggle}
                color="secondary" autoFocus>
                Cancel
              </Button>
              <Button
                onClick={reviewSubmitHandler}
                color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>
          {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews && product.reviews.map((review, i) => (
                <ReviewCard key={i} review={review} />
              ))}
            </div>
          ) : (
            <p className="noReviews">No Reviews</p>
          )}
        </Fragment>
      )}
    </>
  );
};

export default ProductDetails;

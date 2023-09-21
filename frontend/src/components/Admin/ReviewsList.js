import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./ReviewList.css";
import {
  getProductReviews,
  deleteReview,
  clearErrors,
} from "../../actions/productAction";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { DELETE_REVIEW_RESET } from "../../constants/productConstants";
import { Button } from "@mui/material";
import MetaData from "../layout/MetaData";
import DeleteIcon from "@mui/icons-material/Delete";
import Star from "@mui/icons-material/Star";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router";

const ReviewsList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, reviews } = useSelector(
    (state) => state.productReviews
  );
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.deleteReviewReducer
  );

  const [productId, setProductId] = useState("");

  const deleteHandler = (reviewId) => {
    dispatch(deleteReview(reviewId, productId));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(getProductReviews(productId));
  };

  useEffect(() => {
    if (productId.length === 24) {
      dispatch(getProductReviews(productId));
    }
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (deleteError) {
      toast.error(deleteError);
      dispatch(clearErrors());
    }
    if (isDeleted) {
      toast.success("Review deleted successfully");
      navigate("/admin/reviews");
      dispatch({ type: DELETE_REVIEW_RESET });
    }
  }, [dispatch, error, deleteError, isDeleted, navigate, productId]);

  const columns = [
    { field: "id", headerName: "Review ID", minWidth: 180 },

    { field: "comment", headerName: "Comment", minWidth: 150, flex: 0.7 },
    { field: "user", headerName: "User", minWidth: 100 },
    {
      field: "rating",
      headerName: `Rating`,
      type: "number",
      minWidth: 80,
      renderCell: (params) => {
        return params.row.rating >= 3 ? (
          <div style={{ color: "green" }}>{params.row.rating}</div>
        ) : (
          <div style={{ color: "red" }}>{params.row.rating}</div>
        );

      },
    },

    {
      field: "actions",
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button onClick={() => deleteHandler(params.row.id)}>
              <DeleteIcon />
            </Button>
          </>
        );
      },
    },
  ];
  const rows = [];
  reviews &&
    reviews.forEach((review) => {
      rows.push({
        id: review._id,
        rating: review.rating,
        comment: review.comment,
        user: review.name,
      });
    });

  return (
    <>
      <MetaData title={"All Reviews --Admin"} />
      <div className="dashboard">
        <Sidebar />
        <div className="productReviewsContainer">
          <form className="productReviewsForm" onSubmit={submitHandler}>
            <h1 className="productReviewsFormHeading">All Reviews</h1>
            <div>
              <Star />
              <input
                type="text"
                placeholder="Product_id"
                required
                name="productId"
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
              />
            </div>
            <Button
              id="createProductBtn"
              type="submit"
              disabled={
                loading ? true : false || productId === "" ? true : false
              }
            >
              Search
            </Button>
          </form>
          {reviews && reviews.length > 0 ? (
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableRowSelectionOnClick
              className="productListTable"
              autoHeight
            />
          ) : (
            <h1 className="productReviewsFormHeading">No Reviews Found</h1>
          )}
        </div>
      </div>
    </>
  );
};

export default ReviewsList;

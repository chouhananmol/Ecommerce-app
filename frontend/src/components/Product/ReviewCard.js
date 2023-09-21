import { Rating } from "@mui/material";
import React from "react";
import profile from "../../images/Profile1.webp";

const ReviewCard = ({ review }) => {
    const options = {
        value: review.rating,
        readOnly: true,
        precision: 0.5,
        size:"medium",
    };

    return (
        <div className="reviewCard">
            <img src={profile} alt="User" />
            <p>{review.name}</p>
            <Rating {...options} />
            <span className="reviewCardComment">{review.comment}</span>
        </div>
    );
};
export default ReviewCard;
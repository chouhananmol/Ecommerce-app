import React from 'react';
import { Link } from 'react-router-dom';
import { Rating } from "@mui/material";
import ProductAlt from "../../images/logo2.jpeg"


const ProductCard = ({product}) => {
  const options = {
      size: "large",
      value: product.ratings,
      readOnly: true,
      precision: 0.5,
    };


  return (
   <Link className="productCard" to={`/product/${product._id}`}>
<img src={(product?.images[0])?product?.images[0]?.url:ProductAlt} alt ={product.name} />
    <p>{product.name}</p>
    <div>
<Rating {...options} /><span className='productCardSpan'>({product.numOfReviews} reviews)</span>
    </div>
    <span style={{color:"#001a14"}}>{`$${product.price}`}</span>
    </Link>
  )
}

export default ProductCard;

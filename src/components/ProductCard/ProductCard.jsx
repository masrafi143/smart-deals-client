import React from "react";
import { Link } from "react-router";

const ProductCard = ({ product }) => {
  console.log(product);
  const { _id, title, price_min, price_max, image } = product;
  return (
    <div className="card bg-base-100 shadow-sm">
      <figure className="px-3 pt-3">
        <img
          src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
          alt="Shoes"
          className="rounded-xl"
        />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{title}</h2>
        <p>
          A card component has a figure, a body part, and inside body there are
          title and actions parts
        </p>
        <div className="card-actions">
            <Link to={`/productDetails/${_id}`} className="btn btn-primary">View more..</Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

import React from "react";
import { useHistory } from "react-router-dom";
import "./ProductItem.css";

function ProductItem({ product, clickHandler, addToCartHandler }) {
  const history = useHistory();
  const navigateToDetail = () => {
    clickHandler();
    history.push("/details");
  };

  const addToCart = (event) => {
    event.stopPropagation();
    addToCartHandler();
  };
  return (
    <div className="product-item" onClick={navigateToDetail}>
      <img src={product.img} alt="prodImage" />
      <div className="prod-info">
        <h3>{product.title}</h3>
        <p className="price">${product.price}</p>
      </div>
      <div className={product.inCart ? "cart-icon disabled" : "cart-icon"}>
        {product.inCart ? (
          <strong>In Cart</strong>
        ) : (
          <i className="fas fa-cart-arrow-down fa-2x" onClick={addToCart}></i>
        )}
      </div>
    </div>
  );
}

export default ProductItem;

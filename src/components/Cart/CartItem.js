import React from "react";
import "./CartItem.css";

const CartItem = ({
  product,
  handleDecrease,
  handleIncrease,
  handleDelete,
}) => {
  return (
    <div className="cartItem">
      <div className="product product-info">
        <img src={product.img} alt="" width="100px" />
        <div className="info">
          <h3>{product.title}</h3>
          <p>{product.company}</p>
          <p>${product.price}</p>
        </div>
      </div>
      <div className="qty">
        <i className="far fa-minus-square" onClick={handleDecrease}></i>
        <span className="count">{product.count}</span>
        <i className="far fa-plus-square" onClick={handleIncrease}></i>
      </div>
      <div className="amount">${product.total}</div>
      <div className="actions">
        <i
          className="fas fa-trash-alt fa-2x"
          onClick={handleDelete}
          style={{ cursor: "pointer" }}
        ></i>
      </div>
    </div>
  );
};

export default CartItem;

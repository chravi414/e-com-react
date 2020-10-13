import React from "react";
import "./OrderSummary.css";

const OrderSummary = ({ summary }) => {
  return (
    <div className="order-summary">
      <div className="subtotal">
        <p className="text">Subtotal</p>
        <p className="value">${summary.subtotal}</p>
      </div>
      <div className="tax">
        <p className="text">Tax (14%)</p>
        <p className="value">${summary.tax}</p>
      </div>
      <div className="total">
        <p className="text">Total</p>
        <p className="value">${summary.total}</p>
      </div>
    </div>
  );
};

export default OrderSummary;

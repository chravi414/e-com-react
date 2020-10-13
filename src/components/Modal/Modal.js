import React from "react";
import { Link } from "react-router-dom";
import { ProductConsumer } from "../../data/Context";
import "./Modal.css";

const Modal = () => {
  return (
    <ProductConsumer>
      {(value) => {
        const product = value.modalProduct;
        const showModal = value.displayModal;
        if (!showModal) {
          return null;
        }
        return (
          <div className="modal">
            <div className="modal-content">
              <i className="fas fa-times" onClick={value.closeModal}></i>
              <h1>Added to Bag</h1>
              <div className="modal-product-info">
                <h3>{product.title}</h3>
                <img src={product.img} alt="" />
                <p className="price">${product.price}</p>
              </div>
              <div className="btns">
                <Link to="/" className="btn">
                  <div onClick={value.closeModal}>Continue Shopping</div>
                </Link>
                <Link to="/cart" className="btn">
                  <div onClick={value.closeModal}>Go To Cart</div>
                </Link>
              </div>
            </div>
          </div>
        );
      }}
    </ProductConsumer>
  );
};

export default Modal;

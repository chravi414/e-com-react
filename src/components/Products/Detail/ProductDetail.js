import React, { Component } from "react";
import "./ProductDetail.css";
import { ProductConsumer } from "./../../../data/Context";
import { Link } from "react-router-dom";

export default class ProductDetail extends Component {
  render() {
    // const { location } = this.props;
    // const prodId = location.state["id"];
    // console.log(prodId);
    return (
      <>
        <ProductConsumer>
          {(data) => {
            const product = data.singleProduct;
            const productItem = product ? (
              <div className="product">
                <ul className="breadcrumb">
                  <li>
                    <Link to="/">Home </Link>
                    <i className="fas fa-angle-right"></i>
                  </li>
                  <li>
                    <Link to="/products">Products </Link>
                    <i className="fas fa-angle-right"></i>
                  </li>
                  <li className="active">{product.title}</li>
                </ul>
                <div className="product-detail">
                  <img src={product.img} alt="prodImage" />
                  <div className="details">
                    <h1>{product.title}</h1>
                    <p className="sm-heading">{product.company}</p>
                    <div className="info">{product.info}</div>
                    <p className="price">${product.price}</p>
                    <button
                      className="btn"
                      onClick={() => {
                        data.cartHandler(product.id);
                        data.openModal(product.id);
                      }}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ) : null;
            return productItem;
          }}
        </ProductConsumer>
      </>
    );
  }
}

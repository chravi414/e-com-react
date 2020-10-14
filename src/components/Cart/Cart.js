import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Title } from "../Title";
import CartItem from "./CartItem";
import "./Cart.css";
import { ProductConsumer } from "./../../data/Context";
import OrderSummary from "./../OrderSummary/OrderSummary";
import Payment from "../Payment/Payment";

export default class Cart extends Component {
  state = {
    paymentErrorMsg: "",
  };
  render() {
    return (
      <ProductConsumer>
        {(data) => {
          const {
            cart,
            decreaseHandler,
            increaseHandler,
            deleteHandler,
            summary,
            clearCartHandler,
          } = data;
          if (cart.length === 0) {
            return (
              <div className="empty-cart">
                <h4>There are no products in your cart.</h4>
                <Link className="btn" to="/">
                  Go to Products
                </Link>
              </div>
            );
          }
          return (
            <div className="cart">
              <Title title="My Cart" />
              {this.state.paymentErrorMsg && (
                <p className="error">{this.state.paymentErrorMsg}</p>
              )}
              <div className="cart-header">
                <div className="product">
                  <h2>Product</h2>
                </div>
                <div className="qty">
                  <h2>Quantity</h2>
                </div>
                <div className="amount">
                  <h2>Amount</h2>
                </div>
                <div className="actions"></div>
              </div>
              {cart.map((prod) => (
                <CartItem
                  key={prod.id}
                  product={prod}
                  handleDecrease={() => decreaseHandler(prod.id)}
                  handleIncrease={() => increaseHandler(prod.id)}
                  handleDelete={() => deleteHandler(prod.id)}
                />
              ))}
              <div className="summary">
                <OrderSummary summary={summary} />
              </div>
              <div className="payment">
                <Payment
                  total={summary.total}
                  history={this.props.history}
                  successHandler={clearCartHandler}
                  errorHandler={(msg) =>
                    this.setState({ paymentErrorMsg: msg })
                  }
                />
              </div>
            </div>
          );
        }}
      </ProductConsumer>
    );
  }
}

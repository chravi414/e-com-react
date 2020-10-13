import React, { Component, createContext } from "react";
import { storeProducts, detailProduct } from "./data";

const ProductContext = createContext();

const TAX_RATE = 14;

export class ProductProvider extends Component {
  state = {
    products: [],
    singleProduct: detailProduct,
    cart: [],
    displayModal: false,
    modalProduct: [],
    summary: {
      subtotal: 0,
      tax: 0,
      total: 0,
    },
  };

  getItem = (id) => {
    return this.state.products.find((item) => item.id === id);
  };

  navigateToDetail = (id) => {
    console.log(id);
    this.setState({ singleProduct: this.getItem(id) });
  };

  addItemToCart = (id) => {
    const tempProducts = [...this.state.products];
    const index = tempProducts.indexOf(this.getItem(id));
    const product = tempProducts[index];
    product.count = 1;
    product.total = product.price * product.count;
    product.inCart = true;
    tempProducts[index] = product;
    this.setState(
      {
        products: tempProducts,
        cart: [...this.state.cart, product],
      },
      () => {
        console.log(this.state);
        this.calculateTotals();
      }
    );
  };

  decreaseCount = (cartItemId) => {
    const tempCartProducts = [...this.state.cart];
    const prodIndex = tempCartProducts.indexOf(this.getItem(cartItemId));
    const product = tempCartProducts[prodIndex];
    product.count = product.count - 1;
    if (product.count === 0) {
      tempCartProducts.splice(prodIndex, 1);
      this.resetStatus(cartItemId);
    } else {
      product.total = product.count * product.price;
      tempCartProducts[prodIndex] = product;
    }
    this.setState({ cart: tempCartProducts }, () => {
      console.log(this.state);
      this.calculateTotals();
    });
  };

  increaseCount = (cartItemId) => {
    const tempCartProducts = [...this.state.cart];
    const prodIndex = tempCartProducts.indexOf(this.getItem(cartItemId));
    const product = tempCartProducts[prodIndex];
    product.count = product.count + 1;
    product.total = product.count * product.price;
    tempCartProducts[prodIndex] = product;
    this.setState({ cart: tempCartProducts }, () => {
      console.log(this.state);
      this.calculateTotals();
    });
  };

  deleteItemFromCart = (itemId) => {
    const tempCartProducts = [...this.state.cart];
    const prodIndex = tempCartProducts.indexOf(this.getItem(itemId));
    tempCartProducts.splice(prodIndex, 1);
    this.resetStatus(itemId);
    this.setState({ cart: tempCartProducts }, () => this.calculateTotals());
  };

  resetStatus = (prodId) => {
    const tempProducts = [...this.state.products];
    const prodIndex = tempProducts.indexOf(this.getItem(prodId));
    tempProducts[prodIndex].inCart = false;
    this.setState({ products: tempProducts });
  };

  calculateTotals = () => {
    const cartItems = [...this.state.cart];
    const subtotal = cartItems.reduce((result, item) => result + item.total, 0);
    const tax = +(subtotal * (TAX_RATE / 100)).toFixed(2);
    const total = +(subtotal + tax).toFixed(2);
    this.setState({
      summary: {
        subtotal,
        tax,
        total,
      },
    });
  };

  openModal = (id) => {
    const product = this.getItem(id);
    this.setState({
      modalProduct: product,
      displayModal: true,
    });
  };

  closeModal = () => {
    this.setState({
      displayModal: false,
    });
  };

  setProducts = () => {
    let tempProducts = [];
    storeProducts.forEach((item) => {
      const singleItem = { ...item };
      tempProducts = [...tempProducts, singleItem];
    });
    this.setState({
      products: tempProducts,
    });
  };

  componentDidMount() {
    this.setProducts();
  }

  tester = () => {
    console.log("State Products ", this.state.products[0].inCart);
    console.log("Actual Products ", storeProducts[0].inCart);
    let tempProducts = [...this.state.products];
    tempProducts[0].inCart = true;
    this.setState(
      {
        products: tempProducts,
      },
      () => {
        console.log("State Products ", this.state.products[0].inCart);
        console.log("Actual Products ", storeProducts[0].inCart);
      }
    );
  };

  render() {
    return (
      <ProductContext.Provider
        value={{
          ...this.state,
          detailHandler: this.navigateToDetail,
          cartHandler: this.addItemToCart,
          openModal: this.openModal,
          closeModal: this.closeModal,
          decreaseHandler: this.decreaseCount,
          increaseHandler: this.increaseCount,
          deleteHandler: this.deleteItemFromCart,
          totalCalculator: this.calculateTotals,
        }}
      >
        {this.props.children}
        {/* <button onClick={this.tester}>Test Me</button> */}
      </ProductContext.Provider>
    );
  }
}

export const ProductConsumer = ProductContext.Consumer;

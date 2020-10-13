import React, { Component, createContext } from "react";
import { storeProducts, detailProduct } from "./data";

const ProductContext = createContext();

export class ProductProvider extends Component {
  state = {
    products: [],
    singleProduct: detailProduct,
    cart: [],
    displayModal: false,
    modalProduct: [],
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
      }
    );
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
        }}
      >
        {this.props.children}
        {/* <button onClick={this.tester}>Test Me</button> */}
      </ProductContext.Provider>
    );
  }
}

export const ProductConsumer = ProductContext.Consumer;

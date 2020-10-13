import React, { Component } from "react";
import { ProductConsumer } from "../../../data/Context";

import { Title } from "../../Title";
import ProductItem from "./../ProductItem";
import "./ProductList.css";

export default class ProductList extends Component {
  render() {
    return (
      <div>
        <Title title="Our Products" />
        <div className="products">
          <ProductConsumer>
            {(data) => {
              return data.products.map((product) => {
                return (
                  <>
                    <ProductItem
                      key={product.id}
                      addToCartHandler={() => {
                        data.cartHandler(product.id);
                        data.openModal(product.id);
                      }}
                      clickHandler={() => data.detailHandler(product.id)}
                      product={product}
                    />
                  </>
                );
              });
            }}
          </ProductConsumer>
        </div>
      </div>
    );
  }
}

import React from "react";
import "./App.css";
// import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/Navbar/Navbar";
import ProductList from "./components/Products/List/ProductList";
import ProductDetail from "./components/Products/Detail/ProductDetail";
import Cart from "./components/Cart/Cart";
import PageNotFound from "./components/PageNotFound/PageNotFound";

import { Switch, Route, Redirect } from "react-router-dom";
import Modal from "./components/Modal/Modal";

function App() {
  return (
    <>
      <div className="container">
        <Navbar />
        <Switch>
          <Route path="/" component={ProductList} exact />
          <Route path="/products">
            <Redirect to="/" />
          </Route>
          <Route path="/details" component={ProductDetail} />
          <Route path="/cart" component={Cart} />
          <Route path="**" component={PageNotFound} />
        </Switch>
        <Modal />
      </div>
    </>
  );
}

export default App;

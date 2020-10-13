import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class PageNotFound extends Component {
  render() {
    const { location } = this.props.history;
    return (
      <div className="pageNotFound">
        <h1>Page Not Found</h1>
        <p>
          The requested url{" "}
          <span style={{ color: "crimson" }}>{location.pathname}</span> is not
          found.
        </p>
        <Link to="/" class="btn">
          Back to Products
        </Link>
      </div>
    );
  }
}

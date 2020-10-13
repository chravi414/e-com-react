import React, { Component } from 'react';
import './Navbar.css';
import {Link} from 'react-router-dom';
import logo from './../../logo.svg';


export default class NavbarComponent extends Component {
  state = {
    isMenuOpen : false
  }

  toggleMenu = () => {
    this.setState({isMenuOpen: !this.state.isMenuOpen})
  }
  
  render() {
    let showClass = ['right-menu']
    if (this.state.isMenuOpen) {
      showClass.push('show');
    } 
    return (
      <nav className="main-menu">
        <div className="menu-btn">
          <i className="fas fa-bars fa-2x" onClick={this.toggleMenu}></i>
        </div>
        <Link className="logo" to="/"><img src={logo} alt="Logo"/></Link>
          <h1>React ECommerce Site</h1>
          <ul className={showClass.join(" ")}>
          <li>
              <Link to="/" className="nav-link">Products</Link>
            </li>
            <li>
              <Link to="/" className="nav-link">Sign Up</Link>
            </li>
            <li>
              <Link to="/" className="nav-link">Login</Link>
            </li>
            <li>
              <Link to="/cart" className="nav-link"><i className="fas fa-cart-arrow-down fa-2x"></i></Link>
            </li>
          </ul>
      </nav>
    );
  }
}

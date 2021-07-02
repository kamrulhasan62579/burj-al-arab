import React from 'react';
import './Header.css';
import {
  MDBNavbar,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBContainer,
  MDBIcon,
  MDBNavbarToggler } from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';


 const Header = () => {

  return (
   <div>
       <nav>
         <ul>
           <li>
             <Link to="/home">Home</Link>
           </li>
           <li>
             <Link to="/login">Login</Link>
           </li>
           <li>
             <Link to="/book">Book</Link>
           </li>
         </ul>
       </nav>
   </div>
  );
}

export default Header;
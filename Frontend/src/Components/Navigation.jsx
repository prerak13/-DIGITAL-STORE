import React from "react";

import {
  Navbar,
  NavItem,
  NavbarToggler,
  Collapse,
  NavLink,
  Nav,
  NavbarBrand,
} from "reactstrap";

const Navigation = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">Brand</NavbarBrand>
        <NavbarToggler
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/">Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/products">Products</NavLink>
            </NavItem>

            {localStorage.getItem("isAdmin") === "true" ? (
              <>
                <NavItem>
                  <NavLink href="/addProduct">Add Product</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/manageOrder">Order Management</NavLink>
                </NavItem>
              </>
            ) : (
              <>
                <NavItem>
                  <NavLink href="/userprofile">Login</NavLink>
                </NavItem>

                <NavItem>
                  <NavLink href="/viewOrders">My Orders</NavLink>
                </NavItem>
              </>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};
//https://www.geeksforgeeks.org/reactjs-reactstrap-navbar-component/
export default Navigation;

import React from "react";
import {Navbar, NavbarBrand} from "reactstrap";

const NavBar = () => {
    return (
        <div>
            <Navbar className={"header"}>
                <NavbarBrand>back</NavbarBrand>
            </Navbar>
        </div>
    )
}

export default NavBar;

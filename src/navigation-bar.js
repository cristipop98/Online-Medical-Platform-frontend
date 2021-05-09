import React,{useState} from 'react'
import logo from './commons/images/icon.png';
import login from './login/login';
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
} from 'react-router-dom';

import {Button, Container, Jumbotron} from 'reactstrap';

import {
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Nav,
    Navbar,
    NavbarBrand,
    NavLink,
    UncontrolledDropdown
} from 'reactstrap';

const textStyle = {
    color: 'white',
    textDecoration: 'none'
};

const NavigationBar = () => (
    <div>
        <Navbar color="dark" light expand="md">
            <NavbarBrand href="/">
                <img src={logo} width={"50"}
                     height={"35"} />
            </NavbarBrand>
            <Nav className="mr-auto" navbar>

                <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle style={textStyle} nav caret>
                       Menu
                    </DropdownToggle>
                    <DropdownMenu right >

                        <DropdownItem>
                            <NavLink href="/person">Persons</NavLink>
                        </DropdownItem>

                         <DropdownItem>
                            <NavLink href="/patient">Patients</NavLink>
                         </DropdownItem>

                         <DropdownItem>
                            <NavLink href="/caregiver">Caregivers</NavLink>
                         </DropdownItem>

                          <DropdownItem>
                            <NavLink href="/medication">Medications</NavLink>
                          </DropdownItem>

                          <DropdownItem>
                            <NavLink href="/medicationPlan">MedicationPlan</NavLink>
                          </DropdownItem>


                    </DropdownMenu>
                </UncontrolledDropdown>

                 <span className="input-group-btn">
                   <Link to="/login">Click to login</Link>
                 </span>

            </Nav>
        </Navbar>
    </div>
);

export default NavigationBar

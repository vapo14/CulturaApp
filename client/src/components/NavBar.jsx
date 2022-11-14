import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import "../css/navbar.css";
import addButton from "../assets/icons/add-icon.svg";
import savedIcon from "../assets/icons/saved-icon.svg";
import {
  Navbar,
  Container,
  Nav,
  NavDropdown,
  Badge,
  Image,
} from "react-bootstrap";

export default function NavBar() {
  const { logout, UserData } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Navbar className="navbar" fixed="top" variant="dark" collapseOnSelect>
      <Container>
        <Navbar.Brand>
          <Link to="/home">
            <h3 id="navbar-main-link">Expresa-Tec</h3>
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav>
            <NavDropdown
              title={
                UserData.username.length > 10
                  ? UserData.username.substr(0, 10) + "..."
                  : UserData.username
              }
              id="collasible-nav-dropdown"
            >
              <Link to="/user/posts" className="dropdown-item">
                My Posts
              </Link>
              <NavDropdown.Item href="" disabled>
                Settings <Badge bg="secondary">Coming Soon</Badge>
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="" onClick={handleLogout}>
                LogOut
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

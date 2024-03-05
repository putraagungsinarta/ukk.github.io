import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import axios from 'axios';

export default function NavBar() {
const history = useNavigate();
  const handleLogout = () => {
    axios.post('/logout')
      .then(() => {
        localStorage.removeItem('token');
        history('/');
      })
      .catch((error) => {
        console.error('Logout error:', error);
      });
  };


    return (
<nav>
      {['xxl'].map((expand) => (
        <Navbar key={expand} expand={expand} className="bg-body-tertiary">
          <Container fluid>
            <Navbar.Brand href="/">
            Malang City Library</Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="start"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Perpustakaan
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
            <Nav variant="pills" className="justify-content-start flex-grow-1 pe-3">
              <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link eventKey="link-1" href="/login">Login</Nav.Link>
                  <Nav.Link eventKey="link-2" href="/register">Register</Nav.Link>
                  <NavDropdown
                    title="Sign In"
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                  >
                    <NavDropdown.Item href="/login">
                      Login
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/register">
                      Register
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/">
                      Home Page
                    </NavDropdown.Item>
                  </NavDropdown>
                  </Nav>
                </Nav>
                  <Button variant="outline-dark" onClick={handleLogout}>Logout</Button>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </nav>
        
    )
}
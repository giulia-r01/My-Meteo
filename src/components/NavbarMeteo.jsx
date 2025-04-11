import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap"
import { Link, useLocation } from "react-router-dom"

const NavbarMeteo = function () {
  const location = useLocation()
  console.log(location)
  return (
    <>
      <header>
        <Navbar expand="lg" className="mynav" data-bs-theme="dark">
          <Container>
            <Link className="navbar-brand" to="/index">
              <em>MyMeteo</em>
            </Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Link
                  className={
                    location.pathname === "/index"
                      ? "nav-link active"
                      : "nav-link"
                  }
                  to="/index"
                >
                  Home
                </Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
    </>
  )
}
export default NavbarMeteo

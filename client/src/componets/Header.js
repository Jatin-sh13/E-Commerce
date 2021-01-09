import React from 'react'
import { Nav, Navbar, Container, NavDropdown, DropdownItem } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../Action/Login'
const Header = () => {
    const dispatch = useDispatch()
    const userInfo = useSelector(state => state.user)
    const { user, token } = userInfo
    const Logouthandler = () => {
        dispatch(logout())
    }
    return (
        <div>
            <div>
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Container>
                        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="ml-auto">
                                <Nav.Link href="/cart">
                                    <i class="fas fa-shopping-cart"></i>
                                    Cart</Nav.Link>
                                {user && token !== null ? <NavDropdown title={user.name}>
                                    <NavDropdown.Item>
                                        Profile
                                    </NavDropdown.Item>
                                    <NavDropdown.Item onClick={Logouthandler}>
                                        Logout
                                    </NavDropdown.Item>
                                </NavDropdown> :
                                    <Nav.Link href="/login">
                                        <i class="fas fa-user"></i>
                                    Login</Nav.Link>}
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
        </div>
    )
}

export default Header

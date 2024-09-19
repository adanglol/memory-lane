import {React,useState} from 'react';
import {Navbar,Nav,Form,Button,InputGroup,Row,Col} from 'react-bootstrap';
import {Link, NavLink} from 'react-router-dom';
import '../App.css';
import '../index.css';  // or the relevant path to your CSS file
import logo from '../img/logo192.png';
import { useAuth} from '../Components/Auth/AuthProvider'

export default function NavBar(){
    const {isAuthenticated,logout} = useAuth();

    return (
        <>
            <Navbar bg="dark" variant="dark" expand="lg" className='px-5' id = 'nav' fixed='top'>

                {!isAuthenticated ? (
                    <Navbar.Brand href="#home" className='fs-1' as={Link} to='/'>
                        <img src={logo} alt="logo" id="logo"/>
                        MemoryLane
                    </Navbar.Brand>
                ) : (
                    <Navbar.Brand href="#home" className='fs-1' as = {Link} to='/hub'>
                        <img src={logo} alt="logo" id="logo"/ >
                        MemoryLane
                    </Navbar.Brand>
                )}
                
                <Navbar.Toggle aria-controls="navbar-nav"/>
                    <Navbar.Collapse id="navbar-nav" className="justify-content-end">
                        <Nav>
                            <Nav.Link className='fs-2' as= {NavLink} to='/about'>About</Nav.Link>
                            {!isAuthenticated ? (
                                <>
                                    <NavLink
                                    to = '/login'
                                    className = {({isActive}) =>
                                        isActive ? 'btn fs-2 cta active' : 'btn fs-2 cta'
                                    }
                                    >
                                    Get Started

                                    </NavLink>
                                </>
                            ) : (
                                <>
                                    <NavLink
                                    to="/hub"
                                    className={({ isActive }) =>
                                        isActive ? 'btn fs-2 cta active' : 'btn fs-2 cta'
                                    }
                                    >
                                    Hub
                                </NavLink>
                                    <Link to = "/" onClick={logout} className="btn fs-2 cta">Logout</Link>
                                </>
                            )}
                        </Nav>
                    </Navbar.Collapse>
            </Navbar>
        </>
    );
        
}
import {React,useState} from 'react';
import {Navbar,Nav,Form,Button,InputGroup,Row,Col} from 'react-bootstrap';
import {Link, NavLink} from 'react-router-dom';
import '../App.css';
import '../index.css';  // or the relevant path to your CSS file

import logo from '../img/logo192.png';

import handleLogout from './logout';

export default function NavBar(){
    const token = sessionStorage.getItem('token');

    return (
        <>
            <Navbar bg="dark" variant="dark" expand="lg" className='px-5' id = 'nav' fixed='top'>
            <Navbar.Brand href="#home" className='fs-1' as={Link} to='/'>
            <img src={logo} alt="logo" id="logo"/>
            MemoryLane
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbar-nav"/>
            <Navbar.Collapse id="navbar-nav" className="justify-content-end">
                <Nav>
                    <Nav.Link className='fs-2' as= {NavLink} to='/about'>About</Nav.Link>
                    {/* {!token} */}
                    {/* <Button className = "fs-2 cta" as={NavLink} to='/login'>Get Started</Button>  */}


                    {!token ? (
                        <Link to="/login" className="btn fs-2 cta">Get Started</Link>
                    ) : (
                        <Link to="/" onClick={handleLogout} className="btn fs-2 cta">Logout</Link>
                    )}
                    
                     

                </Nav>
            </Navbar.Collapse>
            </Navbar>
        </>
    );
        
}
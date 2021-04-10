import React from 'react';

//Bootstrap
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import { Icon, Grid, Sticky } from 'semantic-ui-react'

const MyNavbar = () => (
	<Sticky>
	<Navbar expand="lg" variant="dark" style={navBar}>
		<Navbar.Brand href="/" className='font-weight-bold' style={navLogo}>SonosAnnounce</Navbar.Brand>
	  	<Nav className="mr-auto">
	    </Nav>

	</Navbar>
	</Sticky>
);

const navLogo = {
	"color": '#FFFFFF',
}

const navBar = {
  "background": '#1d1e22',
}

const navButton = {
	"color": 'white',
}

const navIcon = {
	"color": 'white',
}
export default MyNavbar;

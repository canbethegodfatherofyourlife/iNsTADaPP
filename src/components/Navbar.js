import React, { useState, useEffect } from 'react'
import '../App.css';
import { Container, Navbar, Button } from 'react-bootstrap'
import { FaAffiliatetheme } from "react-icons/fa";
import { useMoralis } from "react-moralis";

const Navbar1 = () => {

  const { authenticate, isAuthenticated, user, logout, isAuthenticating } = useMoralis();

  const [ theme, setTheme ] = useState( 'dark-theme' )
  const [ bg, setbg ] = useState( 'light' )
  const [ variant, setvariant ] = useState( 'light' )
  useEffect( () => {
    document.body.className = theme;
  }, [ theme ] )

  const themeChange = () => {
    if ( theme === 'light-theme' ) {
      setTheme( 'dark-theme' )
      setbg( 'light' )
      setvariant( 'light' )
    }
    else {
      setTheme( 'light-theme' )
      setbg( 'dark' )
      setvariant( 'dark' )
    }
  }
  const logOut = async () => {
    await logout();
    console.log( "logged out" );
  }

  return (
    <Navbar bg={ bg } variant={ variant }>
      <Container>
        <Navbar.Brand href="#home">InSTAdAPP</Navbar.Brand>
        <Navbar.Toggle />

        { !isAuthenticated && (
          <Navbar.Collapse className="justify-content-end">
            <Button variant="info" className="button1" onClick={ authenticate }>Connect Wallet</Button>
          </Navbar.Collapse>
        ) }

        { isAuthenticated && (
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              Signed in as: <span className="heading">{ user.get( 'ethAddress' ).substring( 0, 5 ) + "..." + user.get( 'ethAddress' ).substring( user.get( 'ethAddress' ).length - 5, user.get( 'ethAddress' ).length ) }</span>
            </Navbar.Text>
            <Button variant="info" className="button1" onClick={ logOut } disabled={ isAuthenticating }>Logout</Button>
          </Navbar.Collapse>
        ) }

        <FaAffiliatetheme className='icon' onClick={ () => themeChange() } />
      </Container>
    </Navbar>
  )
}

export default Navbar1
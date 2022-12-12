import React, { useContext } from 'react'
import { Link, matchPath, useLocation } from 'react-router-dom'
import './NavBar.css'
import {Navbar, Container, Nav} from 'react-bootstrap'
import logo from '../../img/netflix-icon.svg'
import SearchMovie from '../searchMovie/SearchMovie'
import Notification from '../notification/Notification'
import AccountMenu from '../accountMenu/AccountMenu'
import Profile from '../profile-pack/profile/Profile'
import { closeSession, TYPE } from "../../functions/general";
import { MainContext } from '../../context/MainContext'

const NavBar = (props) => {
    const thisLocation = useLocation();
    const {profiles, currentProfile, changeState} = useContext(MainContext)

    let filter = props.filter.find(e => matchPath({ path: e }, thisLocation.pathname))    
    
    const getProfiles = () => {        
        return (
            profiles
            .filter(e => e.type !== 'UserAdd' && e.name !== currentProfile.name)
            .map(e => <Profile profile={e} action='M' key={e.name} class="small-icon"></Profile>)
        )
    }

    if (profiles.length === 2) {
        changeState(TYPE.currentProfile, profiles[1])
    }
        
    return ( 
        !filter && thisLocation.pathname !== '/'?
        <Navbar bg={props.isScrolled ? 'dark' : 'transparent'} variant='dark' expand='md' fixed="top" className="nav-animate-container nav-bg-transparent pt-2" >
            <Container fluid>                
                <Navbar.Brand href="/home" className="ms-5"><img className='navbar-logo' src={logo} alt="logo" /></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">                    
                        <li className="nav-item me-2">
                            <Link className="nav-link active" to="/home" >Inicio <span className="visually-hidden">(current)</span></Link>
                        </li>
                        <li className="nav-item me-2">
                            <Link className="nav-link" to="/series">Series</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/movies">Películas</Link>
                        </li>
                        <li className="nav-item me-2">
                            <Link className="nav-link" to="#">Novedades populares</Link>
                        </li>
                        <li className="nav-item me-2">
                            <Link className="nav-link" to="/Playlist">Mi lista</Link>
                        </li>
                    </Nav>                    
                </Navbar.Collapse>
                <div className="navbar-menu-container mt-2 mt-lg-0">
                    <SearchMovie  buscar={props.buscar} />
                    <Notification></Notification>
                    <AccountMenu>
                        <ul className="ul">
                            {getProfiles()} 
                            <li>
                                <span className="me-3 fas fa-pencil"></span>
                                <Link className="text-decoration-none text-light" to="/ManageProfiles">Administrar perfiles</Link>
                            </li>
                        </ul>
                        <hr />
                        <Link className="text-decoration-none text-light" to='#' onClick={(e) => closeSession(e) }>Cerrar sesión en Netflix</Link>
                    </AccountMenu>                    
                </div>
            </Container>
        </Navbar>        
        : ''
    )
}

export default NavBar
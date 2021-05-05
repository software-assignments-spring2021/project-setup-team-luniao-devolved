import React from 'react';
import NavBar from './NavBar';
import './styles/Layout.css';
const Layout = (props) => {
    let isLoggedIn = localStorage.getItem('JWT');
    console.log({ isLoggedIn })
    return (
        <div>
            {isLoggedIn && <NavBar />}
            <main className="main-content">
                {props.children}
            </main>
        </div>
    )
}
export default Layout;
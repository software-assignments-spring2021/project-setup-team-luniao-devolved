import React from 'react';
import NavBar from './NavBar';
import './styles/Layout.css';
const Layout = (props) => {
    return (
        <>
            <NavBar />
            <main className="main-content">
                {props.children}
            </main>
        </>
    )
}
export default Layout;
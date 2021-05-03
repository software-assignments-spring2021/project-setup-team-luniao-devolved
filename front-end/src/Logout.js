import React from "react";
import { useEffect } from 'react';

import { Redirect } from 'react-router-dom';

function Logout() {
    useEffect(() => {
        if (localStorage.getItem('JWT')) {
            localStorage.removeItem('JWT');
        }
    }, []);
    return(
        <Redirect to='/'/>
    )
}

export default Logout;
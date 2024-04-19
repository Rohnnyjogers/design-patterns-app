import { useState, useEffect } from "react";
import RouteLink from "./RouteLink";
import { Link } from "react-router-dom";

export default function NavigationBar() {
    const [admin, setAdmin] = useState(false);

    useEffect(() => {
        const adminState = localStorage.getItem('admin');
        if(adminState != null){
            setAdmin(JSON.parse(adminState));
        }
    },[]);

    return (
        <nav className="navigation">
            <ul>
                {admin && <RouteLink to='/addItems'>Add Items</RouteLink>}
                {admin ? 
                    <></> 
                    : 
                    <RouteLink to='/details'>Details</RouteLink>
                }
                <RouteLink to='/shopping'>Shopping</RouteLink>
                <RouteLink to='/purchases'>Purchases</RouteLink>
                <RouteLink to='/logout'>Logout</RouteLink>
            </ul>
        </nav>
    )
}

import RouteLink from "./RouteLink";
import { Link } from "react-router-dom";

export default function NavigationBar() {
    return (
        <nav className="navigation">
            <ul>
                <RouteLink to='/details'>Details</RouteLink>
                <RouteLink to='/shopping'>Shopping</RouteLink>
                <RouteLink to='/purchases'>Purchases</RouteLink>
                <RouteLink to='/logout'>Logout</RouteLink>
            </ul>
        </nav>
    )
}

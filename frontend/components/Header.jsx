import React from "react";
import { Link, NavLink } from "react-router-dom";
import imageUrl from "/assets/images/avatar-icon.png"

export default function Header(){

    function fakeLogOut() {
        localStorage.removeItem("loggedin")
    }
    
    return (<header>
        <nav className="nav">
            <Link className="nav--logo" to="/">#Vanlife</Link>
            <div className="nav--links">
                <NavLink to="/host" className={({isActive}) => isActive ? "isActive" : null }>Host</NavLink>
                <NavLink to="/about" className={({isActive})=> isActive ? "isActive"  : null}>About</NavLink>
                <NavLink to="/vans" className={({isActive})=> isActive ? "isActive"  : null}>Vans</NavLink>
                <Link to="login" className="login-link">
                    <img 
                        src={imageUrl}
                        className="login-icon"
                    />
                </Link>
                <button onClick={fakeLogOut}>X</button>
            </div>
        </nav>
    </header>
    )
}
import React from "react";
import { Outlet } from "react-router-dom";
import { Link, NavLink } from "react-router-dom";

export default function HostLayout(){
    const styles = {
        textWeight: "bold",
        textDecoration: "underline",
        color: "#161616"
    }
    return (
        <>
            <nav className="host-nav">
                <NavLink to="." end style={({isActive}) => isActive ? styles : null}>Dashboard</NavLink>
                <NavLink to="income" style={({isActive}) => isActive ? styles : null}>Income</NavLink>
                <NavLink to="reviews" style={({isActive}) => isActive ? styles : null}>Reviews</NavLink>
                <NavLink to="vans" style={({isActive}) => isActive ? styles : null}>Vans</NavLink>
            </nav>
            <Outlet />
        </>
    )
}
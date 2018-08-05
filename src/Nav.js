import React from 'react'
import { Link } from 'react-router-dom'

function Nav() {
    return (
        <nav>
            <Link className="nav-link" to="/">Main</Link>
            <Link className="nav-link" to="/add">Add</Link>
        </nav>
    )
}

export default Nav

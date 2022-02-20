import React, { useContext } from 'react';
import { Link, useLocation ,useNavigate } from 'react-router-dom';

function Navbar(props) {
    const location = useLocation();
    const navigate = useNavigate();
    const { loggedin ,setloggedin } = props;

    const logout = ()=>{
        localStorage.removeItem('auth-token');
        setloggedin(false);
        navigate('/login');
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">iNoteBook</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={` nav-link ${location.pathname === "/" ? "active" : ""} `} aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={` nav-link ${location.pathname === "/about" ? "active" : ""} `} to="/about">About</Link>
                        </li>
                    </ul>
                    <form className="d-flex">
                        { !loggedin && <Link className="btn btn-primary mx-2" to="/login" role="button">Login <i className="fas fa-sign-in-alt"></i></Link>}
                        { !loggedin && <Link className="btn btn-primary mx-1" to="/signup" role="button">Signup <i className="fas fa-user-plus"></i></Link>}
                        { loggedin && <button className="btn btn-primary mx-1" role="button" onClick={logout} ><i className="fas fa-sign-out-alt"></i> Logout </button>}
                    </form>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;

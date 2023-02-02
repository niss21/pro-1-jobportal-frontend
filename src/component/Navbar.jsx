import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

import { logout } from '../redux/slice/UserSlice';

const Navbar = ({ search_term, setSearchTerm }) => {

  const { user } = useSelector((state) => state.user)

  const location = useLocation()

  const dispatch = useDispatch();


  return (

    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">

        <Link className="navbar-brand" to="">Home</Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">

          <ul className="navbar-nav me-auto mb-2 mb-lg-0">

            <li className="nav-item">
              <Link className="nav-link" to="/login">LogIn</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/signup">SignUp</Link>
            </li>

            {
              user?.role === "recruiter"
              &&
              <>
                <li className="nav-item">
                  <Link to="/jobs/create" className="nav-link active" aria-current="page" >create job</Link>
                </li>
              </>
            }

            {
              user?.role === "applicant"
              &&
              <>
                <li className="nav-item">
                  <Link to="/jobs/applied" className="nav-link active" aria-current="page" >Applied Jobs</Link>
                </li>
              </>
            }

          </ul>

          <div className='d-flex '>
            {
              user
              &&
              <button onClick={() => {
                localStorage.removeItem("access_token")
                dispatch(logout())
              }}>logout</button>
            }
            {
              (location.pathname === "/" || location.pathname === "/products")
              &&
              <form className="d-flex">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"
                  value={search_term}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </form>
            }
          </div>

        </div>

      </div>
    </nav>

  )
}

export default Navbar;
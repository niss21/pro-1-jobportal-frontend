import './App.css';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { BrowserRouter, Routes, Route } from "react-router-dom"

import Navbar from './component/Navbar';
import Login from './page/Login';
import Signup from './page/Signup';
import Home from './page/Home';
import Show from './page/Jobs/Show';
import Upsert from './page/Jobs/Upsert';
import AppliedJobs from './page/Jobs/Applied';
import { setUser } from './redux/slice/UserSlice';
import ProtectedRoute from './component/ProtectedRoute';

function App() {

  const dispatch = useDispatch()

  const [loading, setLoading] = useState(true)

  console.log(localStorage.getItem("token"));

  useEffect(() => {

    let access_token = localStorage.getItem("token")
    if (access_token) {
      console.log("3");
      axios.get(`${process.env.REACT_APP_SERVER_URL}/users`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
        .then(user_res => {
          console.log({ user_res })
          dispatch(setUser(user_res.data.data))
          setLoading(false)
        }).catch(err => {
          console.log(err)
          setLoading(false)
        })
    }
    else {
      setLoading(false)
    }
  }, []);

  const [search_term, setSearchTerm] = useState("");

  if (loading) {
    return <>
      <div style={{
        height: "100vh",
        width: "100vw",
        marginTop: "50vh",
        marginLeft: "auto",
        marginRight: "auto"
      }}>
        <div className="spinner-border" role="status">
          <span className="sr-only"></span>
        </div>
        <h1>please wait......</h1>
      </div>
    </>
  }
   
  console.log("1");

  return (
    <div>

      <BrowserRouter>

        <Navbar setSearchTerm={setSearchTerm} search_term={search_term} />

        <div className='Container'>

          <Routes>
            <Route path='' element={<Home search_term={search_term} />} />

            <Route path='jobs'>
              <Route index element={<Home search_term={search_term} />} />
              <Route path=':id' element={<Show />} />

              <Route element={<ProtectedRoute role="applicant" />}>
                <Route path='applied' element={<AppliedJobs />} />
              </Route>

              <Route element={<ProtectedRoute role="recruiter" />}>
                <Route path='create' element={<Upsert />} />
                <Route path='edit/:id' element={<Upsert />} />
              </Route>



            </Route>


            <Route path='Login' element={<Login />} />
            <Route path='Signup' element={<Signup />} />
          </Routes>

        </div>

      </BrowserRouter>

    </div>

  )
}

export default App;

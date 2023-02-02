import React,{ useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Spinner from "../component/Spinner";

import { setUser } from '../redux/slice/UserSlice';
import { useDispatch } from "react-redux"

const Login = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [is_submitting, setIsSubmitting] = useState(false)

    const [error, setError] = useState(null)

    const [payload, setPayload] = useState({
        email: "",
        password: "",
    })

    function handleSubmit(event) {
        event.preventDefault()
        setIsSubmitting(true)
        axios.post(`${process.env.REACT_APP_SERVER_URL}/login`, payload)
            .then(res => {
                console.log("2")

                axios.get(`${process.env.REACT_APP_SERVER_URL}/users`, {
                    headers: {
                        Authorization: `Bearer ${res.data.token}`
                    }
                })
                    .then(user_res => {
                        localStorage.setItem("token", res.data.token)
                        dispatch(setUser(user_res.data.data))
                        navigate("/")


                    }).catch(err => {

                    })

            }).catch(err => {
                console.log({ err })
                if (err.response.status == 400 || err.response.status == 401) {
                    setError(err.response.data.msg)
                    setIsSubmitting(false)
                }
            })
    }

function handleChange(event) {
    setPayload({ ...payload, [event.target.name]: event.target.value })
}

return (
    <div className="container">
        <h1>Login</h1>
        {
            error
            &&
            <div className="alert alert-danger" role="alert">
                {error}
            </div>
        }
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" id="email" name='email'
                    onChange={handleChange}
                    value={payload.email}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">password</label>
                <input type="password" className="form-control" id="password" name='password'
                    onChange={handleChange}
                    value={payload.password} />
            </div>
            <button type="submit" className="btn btn-primary" disabled={is_submitting ? true : false} >{
                is_submitting
                &&
                <Spinner />
            } Submit</button>

        </form>

    </div>
);
}


export default Login;
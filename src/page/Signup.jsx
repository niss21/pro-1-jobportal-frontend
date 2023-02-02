import React, { useState } from 'react';
import axios from "axios"

import ErrorMessage from '../component/ErrorMessage';

function Signup() {

    const [errors, setError] = useState([])

    const [payload, setPayload] = useState({
        name: "name",
        email: "app@app.com",
        password: "password",
        role: "applicant",
        terms: true,
    })

    function handleSubmit(event) {
        event.preventDefault();
        axios.post(`${process.env.REACT_APP_SERVER_URL}/signup`, payload).then(res => {
            console.log({ res })
        }).catch(err => {
            console.log({ err })
            if (err.response.status == 400) {
                setError(err.response.data.errors)
            }
        })
    }

    function handleChange(event) {
        let { name, value, checked, type } = event.target
        setPayload({ ...payload, [name]: type == "checkbox" ? checked : value })
        setError([...errors.filter(el => el.param != event.target.name), { param: event.target.name, msg: "" }])
    }

    return (
        <div className='container'>
            <h1>Signup Form</h1>

            <form onSubmit={handleSubmit}>

                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control " id="name" name='name'
                        onChange={handleChange}
                        value={payload.name} />
                    <ErrorMessage errors={errors} name="name" />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name='email'
                        onChange={handleChange}
                        value={payload.email}
                    />
                    <ErrorMessage errors={errors} name="email" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">password</label>
                    <input type="password" className="form-control"  id="password" name='password'
                        onChange={handleChange}
                        value={payload.password} />
                    <ErrorMessage errors={errors} name="password" />
                </div>
                <div className="mb-3">
                    <label htmlFor="" className="form-label">Role</label>
                    <select className="form-select" name='role' aria-label="Default select example" 
                    value={payload.role}
                        onChange={handleChange}>
                        <option value="applicant">applicant</option>
                        <option value="recruiter">recruiter</option>
                    </select>
                    <ErrorMessage errors={errors} name="role" />
                </div>
                <div className="mb-3">
                    <input type="checkbox" id='terms' checked={payload.terms} name="terms" onChange={handleChange} />
                    <label htmlFor="terms" className="form-label">&nbsp;I agree terms and conditions</label>
                </div>
                <button type="submit" className="btn btn-primary" disabled={payload.terms ? false : true} >Submit</button>

            </form>

        </div>
    );
}

export default Signup;

import React, { useState, useEffect } from "react";
import axios from "axios";

const AppliedJobs = () => {

    const [applied_jobs, setJobs] = useState([]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVER_URL}/applyjob`,
        {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
        }
    )
            .then(res => {
               
                setJobs(res.data)
                
            }).catch(err => {
                console.log(err);
            })
            console.log(applied_jobs);
            console.log(applied_jobs.length);
    },[])

const newArr = [];

for (let i = 0; i < applied_jobs.length; i++) {
   newArr.push( <tbody><tr> 
   
    <td>{applied_jobs[i].jobs[0].job_id.company}</td> 
    <td>{applied_jobs[i].jobs[0].job_id.title}</td> 
    <td>{applied_jobs[i].jobs[0].status}</td> 
    <td>{applied_jobs[i].createdAt}</td> 
  </tr>
  </tbody> )
}


return(
    <>
        <table className="table table-striped">
        <thead>
          <tr>
            <th>Company</th>
            <th>Title</th>
            <th>Status</th>
            <th>Date Applied</th>
          </tr>
        </thead>
        {newArr};
        </table>
    </>
)

}


export default AppliedJobs;





import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const Show = () => {

  const { id } = useParams()

  console.log(id);

  const [job, setJob] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}/jobs/${id}`)
      .then(res => {
        setJob(res.data)
        console.log(res.data);
      })
  }, []);

  if (!job._id) {
    return <>Loading....</>
  }

  return (
    <>

      <div className='row'>

        <div>
          <h1 className="text-center">{job.title}</h1>
          <div className="p-2 bg-light border">
          {
            job.images.length == 0
              ?
              <img src={require("../../asset/no-image.jpg")} className="rounded mx-auto d-block" alt="..." />
              :
              <img src={`http://localhost:8000/${job.images}`} className="rounded mx-auto d-block" alt="..." />

          }
          </div>
          <div className="container">
            <h2> Basic Job Infos</h2>
            <table className="table">
              <tbody>
                <tr>
                  <th scope="col">job type</th>
                  <td>{job.type}</td>
                </tr>
                <tr>
                  <th scope="col">catagory</th>
                  <td>{job.catagory}</td>
                </tr>
                <tr>
                  <th scope="col">salary</th>
                  <td>{job.salary}</td>
                </tr>
                <tr>
                  <th scope="col">posted date</th>
                  <td>{job.posted_date}</td>
                </tr>
                <tr>
                  <th scope="col">deadline</th>
                  <td>{job.closing_date}</td>
                </tr>
              </tbody>
            </table>
            <br />
            <h2> Company Infos</h2>
            <table className="table">
              <tbody>
                <tr>
                  <th scope="col">Company</th>
                  <td>{job.company}</td>
                </tr>
                <tr>
                  <th scope="col">location</th>
                  <td>{job.location}</td>
                </tr>
                <tr>
                  <th scope="col">website</th>
                  <td>{job.website}</td>
                </tr>
                <tr>
                  <th scope="col">contact</th>
                  <td>{job.phone}</td>
                </tr>
              </tbody>
            </table>
            <br />
            <h2>job requirements</h2>
            <p>{job.requirements}</p>
            <br />
            <h2>job description</h2>
            <p>{job.description}</p>

          </div>
        </div>

      </div>
    </>

  );
}


export default Show;


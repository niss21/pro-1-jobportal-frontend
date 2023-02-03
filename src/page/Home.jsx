import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate"
import { Link, useNavigate } from "react-router-dom";

import ApplicantComponent from '../component/ApplicantComponent';
import RecruiterComponent from '../component/RecruiterComponent';

import {
    Chart as ChartJS,
    ArcElement,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

import { Pie } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';

const Home = (props) => {

    const navigate = useNavigate();
    const [jobs, setJobs] = useState([]);

    const [metadata, setMetaData] = useState({
        total: 0,
        page: 1,
        per_page: 25,
    })

    const [search_term, setSearchTerm] = useState("")

    const [alljobs, setallJobs] = useState([]);

    function fetchJobs() {

        axios.get(`${process.env.REACT_APP_SERVER_URL}/jobs?page=${metadata.page}&search_term=${props.search_term} `)
            .then(res => {
                console.log(res)

                setJobs(res.data.data)

                if (res.data.meta) {
                    setMetaData(res.data.meta)
                }

            }).catch(err => {
                console.log(err);
            })

        axios.get(`${process.env.REACT_APP_SERVER_URL}/alljobs?search_term `)
            .then(res => {
                setallJobs(res.data)
            }).catch(err => {
                console.log(err);
            })
    }

    useEffect(() => {
        fetchJobs()
    }, [metadata.page, props.search_term]);

    const handlePageClick = (event) => {
        setMetaData({ ...metadata, page: event.selected + 1 })
    };

    if (alljobs.length != 0) {

        var active = 0;
        var inactive = 0;

        var g2 = new Date();

        function convertUTCDateToLocalDate(date) {
            var newDate = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);

            var offset = date.getTimezoneOffset() / 60;
            var hours = date.getHours();

            newDate.setHours(hours - offset);

            return newDate;
        }

        for (let i = 0; i < alljobs.data.length; i++) {

            var date = convertUTCDateToLocalDate(new Date(alljobs.data[i].closing_date));

            if (date.getFullYear() > g2.getFullYear()) {
                if (date.getMonth() > g2.getMonth()) {
                    if (date.getDate() > g2.getDate()) {
                        active = active + 1;
                    }
                }
            }
            else
                inactive = inactive + 1;
        }

        var newArr = [];
        newArr.push(alljobs.data[0].title);


        for (let i = 1; i < alljobs.data.length; i++) {
            let count;
            for (let j = 0; j < newArr.length; j++) {

                if ((newArr[j].localeCompare(alljobs.data[i].title)) == 0) {
                    count = 1;
                }

            }
            if (count != 1) {
                newArr.push(alljobs.data[i].title);
            }
        }


        var newArr1 = newArr.map(myFunction);
        function myFunction(title) {
            let count = 0;
            for (let i = 0; i < alljobs.data.length; i++) {
                if (title == alljobs.data[i].title) {
                    count++;
                }
            }
            return count;
        }


    }

    ChartJS.register(ArcElement, Tooltip, Legend);

    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
    );

    const data1 = {
        labels: ['Active', 'Inactive'],
        datasets: [
            {
                label: 'active vs inactive jobs',
                data: [active, inactive],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',

                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',

                ],
                borderWidth: 1,
            },
        ],
    };

    const option1 = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Jobs and their vacancy',
            },
        },
    };
    const option2 = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Active vs Inactive Jobs',
            },
            style: {
                height: '288px',
                width: '288px',
            }
        },
    };

    const labels = newArr;

    const data2 = {
        labels,
        datasets: [
            {
                label: 'Jobs Title vs vacancy',
                data: newArr1,
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };

    function deleteJob(id) {
        let url = `${process.env.REACT_APP_SERVER_URL}/jobs/${id}`

        axios.delete(url, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`
            }
        })
            .then(res => {
                fetchJobs()
            })

    }

    function applyJob(job) {
        let url = `${process.env.REACT_APP_SERVER_URL}/applyjob`

        axios.post(url, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`
            }
        })
            .then(res => {
                navigate("/jobs/applied")
            })
    }

    // console.log(jobs[4].images);

    return (
        <>

            <div style={{ width: '98%', display: 'flex', justifyContent: 'center', margin: '5px' }}>

                <div style={{ height: '300px', width: '45%', border: '2px solid black', margin: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Bar
                        options={option1}
                        data={data2}
                    />
                </div>

                <div style={{ height: '300px', width: '45%', border: '2px solid black', margin: '10px', padding: '5px', display: 'flex', justifyContent: 'center' }}>

                    <Pie
                        options={option2}
                        data={data1}

                    />
                </div>

            </div>


            <div className='row' style={{ border: '2px solid black' }}>
                {
                    jobs.map(job => {

                        return <div className=" col-md-3 p-3" key={job._id}>
                            {/* <div className='card'> */}

                            <div className="card mb-3" >


                                <Link to={`/jobs/${job._id}`} style={{
                                    textDecoration: "none",
                                    color: "black"
                                }}>
                                    {/* {
                                        job.images.length == 0
                                            ?
                                            <img src={require("../asset/no-image.jpg")} className="card-img-top img-thumbnail" alt="..." />
                                            :
                                            <img src={`http://localhost:8000/${job.images}`} className="card-img-top img-thumbnail" alt="..." />

                                    }

                                    <div className="card-body">
                                        <div>
                                            <p className="card-text">{job.company}</p>
                                            <h5 className="card-title">{job.title}</h5>
                                        </div>
                                    </div> */}

                                    <div className="row g-0">
                                        <div className="col-md-4">
                                            {
                                                job.images.length == 0
                                                    ?
                                                    <img src={require("../asset/no-image.jpg")} className="card-img-top img-thumbnail" alt="..." style={{ height: '100%', padding: '5px', margin: '0px' }} />
                                                    :
                                                    <img src={`http://localhost:8000/${job.images}`} className="card-img-top img-thumbnail" alt="..." style={{ height: '100%', padding: '5px', margin: '0px' }} />

                                            }
                                        </div>

                                        <div className="col-md-8">
                                            <div className="card-body">
                                                <h5 className="card-title">{job.company}</h5>
                                                <h6 className="card-title">:{job.title}</h6>

                                            </div>
                                        </div>
                                    </div>


                                </Link>

                                <ApplicantComponent>
                                    <button type='button' className="btn btn-primary"
                                        onClick={() => applyJob(job)}
                                    >Apply</button>
                                </ApplicantComponent>

                                <RecruiterComponent>
                                    <div style={{
                                        display: "flex",
                                        justifyContent: "space-around"
                                    }}>

                                        <Link to={`/jobs/edit/${job._id}`}>
                                            <button type='button' className="btn btn-primary"
                                            >Edit</button>
                                        </Link>

                                        <button type='button' className="btn btn-danger"
                                            onClick={() => deleteJob(job._id)}
                                        >Delete</button>

                                    </div>
                                </RecruiterComponent>


                            </div>
                        </div>

                    })
                }

                <div className='pagination-wrapper' style={{ display: 'flex', justifyContent: 'center' }}>
                    <ReactPaginate
                        breakLabel="..."
                        nextLabel="next >"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={2}
                        pageCount={Math.ceil(metadata.total / metadata.per_page)}
                        previousLabel="< previous"
                        renderOnZeroPageCount={null}
                    />

                </div>


            </div>

        </>
    );
}
export default Home;
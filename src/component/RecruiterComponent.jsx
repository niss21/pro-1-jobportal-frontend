import React from 'react';
import { useSelector } from 'react-redux';

const RecruiterComponent = (props) => {

    const { user } = useSelector((state) => state.user)

    if (user?.role == "recruiter") {
        return <>
            {
                props.children
            }
        </>
    }
    return null;

}

export default RecruiterComponent;

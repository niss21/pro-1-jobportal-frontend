import React from 'react';
import { useSelector } from 'react-redux';

const ApplicantComponent = (props) => {

    const { user } = useSelector((state) => state.user)

    if (user?.role == "applicant") {
        return <>
            {
                props.children
            }
        </>
    }
    return null;

}

export default ApplicantComponent;

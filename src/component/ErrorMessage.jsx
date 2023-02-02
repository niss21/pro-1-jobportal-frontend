import React from "react";

const ErrorMessage = (props) => {
    let error_obj = props.errors.find(err => err.param == props.name)

    if (error_obj){
        return(
            <small style={{color: "red"}}className="error-msg">
                {error_obj.msg}
            </small>
        )
    }
    return null;
}

export default ErrorMessage;
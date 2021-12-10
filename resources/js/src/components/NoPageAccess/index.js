import {Button, Result} from "antd";
import React from "react";
import {useHistory} from "react-router-dom";

export const NoPageAccess = () => {

    const history = useHistory();





    return (

        <Result
            status="403"
            title="403"
            subTitle="Sorry, you are not authorized to access this page."
            extra={<Button onClick={() => {
                history.push('/home');
            }} type="primary">Back Home</Button>}
        />
    );
};

import React from 'react';

import {Alert} from "antd";


const ErrorMessages = (props) => {
    const {error} = props


    const getErrors = () => {
        let errors = [];
        for (let i in error) {
            errors.push(error[i]);
        }
        return errors;
    }

    return (
        <>
            {error && typeof error !== "string" && (

                <Alert
                    message="Error"
                    description={<>
                        <div className="overscroll-y-auto"
                             style={{height: '120px'}}> {getErrors().map((value, index) => {
                            return (
                                <p key={index} className="text-red-600 pb-2">{value}</p>
                            );

                        })
                        }

                        </div>
                    </>}
                    type="error"
                    showIcon
                    closable
                />
            )}
            {error && typeof error === "string" && (

                <Alert
                    message="Error"
                    description={<p className="text-red-600 pb-2">{error}</p>}
                    type="error"
                    showIcon
                    closable
                />
            )}
        </>
    );
};

export default ErrorMessages;

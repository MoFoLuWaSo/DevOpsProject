import React from "react";
import App from "../../routes";
import {Link, useRouteMatch} from "react-router-dom";


const MainApp = () => {
    const match = useRouteMatch();







    return (
        <div>

            <App match={match}/>
        </div>
    );
}

export default MainApp;

import React from "react";
import ReactDOM from "react-dom";


import registerServiceWorker from './registerServiceWorker';
import DevOpsApp from "./DevOpsApp";

// Wrap the rendering in a function:
const render = Component => {
    ReactDOM.render(
        // Wrap App inside AppContainer
        <Component/>,
        document.getElementById('root')
    );
};

// Do this once
registerServiceWorker();

// Render once
render(DevOpsApp);


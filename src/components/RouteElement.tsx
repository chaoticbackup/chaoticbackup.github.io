import React from "react";
import {useLocation, useNavigate} from 'react-router-dom';

const RouteElement = ({ component: RouteComponent, ...props }) => {
    const location = useLocation();
    const navigate = useNavigate();
    return (
        <RouteComponent location={location} navigate={navigate} {...props} />
    );
  };

  export default RouteElement;

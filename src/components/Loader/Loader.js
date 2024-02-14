import React from 'react';
import LoaderStyle from "./Loader.module.css"
const  Loader = () => {
    return (
        <div className={LoaderStyle.loading_wrapper}>
            <div className={LoaderStyle.logo_loader}></div>
            <div className={LoaderStyle.loader3}></div>
        </div>
    );
};

export default Loader;
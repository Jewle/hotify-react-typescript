import React from 'react';
import './loading-spiner.scss'

const LoadingSpinner = () => {
    return (
        <div className='loading-spinner'>
            <div className="lds-ellipsis">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
};

export default LoadingSpinner;

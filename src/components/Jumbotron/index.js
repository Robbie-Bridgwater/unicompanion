import React from 'react';

const Jumbotron = ({height, padding, margin, children, customClass}) => {
    // formatted {property}{sides}={breakpoint}-{size}
    // {size} for height varies from 0-100 and dictates what % of the parent element is taken up
    // {size} for padding & margin varies from 0-5 and dictates an rem value (0=0rem, 1=0.25rem, 5=3rem)
    return (
        <div className={`h-${height} p-${padding} m-${margin} ${customClass}`}>
            {children}
        </div>
    )
}

export default Jumbotron;
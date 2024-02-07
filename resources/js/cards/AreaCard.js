import { Typography } from '@mui/material';
import React from 'react'

const AreaCard = ({image, description}) => {
    return (
        <>
            <div className="my-4">
                <img src={image} alt="" srcset="" style={{ height: 200, width: 200 }} />
            </div>
            <div className="px-6 items-start">
                <Typography variant="h6">
                    {description}
                </Typography>
            </div>
        </>
    );
}

export default AreaCard;
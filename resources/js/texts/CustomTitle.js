import { Typography } from '@mui/material';
import React from 'react'

const CustomTitle = ({text}) => {
    return (
        <Typography variant="h3" color={'#B75800'} fontWeight={700} sx={{ marginBottom: 3 }}>{text}</Typography>
    );
}

export default CustomTitle;
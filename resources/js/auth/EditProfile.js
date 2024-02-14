import { Typography } from '@mui/material';
import React from 'react'
import ReactDOM from 'react-dom'

const EditProfile = () => {
    return (
        <div className="w-full">
            <Typography variant='h3'>Edit Profile</Typography>
        </div>
    );
}

export default EditProfile;

if (document.getElementById('EditProfile')){
    const element = document.getElementById("EditProfile")
    const props = Object.assign({}, element.dataset)
    ReactDOM.render(<EditProfile {...props} />, document.getElementById('EditProfile'))
}
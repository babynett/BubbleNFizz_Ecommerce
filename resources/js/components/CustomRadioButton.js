import { Radio, Typography } from "@mui/material";
import React from "react";

const CustomRadioButton = ({ label, checked, onChange, value }) => {
    return (
        <div className="flex items-center">
            <Radio checked={checked} onChange={onChange} value={value} />
            <Typography variant={`body1`}>{label}</Typography>
        </div>
    );
};

export default CustomRadioButton;

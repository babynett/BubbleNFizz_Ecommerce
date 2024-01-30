import { Autocomplete, TextField } from "@mui/material";
import React from "react";

const CustomAutoComplete = ({ options, value, onChange, label, isUser }) => {
    return (
        <Autocomplete
            options={options}
            onChange={onChange}
            value={value}
            renderInput={(params) => <TextField {...params} label={label} />}
            fullWidth
            disableClearable
            disabled={isUser}
        />
    );
};

export default CustomAutoComplete;

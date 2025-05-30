import { FormControl, InputLabel } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import React from "react";

const CustomSelectInput = ({ value, onChange, label, options, fullWidth = true }) => {
    return (
        <>
            <FormControl fullWidth={fullWidth}>
                <InputLabel id={label}>{label}</InputLabel>
                <Select
                    labelId={label}
                    id={label}
                    value={value}
                    label={label}
                    onChange={onChange}
                    style={{ width: fullWidth ? "" : 200 }}
                >
                    {options.length > 0 && options.map((item, index) => {
                        return (
                            <MenuItem value={item}>{item}</MenuItem>
                        )
                    })}
                </Select>
            </FormControl>
        </>
    );
};

export default CustomSelectInput;

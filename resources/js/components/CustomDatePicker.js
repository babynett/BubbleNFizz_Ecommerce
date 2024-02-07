import { DateField, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import React from "react";

const CustomDatePicker = ({ label, value, onChangeValue, my }) => {
    return (
        <LocalizationProvider dateAdapter={AdapterMoment}>
            <DateField 
                style={{ marginTop: my, marginBottom: my }}
                label={label}
                value={value}
                onChange={onChangeValue}
                fullWidth
            />
        </LocalizationProvider>
    );
};

export default CustomDatePicker;

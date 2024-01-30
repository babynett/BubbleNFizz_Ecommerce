import { DateTimeField, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs, AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import React from "react";

const CustomDateTimeInput = ({ label, value, onChangeValue, my }) => {
    return (
        <LocalizationProvider dateAdapter={AdapterMoment}>
            <DateTimeField
                label={label}
                value={value}
                onChange={onChangeValue}
                fullWidth
                sx={{
                    marginTop: my,
                    marginBottom: my,
                }}
            />
        </LocalizationProvider>
    );
};

export default CustomDateTimeInput;

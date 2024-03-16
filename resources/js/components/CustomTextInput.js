import { TextField, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";

const CustomTextInput = ({
    label,
    value,
    onChangeValue,
    type,
    my,
    multiline,
    isHalf,
    restrictions,
    disabled = false,
}) => {
    const [error, setError] = useState(false);
    const firstUpdate = useRef(true); // to prevent render on first mount
    useEffect(() => {
        const numbers = /^[0-9]+$/;
        const letters = /^[a-z A-Z]+$/;
        if (firstUpdate.current) {
            // to prevent render on first mount
            firstUpdate.current = false; // to prevent render on first mount
            return; // to prevent render on first mount
        } // to prevent render on first mount
        if (restrictions === "alphabet") {
            if (letters.test(value)) {
                setError(false);
            } else {
                setError(true);
            }
        }
        if (restrictions === "numeric") {
            if (numbers.test(value)) {
                setError(false);
            } else {
                setError(true);
            }
        }
    }, [value]);

    return (
        <>
            <TextField
                className="focus:outline-none outline-none border-none focus:border-none"
                label={label}
                value={value}
                onChange={onChangeValue}
                type={type}
                disabled={disabled}
                fullWidth={isHalf ? false : true}
                style={{
                    marginTop: my,
                    marginBottom: my,
                }}
                multiline={multiline}
                rows={multiline ? "4" : null}
                error={error}
                helperText={``}
                autoComplete="off"
            />
        </>
    );
};

export default CustomTextInput;

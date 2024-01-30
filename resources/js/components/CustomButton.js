import { Button, CircularProgress, Typography } from "@mui/material";
import React from "react";

const CustomButton = ({ variant, label, my, onClick, isFull, loading, color }) => {
    return (
        <Button
        color={color}
            variant={variant}
            onClick={onClick}
            style={{ marginBottom: my, marginTop: my }}
            fullWidth={isFull}
        >
            {loading && (
                <CircularProgress
                    style={{
                        marginRight: 10,
                        color: variant === "contained" ? "#fff" : "",
                    }}
                    size={20}
                />
            )}
            <Typography style={{ fontWeight: "400" }}>{label}</Typography>
        </Button>
    );
};

export default CustomButton;

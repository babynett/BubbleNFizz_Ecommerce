import { Button } from "@mui/material";
import React from "react";

const CustomPollButton = ({ title, my, value, onClick }) => {
    return (
        <Button
            fontWeight={700}
            variant="outlined"
            fullWidth
            onClick={onClick}
            sx={{
                marginTop: my,
                marginBottom: my,
                color: title != value ? "#B75800" : "#fff",
                borderColor: "#B75800",
                backgroundColor: title == value ? "#B75800" : "transparent",
                height: 60,
                "&:hover": {
                    color: "#fff",
                    backgroundColor: "#B75800",
                    borderColor: "#B75800",
                },
            }}
        >
            {title}
        </Button>
    );
};

export default CustomPollButton;

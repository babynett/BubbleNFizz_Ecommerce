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
                color: title != value ? "#EDBF47" : "#fff",
                borderColor: "#EDBF47",
                backgroundColor: title == value ? "#EDBF47" : "transparent",
                height: 60,
                "&:hover": {
                    color: "#fff",
                    backgroundColor: "#EDBF47",
                    borderColor: "#EDBF47",
                },
            }}
        >
            {title}
        </Button>
    );
};

export default CustomPollButton;

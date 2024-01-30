import { Card, Typography } from "@mui/material";
import React from "react";

const CustomClickableCard = ({ title, icon, onClick }) => {
    return (
        <div
            className="border-2 border-sky-700 justify-center items-center flex flex-col py-5 cursor-pointer"
            style={{ backgroundColor: "#0284C7", minHeight: 290 }}
            onClick={onClick}
        >
            <Typography
                variant="h6"
                fontWeight={"bold"}
                color={"#fff"}
                textAlign={"center"}
            >
                {title}
            </Typography>
            {icon}
        </div>
    );
};

export default CustomClickableCard;

import { Card, CardActions, CardContent, Typography } from "@mui/material";
import React from "react";

const DashboardCards = ({ title, bgColor, textColor, count }) => {
    return (
        <div
            className={`${bgColor} rounded-full h-28 flex flex-col justify-center items-center`}
        >
            <div className={`text-xl ${textColor}`}>{title}</div>
            <div className={`text-xl ${textColor}`}>{count}</div>
        </div>
    );
};

export default DashboardCards;

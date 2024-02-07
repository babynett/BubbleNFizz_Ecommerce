import { Typography } from "@mui/material";
import React from "react";

const FragranceColor = ({title, color, description}) => {
    return (
        <>
            <Typography variant="h6" fontWeight={700}>
                {title}
            </Typography>
            <div className="my-4 flex justify-center">
                <svg
                    className="w-32"
                    viewBox="0 0 24 24"
                    fill={color}
                    xmlns="http://www.w3.org/2000/svg"
                    stroke="#000000"
                >
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                        {" "}
                        <path
                            d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                            stroke={color}
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        ></path>{" "}
                    </g>
                </svg>
            </div>
            <div className="px-6">
                <Typography variant="h6">
                    {description}
                </Typography>
            </div>
        </>
    );
};

export default FragranceColor;

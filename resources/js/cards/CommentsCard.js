import React from "react";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { Rating } from "@mui/material";

const CommentsCard = ({name, description, rating}) => {
    return (
        <div className="border-b-2 pb-4 mb-2">
            <div className="flex">
                <AccountBoxIcon sx={{ fontSize: 150 }} />
                <div className="flex flex-col">
                    <div className="text-lg">{name}</div>
                    <Rating className="my-3" value={rating} readOnly />
                    <div className="text-lg">
                        {description}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CommentsCard;

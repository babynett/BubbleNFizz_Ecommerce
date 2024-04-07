import { Rating, Typography } from "@mui/material";
import React from "react";

const CustomShoppingCard = ({ title, scentName, rating, price, onClick, sales, image }) => {
    return (
        <div className="border-2 flex justify-center items-center flex-col hover:border-amber-500" onClick={onClick}>
            <img
                src={`https://bubblenfizz-store.com/images/static/${image}`}
                height={150}
                width={250}
            />
            <div className="my-8 w-1/2 text-center">
                <Typography variant="body1" fontWeight={700}>
                    {title}
                </Typography>
            </div>
            <Typography>{scentName}</Typography>
            <Rating name="read-only" value={Number(rating)} precision={0.1} readOnly />
            <Typography variant="caption">Sold: {sales}</Typography>
            <div className="my-8 w-1/2 text-center underline">₱{price}</div>
        </div>
    );
};

export default CustomShoppingCard;

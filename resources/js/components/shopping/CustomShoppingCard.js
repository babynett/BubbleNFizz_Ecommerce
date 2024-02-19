import { Rating, Typography } from "@mui/material";
import React from "react";

const CustomShoppingCard = () => {
    return (
        <div className="border-2 flex justify-center items-center flex-col">
            <img
                src={`https://picsum.photos/500/300`}
                height={300}
                width={500}
            />
            <div className="my-8 w-1/2 text-center">
                <Typography variant="body1" fontWeight={700}>
                    BNF Handcrafted Toasted Marshmallow Body Bar 120g
                </Typography>
            </div>
            <Typography>Nourishing oils and butters</Typography>
            <Rating name="read-only" value={2.4} precision={0.1} readOnly />
            <div className="my-8 w-1/2 text-center underline">P100</div>
        </div>
    );
};

export default CustomShoppingCard;

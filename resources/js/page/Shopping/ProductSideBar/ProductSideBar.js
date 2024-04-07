import { Typography } from "@mui/material";
import React from "react";

const ProductSideBar = ({active, setActive}) => {
    return (
        <div className="w-full px-12 py-8 text-black border-x-2 border-black">
            <div className="px-4 flex justify-center border-b-2 border-t-2 border-black">
                <Typography variant="h5">Categories</Typography>
            </div>
            <div className="flex justify-center items-center flex-col w-full space-y-14 my-14">
                <div onClick={() => setActive('%%')} className={`hover:text-amber-500 font-bold cursor-pointer ${active == '%%' ? "bg-amber-500 text-white w-full flex justify-center hover:text-white" : ""}`}>All Products</div>
                <div onClick={() => setActive('Artisan Facial and Body Soaps')} className={`hover:text-amber-500 font-bold cursor-pointer ${active == 'Artisan Facial and Body Soaps' ? "bg-amber-500 text-white w-full flex justify-center hover:text-white" : ""}`}>
                    Artisan Facial and Body Soaps
                </div>
                <div onClick={() => setActive('Shampoo Bars')} className={`hover:text-amber-500 font-bold cursor-pointer ${active == 'Shampoo Bars' ? "bg-amber-500 text-white w-full flex justify-center hover:text-white" : ""}`}>Shampoo Bars</div>
                <div onClick={() => setActive('Bath Bomb')} className={`hover:text-amber-500 font-bold cursor-pointer ${active == 'Bath Bomb' ? "bg-amber-500 text-white w-full flex justify-center hover:text-white" : ""}`}>Bath Bomb</div>
                <div onClick={() => setActive('Bubble Bath')} className={`hover:text-amber-500 font-bold cursor-pointer ${active == 'Bubble Bath' ? "bg-amber-500 text-white w-full flex justify-center hover:text-white" : ""}`}>Bubble Bath</div>
            </div>
        </div>
    );
};

export default ProductSideBar;

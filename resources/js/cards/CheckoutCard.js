import { Button } from "@mui/material";
import React from "react";

const CheckoutCard = ({ cart, darkMode = true, isCart = true, refundButton = false }) => {
    return (
        <div className="bg-transparent grid grid-cols-12 gap-6 p-4 my-3">
            <div className="col-span-3">
                <div className="flex justify-center items-center h-full">
                    <img
                        src={`https://picsum.photos/500/300`}
                        height={300}
                        width={500}
                    />
                </div>
            </div>
            <div className="col-span-6 h-full flex flex-col justify-between">
                <div className={`text-lg ${darkMode ? 'text-white' : 'text-black'}`}>{cart.product.product_name} ({cart.product.product_scent_name})</div>
                {/* {refundButton && (
                    <Button variant="contained" color="danger">Refund</Button>
                )} */}
            </div>
            <div className="col-span-3">
                <div className="flex justify-center items-center h-full">
                    <div className={`text-lg ${darkMode ? 'text-white' : 'text-black'} font-bold`}>₱{isCart ? cart.cart_price : cart.order_price}</div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutCard;

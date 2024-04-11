import { Button } from "@mui/material";
import React from "react";
import { api } from "../config/api";
import swal from "sweetalert";

const CheckoutCard = ({ cart, darkMode = true, isCart = true, refundButton = false }) => {

    const handleRefund = () => {
        api.post('ordersmanagement/refunditem', {
            id: cart.order_id,
            order_status: "Refund"
        }).then(response => {
            swal({
                icon: "success",
                title: "Success!",
                text: "Wait for the refund to be approved!"
            }).then(() => {
                location.reload()
            })
        })
    }

    return (
        <div className="bg-transparent grid grid-cols-12 gap-6 p-4 my-3">
            <div className="col-span-3">
                <div className="flex justify-center items-center h-full">
                    <img
                        src={decodeURI(`https://bubblenfizz-store.com/BubbleNFizz-main/public/image/products/${cart.product.product_images}`)}
                        height={300}
                        width={500}
                    />
                </div>
            </div>
            <div className="col-span-6 h-full flex flex-col justify-between">
                <div className={`text-lg ${darkMode ? 'text-white' : 'text-black'}`}>{cart.product.product_name} {cart.product.product_scent_name} ({cart.order_quantity}x)</div>
            </div>
            <div className="col-span-3">
                <div className="flex justify-center items-center flex-col h-full">
                    <div className={`text-lg ${darkMode ? 'text-white' : 'text-black'} font-bold`}>₱{isCart ? cart.cart_price : cart.order_price}</div>
                {refundButton && (
                    <div className="mt-8" onClick={handleRefund}>
                        <Button variant="contained" color="error">Refund</Button>
                    </div>
                )}
                </div>
            </div>
        </div>
    );
};

export default CheckoutCard;

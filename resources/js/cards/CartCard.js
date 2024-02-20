import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const CartCard = ({ cart }) => {
    const [quantity, setQuantity] = useState(cart.cart_quantity);
    const [totalPrice, setTotalPrice] = useState(cart.cart_price);

    useEffect(() => {
        console.log(cart)
    }, [])

    const subQuantity = () => {
        if (Number(quantity) == 1) {
            swal({
                icon: "error",
                title: "Oops...",
                text: "Quantity should not be lower than 1",
            });
        } else {
            setQuantity(Number(quantity) - 1);
            setTotalPrice(Number(totalPrice) - Number(cart.product.product_price));
        }
    };

    const addQuantity = () => {
        setQuantity(Number(quantity) + 1);
        setTotalPrice(Number(totalPrice) + Number(cart.product.product_price));
    };

    return (
        <div className="bg-slate-200 grid grid-cols-12 gap-6">
            <div className="col-span-2">
                <div className="flex justify-center items-center h-full">
                    <img
                        src={`https://picsum.photos/500/300`}
                        height={300}
                        width={500}
                    />
                </div>
            </div>
            <div className="col-span-6">
                <div className="text-lg">
                    {cart.product.product_name}
                </div>
                <div className="text-lg font-bold">P{cart.product.product_price}</div>
            </div>
            <div className="col-span-2">
                <div className="flex justify-center items-center h-full">
                    <button onClick={subQuantity}>
                        <RemoveCircleIcon
                            sx={{ color: "#B75800" }}
                            className="cursor-pointer"
                        />
                    </button>{" "}
                    {quantity}{" "}
                    <button onClick={addQuantity}>
                        <AddCircleIcon
                            sx={{ color: "#B75800" }}
                            className="cursor-pointer"
                        />
                    </button>
                </div>
            </div>
            <div className="col-span-2">
                <div className="flex justify-center items-center h-full">
                    P{totalPrice}
                </div>
            </div>
        </div>
    );
};

export default CartCard;

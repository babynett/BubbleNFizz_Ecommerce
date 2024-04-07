import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { api } from "../config/api";

const CartCard = ({
    cart,
    setSubTotal,
    setTotalQuantity,
    subTotal,
    totalQuantity,
}) => {
    const [quantity, setQuantity] = useState(cart.cart_quantity);
    const [totalPrice, setTotalPrice] = useState(cart.cart_price);

    const subQuantity = () => {
        if (Number(quantity) == 1) {
            swal({
                icon: "warning",
                title: "Remove Item?",
                text: "Are you sure you want to remove this item?",
                buttons: ["No", "Yes"]
            }).then(response => {
                if (response == true) {
                    api.post('shopping/deletecartitem', {
                        id: cart.id
                    }).then((response) => {
                        swal({
                            icon: "success",
                            title: "Item Removed!",
                            text: "Item has been removed!"
                        }).then(() => {
                            location.reload()
                        })
                    })
                }
            })
        } else {
            api.post('shopping/subquantity', {
                id: cart.id,
                cart_quantity: Number(quantity) - 1,
                cart_price: Number(totalPrice) - Number(cart.product.product_price),
            }).then(() => {
                setQuantity(Number(quantity) - 1);
                setTotalQuantity(Number(totalQuantity) - 1);
                setTotalPrice(
                    Number(totalPrice) - Number(cart.product.product_price)
                );
                setSubTotal(Number(subTotal) - Number(cart.product.product_price));
            }).catch(err => {
                console.log(err.response)
            })
        }
    };

    const addQuantity = () => {
        api.post("shopping/addquantity", {
            id: cart.id,
            cart_quantity: Number(quantity) + 1,
            cart_price: Number(totalPrice) + Number(cart.product.product_price),
        })
            .then((response) => {
                setQuantity(Number(quantity) + 1);
                setTotalQuantity(Number(totalQuantity) + 1);
                setTotalPrice(
                    Number(totalPrice) + Number(cart.product.product_price)
                );
                setSubTotal(
                    Number(subTotal) + Number(cart.product.product_price)
                );
            })
            .catch((err) => {
                console.log(err.response);
            });
    };

    return (
        <div className="bg-slate-200 grid grid-cols-12 gap-6 p-4 my-3">
            <div className="col-span-2">
                <div className="flex justify-center items-center h-full">
                    <img
                        src={decodeURI(`https://bubblenfizz-store.com/BubbleNFizz-main/public/image/products/${cart.product.product_images}`)}
                        height={300}
                        width={500}
                    />
                </div>
            </div>
            <div className="col-span-6 h-full flex flex-col justify-between">
                <div className="text-lg">{cart.product.product_name}</div>
                <div className="text-lg font-bold">
                    ₱{cart.product.product_price}
                </div>
            </div>
            <div className="col-span-2">
                <div className="flex justify-center items-center h-full">
                    <button onClick={subQuantity}>
                        <RemoveCircleIcon
                            sx={{ color: "#EDBF47" }}
                            className="cursor-pointer"
                        />
                    </button>
                    <div className="text-lg mx-4"> {quantity} </div>
                    <button onClick={addQuantity}>
                        <AddCircleIcon
                            sx={{ color: "#EDBF47" }}
                            className="cursor-pointer"
                        />
                    </button>
                </div>
            </div>
            <div className="col-span-2">
                <div className="flex justify-center items-center h-full font-bold">
                    ₱{totalPrice}
                </div>
            </div>
        </div>
    );
};

export default CartCard;

import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { api } from "../../../config/api";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CartCard from "../../../cards/CartCard";
import { Button } from "@mui/material";

const Cart = ({ user }) => {
    const userObject = JSON.parse(user);
    const [carts, setCarts] = useState([]);
    const [subTotal, setSubTotal] = useState(0);
    const [totalQuantity, setTotalQuantity] = useState(0);

    useEffect(() => {
        api.get(`shopping/getusercart?user_id=${userObject.id}`)
            .then((response) => {
                const cartItems = response.data;
                let tempTotal = 0;
                let tempQuantity = 0;
                cartItems.map((item, index) => {
                    tempTotal += Number(item.cart_price);
                    tempQuantity += Number(item.cart_quantity);
                });
                setSubTotal(tempTotal);
                setTotalQuantity(tempQuantity);
                setCarts(response.data);
            })
            .catch((err) => {
                console.log(err.response);
            });
    }, []);

    return (
        <div className="w-full px-12">
            <div className="my-8">
                <div className="text-2xl font-bold">My Cart</div>
                <div className="grid grid-cols-8 gap-10">
                    <div className="col-span-6">
                        {carts.map((item, index) => {
                            return (
                                <CartCard
                                    cart={item}
                                    key={index}
                                    setSubTotal={setSubTotal}
                                    setTotalQuantity={setTotalQuantity}
                                    totalQuantity={totalQuantity}
                                    subTotal={subTotal}
                                />
                            );
                        })}
                    </div>
                    <div className="col-span-2 w-full">
                        <div className="bg-slate-200 py-4 my-3 w-full">
                            <div className="mx-10">
                                <div className="text-xl font-bold">
                                    Order Summary
                                </div>
                            </div>
                            <div className="flex justify-between px-6 my-3 items-center w-full">
                                <div>Items</div>
                                <div>{totalQuantity}</div>
                            </div>
                            <div className="flex justify-between px-6 my-3 items-center w-full">
                                <div>Sub Total</div>
                                <div>Php {subTotal}.00</div>
                            </div>
                            <div className="flex justify-between px-6 my-3 items-center w-full">
                                <div>Discount</div>
                                <div>Free Shipping</div>
                            </div>
                            <div className="border-b-2 border-dashed border-blue-600 mx-6 my-4"></div>
                            <div className="px-6 my-3 w-full">
                                <div className="flex justify-between items-center w-full">
                                    <div className="text-2xl font-bold">
                                        Total
                                    </div>
                                    <div className="text-2xl font-bold">
                                        ₱{subTotal}
                                    </div>
                                </div>
                            </div>
                            <div className="px-6 my-3 w-full">
                                <a href="/checkout">
                                    <Button
                                        sx={{
                                            backgroundColor: "#EDBF47",
                                            color: "#fff",
                                            "&:hover": {
                                                backgroundColor: "#EDBF47",
                                                color: "#fff",
                                            },
                                        }}
                                        fullWidth
                                    >
                                        Checkout
                                    </Button>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;

if (document.getElementById("CartPage")) {
    const element = document.getElementById("CartPage");
    const props = Object.assign({}, element.dataset);
    ReactDOM.render(<Cart {...props} />, document.getElementById("CartPage"));
}

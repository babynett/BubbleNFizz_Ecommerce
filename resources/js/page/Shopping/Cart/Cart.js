import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { api } from "../../../config/api";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CartCard from "../../../cards/CartCard";

const Cart = ({ user }) => {
    const userObject = JSON.parse(user);
    const [carts, setCarts] = useState([])

    useEffect(() => {
        api.get(`shopping/getusercart?user_id=${userObject.id}`)
            .then((response) => {
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
                                <CartCard cart={item} key={index} />
                            )
                        })}
                    </div>
                    <div className="col-span-2"></div>
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

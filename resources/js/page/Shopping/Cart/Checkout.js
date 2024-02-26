import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import CustomTextInput from "../../../components/CustomTextInput";
import StoreIcon from "@mui/icons-material/Store";
import moment from "moment";
import CustomFileUpload from "../../../components/CustomFileUpload";
import { Button } from "@mui/material";
import { api } from "../../../config/api";
import CheckoutCard from "../../../cards/CheckoutCard";

const Checkout = ({ user }) => {
    const userObject = JSON.parse(user);

    const [carts, setCarts] = useState([]);
    const [quantity, setQuantity] = useState(0);
    const [subTotalPrice, setSubTotalPrice] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [delivery, setDelivery] = useState("");
    const [mop, setMop] = useState("GCash");
    const [gcashFile, setGcashFile] = useState({});

    useEffect(() => {
        api.get(`shopping/getusercart?user_id=${userObject.id}`)
            .then((response) => {
                const cartItems = response.data;
                let tempSubTotal = 0;
                let tempQuantity = 0;
                cartItems.map((item, index) => {
                    tempSubTotal += Number(item.cart_price);
                    tempQuantity += Number(item.cart_quantity);
                });
                setQuantity(tempQuantity);
                setSubTotalPrice(tempSubTotal);
                setCarts(response.data);
            })
            .catch((err) => {
                console.log(err.response);
            });

        api.get(`usermanagement/getprofile/${userObject.id}`)
            .then((response) => {
                console.log(response.data);
            })
            .catch((err) => {
                console.log(err.response);
            });
        // console.log(userObject);
    }, []);

    useEffect(() => {
        if (delivery == 'PickUp') {
            setTotalPrice(subTotalPrice)
        } else if (delivery == 'Standard') {
            setTotalPrice(subTotalPrice + 39)
        } else {
            setTotalPrice(subTotalPrice + 150)
        }
    }, [subTotalPrice, delivery])

    return (
        <div className="w-full border-t-2 border-black">
            <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="col-span-1 px-10 py-6">
                    <div className="text-2xl font-bold">Contact</div>
                    <CustomTextInput
                        label={`Email`}
                        my={30}
                        value={userObject.email}
                    />
                    <div className="text-2xl font-bold mb-6">Address</div>
                    <div className="grid grid-cols-1 gap-6 mb-6">
                        <div className="col-span-1">
                            <CustomTextInput
                                label={`Name`}
                                value={userObject.name}
                            />
                        </div>
                        <div className="col-span-1">
                            <CustomTextInput label={`Address`} />
                        </div>
                        <div className="col-span-1">
                            <CustomTextInput label={`Apartment, Suite, etc.`} />
                        </div>
                        <div className="col-span-1">
                            <CustomTextInput label={`Phone Number`} />
                        </div>
                    </div>
                    <div className="text-2xl font-bold mb-6">
                        Shipping Method
                    </div>
                    <div className="grid grid-cols-1 gap-4 mb-6">
                        <div
                            className={`col-span-1 py-4 px-8 border-2 ${
                                delivery == "PickUp" ? "border-amber-500" : ""
                            } rounded-full`}
                            onClick={() => setDelivery("PickUp")}
                        >
                            <div className="flex justify-between items-center">
                                <div className="flex flex-col justify-around">
                                    <div className="text-xl font-bold">
                                        Pick Up
                                    </div>
                                    <div className="text-md">
                                        <span className="text-amber-500">
                                            *
                                        </span>{" "}
                                        Pick up the purchased product at the
                                        store at any time
                                    </div>
                                </div>
                                <StoreIcon
                                    sx={{ color: "#B75800", fontSize: 30 }}
                                />
                            </div>
                        </div>
                        <div
                            className={`col-span-1 py-4 px-8 border-2 ${
                                delivery == "Standard" ? "border-amber-500" : ""
                            } rounded-full`}
                            onClick={() => {
                                if (delivery !== "Standard") {
                                    setDelivery("Standard");
                                    setTotalPrice(Number(totalPrice) + 39);
                                }
                            }}
                            
                        >
                            <div className="flex justify-between items-center">
                                <div className="flex flex-col justify-around">
                                    <div className="text-xl font-bold">
                                        Standard Delivery
                                    </div>
                                    <div className="text-md">
                                        <span className="text-amber-500">
                                            *
                                        </span>{" "}
                                        Estimated Delivery:{" "}
                                        {moment()
                                            .add(3, "days")
                                            .format("MMM DD")}{" "}
                                        -{" "}
                                        {moment()
                                            .add(6, "days")
                                            .format("MMM DD")}
                                    </div>
                                </div>
                                <div className="text-xl">
                                    P<span className="ml-5">39.00</span>
                                </div>
                            </div>
                        </div>
                        <div
                            className={`col-span-1 py-4 px-8 border-2 ${
                                delivery == "SameDay" ? "border-amber-500" : ""
                            } rounded-full`}
                            onClick={() => {
                                if (delivery !== "SameDay") {
                                    setDelivery("SameDay");
                                    setTotalPrice(Number(totalPrice) + 150);
                                }
                            }}
                        >
                            <div className="flex justify-between items-center">
                                <div className="flex flex-col justify-around">
                                    <div className="text-xl font-bold">
                                        Same Day Delivery
                                    </div>
                                    <div className="text-md">
                                        <span className="text-amber-500">
                                            *
                                        </span>{" "}
                                        Pick up the purchased product at the
                                        store at any time
                                    </div>
                                </div>
                                <div className="text-xl">
                                    P<span className="ml-5">150.00</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="text-2xl font-bold mb-6">Payment</div>
                    <div className="grid grid-cols-1 gap-4 mb-6">
                        <div
                            className={`col-span-1 py-4 px-8 border-2 ${
                                mop == "GCash" ? "border-amber-500" : ""
                            } rounded`}
                            onClick={() => setMop("GCash")}
                        >
                            <div className="text-xl">GCash</div>
                        </div>
                        <div
                            className={`col-span-1 py-4 px-8 border-2 ${
                                mop == "COD" ? "border-amber-500" : ""
                            } rounded`}
                            onClick={() => setMop("COD")}
                        >
                            <div className="text-xl">Cash on Delivery</div>
                        </div>
                    </div>
                    {mop == "GCash" && (
                        <>
                            <div className="text-2xl font-bold mb-6">
                                Payment Details
                            </div>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
                                <div className="col-span-1">
                                    <div className="flex justify-between items-center">
                                        <img
                                            src={`https://picsum.photos/500/500`}
                                            height={500}
                                            width={500}
                                        />
                                    </div>
                                </div>
                                <div className="col-span-1">
                                    <CustomFileUpload
                                        handleFile={setGcashFile}
                                    />
                                </div>
                            </div>
                        </>
                    )}
                    <Button
                        sx={{
                            backgroundColor: "#B75800",
                            color: "#FFF",
                            "&:hover": {
                                backgroundColor: "#B75800",
                                color: "#FFF",
                            },
                        }}
                        fullWidth
                    >
                        PAY NOW
                    </Button>
                </div>
                <div className="col-span-1 bg-black">
                    <div className="py-6 border-b-white border-b-2 mx-10">
                        {carts.map((item, index) => {
                            console.log(item);
                            return <CheckoutCard cart={item} key={index} />;
                        })}
                    </div>
                    <div className="py-6 mx-10 border-b-white border-b-2">
                        <div className="px-20">
                            <div className="text-2xl font-bold text-white">
                                Order Summary
                            </div>
                            <div className="flex justify-between items-center">
                                <div className="text-lg text-white">Items</div>
                                <div className="text-lg text-white">
                                    {quantity}
                                </div>
                            </div>
                            <div className="flex justify-between items-center">
                                <div className="text-lg text-white">
                                    Sub Total
                                </div>
                                <div className="text-lg text-white">
                                    Php {subTotalPrice}
                                </div>
                            </div>
                            {delivery == "Standard" && (
                                <div className="flex justify-between items-center">
                                    <div className="text-lg text-white">
                                        Delivery Fee
                                    </div>
                                    <div className="text-lg text-white">
                                        Php 39
                                    </div>
                                </div>
                            )}
                            {delivery == "SameDay" && (
                                <div className="flex justify-between items-center">
                                    <div className="text-lg text-white">
                                        Delivery Fee
                                    </div>
                                    <div className="text-lg text-white">
                                        Php 150
                                    </div>
                                </div>
                            )}
                            <div className="border-dashed border-b-2 my-5"></div>
                            <div className="flex justify-between items-center">
                                <div className="text-2xl font-bold text-white">
                                    Total
                                </div>
                                <div className="text-2xl text-white">
                                    ₱ {totalPrice}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;

if (document.getElementById("CheckoutPage")) {
    const element = document.getElementById("CheckoutPage");
    const props = Object.assign({}, element.dataset);
    ReactDOM.render(
        <Checkout {...props} />,
        document.getElementById("CheckoutPage")
    );
}

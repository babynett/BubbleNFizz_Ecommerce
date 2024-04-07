import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import CustomTextInput from "../../../components/CustomTextInput";
import StoreIcon from "@mui/icons-material/Store";
import moment from "moment";
import CustomFileUpload from "../../../components/CustomFileUpload";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Typography,
} from "@mui/material";
import { api } from "../../../config/api";
import CheckoutCard from "../../../cards/CheckoutCard";
import swal from "sweetalert";
import { useGeolocated } from "react-geolocated";
import { ArrowRight } from "@mui/icons-material";
import { HmacSHA256 } from "crypto-js";

const Checkout = ({ user }) => {
    const userObject = JSON.parse(user);

    const { coords, isGeolocationAvailable, isGeolocationEnabled } =
        useGeolocated({
            positionOptions: {
                enableHighAccuracy: true,
            },
            userDecisionTimeout: 5000,
        });
    const [open, setOpen] = useState(false);
    const [deliveryPrice, setDeliveryPrice] = useState(0);

    const [carts, setCarts] = useState([]);
    const [quantity, setQuantity] = useState(0);
    const [subTotalPrice, setSubTotalPrice] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    // ADDRESS
    const [address, setAddress] = useState("");
    const [apartment, setApartment] = useState("");
    const [phoneNumber, setPhoneNumber] = useState(
        userObject.profile.contact_no
    );

    // SHIPPING METHOD
    const [delivery, setDelivery] = useState("PickUp");

    // PAYMENT
    const [mop, setMop] = useState("GCash");
    const [gcashFile, setGcashFile] = useState(null); // IF GCASH
    const [filePrev, setFilePrev] = useState(null)

    const [addressError, setAddressError] = useState(false);
    const [apartmentError, setApartmentError] = useState(false);
    const [phoneNumberError, setPhoneNumberError] = useState(false);

    useEffect(() => {
        if (gcashFile == null) {
            setFilePrev(null)
            return
        } 

        const objectUrl = URL.createObjectURL(gcashFile)
        setFilePrev(objectUrl)

        return () => URL.revokeObjectURL(objectUrl)
    }, [gcashFile])

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
        console.log(userObject);
    }, []);

    useEffect(() => {
        if (delivery == "PickUp") {
            setTotalPrice(subTotalPrice);
        } else if (delivery == "Standard") {
            setTotalPrice(subTotalPrice + Number(deliveryPrice));
        } else {
            setTotalPrice(subTotalPrice + 150);
        }
    }, [subTotalPrice, delivery, deliveryPrice]);

    const onSubmitOrder = () => {
        if (
            apartmentError ||
            addressError ||
            phoneNumberError ||
            apartment == "" ||
            address == ""
        ) {
            swal({
                icon: "error",
                title: "Oops...",
                text: "Please fill in the form!",
            });
        } else {
            const formdata = new FormData();
            formdata.append("user_id", userObject.id);
            formdata.append("order_address", address);
            formdata.append("order_apartment", apartment);
            formdata.append("order_phone_number", phoneNumber);
            formdata.append("order_shipping", delivery);
            formdata.append("payment", mop);
            if (mop == "GCash") {
                formdata.append("payment_image", gcashFile);
            } else {
                formdata.append("payment_image", "");
            }
            formdata.append("total_quantity", quantity);
            formdata.append("total_price", totalPrice);
            formdata.append("carts", JSON.stringify(carts));
            api.post("shopping/submitorder", formdata)
                .then((response) => {
                    swal({
                        icon: "success",
                        title: "Order Submitted!",
                        text: "Your order has been submitted!",
                    }).then(() => {
                        location.href = "shopping";
                    });
                })
                .catch((err) => {
                    console.log(err.response);
                });
        }
    };

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
                            <CustomTextInput
                                error={addressError}
                                setError={setAddressError}
                                label={`Address`}
                                value={address}
                                onChangeValue={(e) =>
                                    setAddress(e.target.value)
                                }
                                restrictions={`alphabet`}
                                errorMessage={`Address should only be letters`}
                            />
                        </div>
                        <div className="col-span-1">
                            <CustomTextInput
                                error={apartmentError}
                                setError={setApartmentError}
                                label={`Apartment, Suite, etc.`}
                                value={apartment}
                                onChangeValue={(e) =>
                                    setApartment(e.target.value)
                                }
                                restrictions={`alphabet`}
                                errorMessage={`Apartment, Suite, etc. should only be letters`}
                            />
                        </div>
                        <div className="col-span-1">
                            <CustomTextInput
                                error={phoneNumberError}
                                setError={setPhoneNumberError}
                                label={`Phone Number`}
                                value={phoneNumber}
                                onChangeValue={(e) =>
                                    setPhoneNumber(e.target.value)
                                }
                                restrictions={`numeric`}
                                errorMessage={`Phone number should only be numeric`}
                            />
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
                                    sx={{ color: "#EDBF47", fontSize: 30 }}
                                />
                            </div>
                        </div>
                        <div
                            className={`col-span-1 py-4 px-8 border-2 ${
                                delivery == "Standard" ? "border-amber-500" : ""
                            } rounded-full`}
                            onClick={async () => {
                                if (delivery !== "Standard") {
                                    setDelivery("Standard");
                                    setTotalPrice(Number(totalPrice) + 39);
                                    console.log(coords);
                                    const SECRET =
                                        "sk_test_EO8bTWNXo86M0byh3gxDcXWFej9Q6Uu1h/idBaQnX+uS35q3LzOr9oVZSu/KvbmL";
                                    const time = new Date()
                                        .getTime()
                                        .toString();
                                    const method = "POST";
                                    const path = "/v3/quotations";
                                    const body = {
                                        data: {
                                            serviceType: "MOTORCYCLE",
                                            language: "en_PH",
                                            stops: [
                                                {
                                                    coordinates: {
                                                        lat: "14.738250",
                                                        lng: "121.040970",
                                                    },
                                                    address:
                                                    "B13 L39 Neptune St, North Olympus Subdivision, Kaligayahan, Novaliches, Quezon City, 1124",
                                                },
                                                {
                                                    coordinates: {
                                                        lat: `${coords.latitude}`,
                                                        lng: `${coords.longitude}`,
                                                    },
                                                    address: `test location`,
                                                },
                                            ],
                                            item: {
                                                // Recommended
                                                quantity: "3",
                                                weight: "LESS_THAN_3KG",
                                                categories: ["FOOD_DELIVERY"],
                                                handlingInstructions: [
                                                    "KEEP_UPRIGHT",
                                                ],
                                            },
                                            isRouteOptimized: true, // optional
                                        },
                                    };
                                    const rawSignature = `${time}\r\n${method}\r\n${path}\r\n\r\n${JSON.stringify(
                                        body
                                    )}`;
                                    // const SIGNATURE = await JSHmac(
                                    //   rawSignature,
                                    //   SECRET,
                                    //   CONSTANTS.HmacAlgorithms.HmacSHA256,
                                    // );
                                    const SIGNATURE = HmacSHA256(
                                        rawSignature,
                                        SECRET
                                    ).toString();

                                    const API_KEY =
                                        "pk_test_c8dffbde99c92c70f73f2f38ae3835ef";
                                    const TOKEN = `${API_KEY}:${time}:${SIGNATURE}`;
                                    console.log(body);

                                    axios
                                        .post(
                                            "https://rest.sandbox.lalamove.com/v3/quotations",
                                            body,
                                            {
                                                headers: {
                                                    Authorization: `hmac ${TOKEN}`,
                                                    Market: "PH"
                                                },
                                            }
                                        )
                                        .then((response) => {
                                            console.log(response.data.data.priceBreakdown.total);
                                            setDeliveryPrice(response.data.data.priceBreakdown.total)
                                            setOpen(true);
                                        })
                                        .catch((err) => {
                                            console.log(err);
                                        });
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
                                <div className="text-sm">
                                    <ArrowRight
                                        sx={{ color: "#EDBF47", fontSize: 30 }}
                                    />
                                </div>
                                <Dialog
                                    open={open}
                                    onClose={() => {
                                        setOpen(false);
                                    }}
                                    aria-labelledby="alert-dialog-title"
                                    aria-describedby="alert-dialog-description"
                                >
                                    <div className="w-full border-b-2 border-black">
                                        <DialogTitle id="alert-dialog-title">
                                            Lalamove Delivery Fee
                                        </DialogTitle>
                                    </div>
                                    <DialogContent>
                                        <div className="flex justify-center items-center w-full flex-col">
                                            <img src="https://scontent.fmnl4-5.fna.fbcdn.net/v/t39.30808-6/355834914_564132642573056_8395635760706896362_n.png?_nc_cat=1&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeFTABb2V0ntlYZ60_YtNxn5XvopGX_lLLBe-ikZf-UssLCHfyF8pGXk22E2xKlRBKZ5DFS5Grt_PQ5fvoaegTEi&_nc_ohc=Kedsn8g3u58Ab7uWGmw&_nc_ht=scontent.fmnl4-5.fna&oh=00_AfAS_1bWAJw47WUsSjkxAU4q3NjYspwMukEU_zaGi1zbdA&oe=66185E99" width={250} height={250} />
                                            <Typography variant="h6">Total Delivery Price: P{deliveryPrice}</Typography>
                                        </div>
                                        <DialogContentText id="alert-dialog-description">
                                            {/* Let Google help apps determine location. This
                                means sending anonymous location data to Google,
                            even when no apps are running. */}
                                        </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button
                                            onClick={() => {
                                                setOpen(false);
                                            }}
                                            variant="contained"
                                            color="error"
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            onClick={() => {
                                                setOpen(false);
                                            }}
                                            autoFocus
                                            variant="contained"
                                            color="primary"
                                        >
                                            Agree
                                        </Button>
                                    </DialogActions>
                                </Dialog>
                            </div>
                        </div>
                        {/* <div
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
                        </div> */}
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
                                            src={gcashFile == null ? `https://bubblenfizz-store.com/images/static/image282.png` : filePrev}
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
                            backgroundColor: "#EDBF47",
                            color: "#FFF",
                            "&:hover": {
                                backgroundColor: "#EDBF47",
                                color: "#FFF",
                            },
                        }}
                        fullWidth
                        onClick={onSubmitOrder}
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
                                        Php {deliveryPrice}
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

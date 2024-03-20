import { AccountCircle, Add, Remove } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import CustomAutoComplete from "../../../components/CustomAutoComplete";
import { api } from "../../../config/api";
import {
    Button,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import CustomTextInput from "../../../components/CustomTextInput";
import swal from "sweetalert";

const PaymentRegister = () => {
    const [allUsers, setAllUsers] = useState([]);
    const [category, setCategory] = useState("Artisan Facial and Body Soaps");
    const [products, setProducts] = useState([]);

    // form
    const [selectedUser, setSelectedUser] = useState(undefined);
    // const [discount, setDiscount] = useState("");
    const [apartment, setApartment] = useState("");
    const [items, setItems] = useState([]);
    const [totalQuantity, setTotalQuantity] = useState(0)
    const [totalPrice, setTotalPrice] = useState(0)
    const [subTotal, setSubTotal] = useState(0)

    useEffect(() => {
        api.get("usermanagement/getallcustomers")
            .then((response) => {
                const userList = response.data;
                let temp = [];
                userList.map((item, index) => {
                    temp = [
                        ...temp,
                        {
                            label: item.name,
                            value: item,
                        },
                    ];
                });

                setAllUsers(temp);
            })
            .catch((err) => {
                console.log(err.response);
            });
    }, []);

    useEffect(() => {
        api.get(`shopping/getpaymentproduct?category=${category}`)
            .then((response) => {
                console.log(response.data);
                setProducts(response.data);
            })
            .catch((err) => {
                console.log(err.response);
            });
    }, [category]);

    const submitPayment = () => {
        swal({
            icon: "warning",
            title: "Submit Order?",
            text: "Are you sure you want to submit the order?",
            buttons: ['No', 'Yes']
        }).then((response) => {
            if (response) {
                if (selectedUser == undefined || apartment == "") {
                    swal({
                        icon: "error",
                        title: "Error!",
                        text: "Please complete the form!",
                    })
                } else {
                    console.log(items)
                    console.log(selectedUser.value.id)
                    console.log(selectedUser.value.profile.address)
                    console.log(apartment)
                    console.log(selectedUser.value.profile.contact_no)
                    console.log('Walk In')
                    console.log('POS')
                    console.log(totalQuantity)
                    console.log(totalPrice)
                    api.post('shopping/submitorder', {
                        user_id: selectedUser.value.id,
                        order_address: selectedUser.value.profile.address,
                        order_apartment: apartment,
                        order_phone_number: selectedUser.value.profile.contact_no,
                        order_shipping: "Walk In",
                        payment: "POS",
                        total_quantity: totalQuantity,
                        total_price: totalPrice,
                        carts: JSON.stringify(items)
                    }).then(response => {
                        swal({
                            icon: 'success',
                            title: "Order Added!",
                            text: "The order has been added!"
                        }).then(() => {
                            setSelectedUser(undefined)
                            setApartment("")
                            setItems([])
                            setTotalQuantity(0)
                            setTotalPrice(0)
                            setSubTotal(0)
                        })
                        console.log(response.data)
                    }).catch(err => {
                        console.log(err.response)
                    })
                }
                // console.log(selectedUser.id)
                // console.log(selectedUser.profile.address)
                // console.log(selectedUser.profile)
            }
        })
    }

    return (
        <div className="w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="col-span-1">
                    <div className="flex space-x-8 justify-center items-center">
                        <div>
                            <AccountCircle sx={{ fontSize: 100 }} />
                        </div>
                        <div className="w-full">
                            <CustomAutoComplete
                                label={`Customer`}
                                value={selectedUser? selectedUser.label : ''}
                                onChange={(e, value) => {
                                    setSelectedUser(value);
                                }}
                                options={allUsers}
                            />
                        </div>
                    </div>
                    {selectedUser && (
                    <CustomTextInput
                        label={`Apartment`}
                        value={apartment}
                        onChangeValue={(e) => setApartment(e.target.value)}
                    />
                    )}
                    <div className="my-3">
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Grams</TableCell>
                                        <TableCell>Qty</TableCell>
                                        <TableCell>Price</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {items.length > 0 &&
                                        items.map((item, index) => {
                                            return (
                                                <TableRow key={index}>
                                                    <TableCell component={"th"}>
                                                        {item.product_name}
                                                    </TableCell>
                                                    <TableCell>
                                                        {item.product_weight}
                                                    </TableCell>
                                                    <TableCell>
                                                        <IconButton
                                                            onClick={() => {
                                                                const updatedItems = items.map((tempItem) => {
                                                                    if (tempItem.product_id === item.product_id) {
                                                                        setSubTotal(subTotal - Number(tempItem.fixed_price))
                                                                        setTotalPrice(totalPrice - Number(tempItem.fixed_price))
                                                                        setTotalQuantity(totalQuantity - 1)
                                                                        return {
                                                                            ...tempItem,
                                                                            id: item.product_id,
                                                                            cart_quantity: Math.max(Number(tempItem.cart_quantity) - 1, 0),
                                                                            cart_price: Number(tempItem.cart_price) - Number(tempItem.fixed_price)
                                                                        };
                                                                    }
                                                                    return tempItem;
                                                                }).filter((tempItem) => tempItem.cart_quantity > 0); 

                                                                setItems(updatedItems);
                                                            }}
                                                        >
                                                            <Remove />
                                                        </IconButton>
                                                        {item.cart_quantity}{" "}
                                                        <IconButton onClick={() => {
                                                            const updatedItems = items.map((tempItem) => {
                                                                if (tempItem.product_id === item.product_id) {
                                                                    setSubTotal(subTotal + Number(tempItem.fixed_price))
                                                                    setTotalPrice(totalPrice + Number(tempItem.fixed_price))
                                                                    setTotalQuantity(totalQuantity + 1)
                                                                    return {
                                                                        ...tempItem,
                                                                        cart_quantity: Number(tempItem.cart_quantity) + 1,
                                                                        cart_price: Number(tempItem.cart_price) + Number(tempItem.fixed_price)
                                                                    };
                                                                }
                                                                return tempItem;
                                                            });
                                                            setItems(updatedItems);
                                                        }}>
                                                        <Add />
                                                        </IconButton>
                                                    </TableCell>
                                                    <TableCell>
                                                        {item.cart_price}
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                    <div className="py-3 border-t-2 border-black w-full">
                        <Typography variant="h4" fontWeight={700}>Order Summary</Typography>
                        <div className="flex justify-between items-center">
                            <Typography>Items</Typography>
                            <Typography>{totalQuantity}</Typography>
                        </div>
                        <div className="flex justify-between items-center pb-5">
                            <Typography>Sub Total</Typography>
                            <Typography>Php {subTotal}.00</Typography>
                        </div>
                        <div className="flex justify-between items-center border-t-2 border-black border-dashed py-5">
                            <Typography variant="h5">Total</Typography>
                            <Typography variant="h5">₱ {totalPrice}.00</Typography>
                        </div>
                        <Button variant="contained" fullWidth sx={{ backgroundColor: "#EDBF47", "&:hover": {backgroundColor: "#EDBF47"} }} onClick={submitPayment}>
                            Pay Now!
                        </Button>
                    </div>
                </div>
                <div className="col-span-1">
                    <div className="flex items-center space-x-4 justify-center">
                        <Button
                            variant="contained"
                            onClick={() =>
                                setCategory("Artisan Facial and Body Soaps")
                            }
                        >
                            Artisan Facial and Body Soaps
                        </Button>
                        <Button
                            variant="contained"
                            onClick={() => setCategory("Shampoo Bars")}
                        >
                            Shampoo Bars
                        </Button>
                        <Button
                            variant="contained"
                            onClick={() => setCategory("Bath Bomb")}
                        >
                            Bath Bomb
                        </Button>
                        <Button
                            variant="contained"
                            onClick={() => setCategory("Bubble Bath")}
                        >
                            Bubble Bath
                        </Button>
                    </div>
                    <div className="grid grid-cols-3 mt-5 gap-5">
                        {products.map((item, index) => {
                            if (item.product_details !== null) {
                                let weight = "";
                                if (category == "Bubble Bath") {
                                    weight = String(
                                        String(
                                            item.product_details.product_name
                                        ).substring(
                                            String(
                                                item.product_details
                                                    .product_name
                                            ).length - 5
                                        )
                                    ).replace(" ", "");
                                } else {
                                    weight = String(
                                        String(
                                            item.product_details.product_name
                                        ).substring(
                                            String(
                                                item.product_details
                                                    .product_name
                                            ).length - 4
                                        )
                                    ).replace(" ", "");
                                }
                                const trim1 = String(
                                    item.product_details.product_name
                                ).replace("Bubble N Fizz ", "");
                                const trim2 = trim1.replace(/[0-9g]/g, "");
                                const firstLetters =
                                    String(trim2).match(/\b(\w)/g);
                                const acronym = firstLetters.join("");
                                return (
                                    <div
                                        className="col-span-1 bg-gray-900 rounded-2xl"
                                        key={index}
                                        onClick={() => {
                                            let temp = [
                                                ...items,
                                                {
                                                    product_id: item.product_id,
                                                    product_name: `${acronym} ${item.product_details.product_scent_name}`,
                                                    product_weight: `${weight}`,
                                                    cart_quantity: 1,
                                                    cart_price:
                                                        item.product_details
                                                            .product_price,
                                                    fixed_price: item.product_details.product_price
                                                },
                                            ];
                                            setTotalQuantity(totalQuantity + 1)
                                            setTotalPrice(totalPrice + Number(item.product_details.product_price))
                                            setSubTotal(subTotal + Number(item.product_details.product_price))
                                            setItems(temp);
                                        }}
                                    >
                                        <div className="flex p-5 flex-col justify-center items-center space-y-4">
                                            <img
                                                src={`https://picsum.photos/200/200`}
                                                height={200}
                                                width={200}
                                            />
                                            <Typography
                                                variant="h6"
                                                sx={{ color: "#fff" }}
                                                textAlign={'center'}
                                            >
                                                {`${acronym} ${item.product_details.product_scent_name} ${weight}`}
                                            </Typography>
                                        </div>
                                    </div>
                                );
                            }
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentRegister;

if (document.getElementById("PaymentRegister")) {
    ReactDOM.render(
        <PaymentRegister />,
        document.getElementById("PaymentRegister")
    );
}

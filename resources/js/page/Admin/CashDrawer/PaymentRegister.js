import { AccountCircle } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import CustomAutoComplete from "../../../components/CustomAutoComplete";
import { api } from "../../../config/api";
import { Button, Typography } from "@mui/material";

const PaymentRegister = () => {
    const [allUsers, setAllUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState({});
    const [category, setCategory] = useState("Artisan Facial and Body Soaps");
    const [products, setProducts] = useState([]);

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
                            value: item.id,
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
                                value={selectedUser.label}
                                onChange={(e, value) => {
                                    setSelectedUser(value);
                                }}
                                options={allUsers}
                            />
                        </div>
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
                                return (
                                    <div
                                        className="col-span-1 bg-gray-900 rounded-2xl"
                                        key={index}
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
                                            >
                                                {item.product_details.product_scent_name}
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

import { Button, Rating, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import CustomShoppingCard from "../../components/shopping/CustomShoppingCard";
import { api } from "../../config/api";

const ShoppingPage = (props) => {
    const [products, setProducts] = useState([]);
    const [bestProducts, setBestProducts] = useState([]);

    useEffect(() => {
        console.log(JSON.parse(props.image));
        api.get("shopping/getthreeproducts")
            .then((response) => {
                setProducts(response.data);
            })
            .catch((err) => {
                console.log(err.response);
            });

        api.get("shopping/getbestsellers")
            .then((response) => {
                setBestProducts(response.data);
                console.log(response.data);
            })
            .catch((err) => {
                console.log(err.response);
            });
    }, []);
    return (
        <div className="w-full">
            <div
                className="w-full h-[85vh] bg-no-repeat bg-cover bg-center bg-fixed"
                style={{
                    backgroundImage: `url(${JSON.parse(props.image)[0]})`,
                }}
            >
                <div className="flex justify-center items-center flex-col h-full">
                    <div className="text-9xl font-bold">RICH</div>
                    <div className="text-9xl font-bold">PEOPLE</div>
                    <div className="text-9xl font-bold">SOAP</div>
                    <div className="my-10">
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: "#000",
                                color: "#fff",
                                fontWeight: 700,
                                fontSize: 20,
                                paddingLeft: 3,
                                paddingRight: 3,
                            }}
                        >
                            BATH NOW
                        </Button>
                    </div>
                </div>
            </div>

            <div className="mx-10 my-12">
                <Typography variant="h4" fontWeight={700}>
                    RECOMMENDED
                </Typography>
            </div>

            <div className="mx-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                    {products.map((item, index) => {
                        return (
                            <div className="col-span-1">
                                <CustomShoppingCard
                                    title={item.product_name}
                                    price={item.product_price}
                                    rating={item.product_rating}
                                    scentName={item.product_scent_name}
                                    onClick={() =>
                                        window.location.href = 
                                            `/shopping/${item.id}`
                                        
                                    }
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className="my-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="col-span-1">
                        <div
                            className="w-full h-[65vh] bg-no-repeat bg-cover bg-center"
                            style={{
                                backgroundImage: `url(${
                                    JSON.parse(props.image)[1]
                                })`,
                            }}
                        >
                            <div className="flex justify-end items-center flex-col h-full pb-12">
                                <Button
                                    variant="contained"
                                    className="hover:scale-110"
                                    sx={{
                                        backgroundColor: "#B75800",
                                        color: "#fff",
                                        "&:hover": {
                                            backgroundColor: "#B75800",
                                        },
                                    }}
                                >
                                    BUY NOW
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-1">
                        <div
                            className="w-full h-[65vh] bg-no-repeat bg-cover bg-center"
                            style={{
                                backgroundImage: `url(${
                                    JSON.parse(props.image)[2]
                                })`,
                            }}
                        >
                            <div className="flex justify-end items-center flex-col h-full pb-12">
                                <Button
                                    variant="contained"
                                    className="hover:scale-110"
                                    sx={{
                                        backgroundColor: "#B75800",
                                        color: "#fff",
                                        "&:hover": {
                                            backgroundColor: "#B75800",
                                        },
                                    }}
                                >
                                    BUY NOW
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mx-10 my-12">
                <Typography variant="h4" fontWeight={700}>
                    BEST SELLERS
                </Typography>
            </div>

            <div className="mx-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                    {bestProducts.map((item, index) => {
                        return (
                            <div className="col-span-1">
                                <CustomShoppingCard
                                    title={item.product_details.product_name}
                                    price={item.product_details.product_price}
                                    rating={item.product_details.product_rating}
                                    scentName={
                                        item.product_details.product_scent_name
                                    }
                                    onClick={() =>
                                        (window.location.href = `/shopping/${item.id}`)
                                    }
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default ShoppingPage;

if (document.getElementById("ShoppingPage")) {
    const element = document.getElementById("ShoppingPage");
    const props = Object.assign({}, element.dataset);
    ReactDOM.render(
        <ShoppingPage {...props} />,
        document.getElementById("ShoppingPage")
    );
}

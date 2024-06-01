import { Button, Rating, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import CustomShoppingCard from "../../components/shopping/CustomShoppingCard";
import { api } from "../../config/api";

const ShoppingPage = (props) => {
    const userObject =
        props.user == undefined || props.user == null
            ? null
            : JSON.parse(props.user);
    const [products, setProducts] = useState([]);
    const [bestProducts, setBestProducts] = useState([]);
    const [similarProducts, setSimilarProducts] = useState([]);
    const [pollProducts, setPollProducts] = useState([]);

    useEffect(() => {
        console.log(JSON.parse(props.image));
        if (userObject == null) {
            api.get("shopping/getthreeproducts")
                .then((response) => {
                    setProducts(response.data);
                })
                .catch((err) => {
                    console.log(err.response);
                });
        } else {
            if (userObject.user_role == 1) {
                location.href = "home";
            }
            api.post("recommenditems", {
                user_id: userObject.id,
            })
                .then((response) => {
                    setProducts(response.data);
                    console.log(response.data);
                })
                .catch((err) => {
                    console.log(err.response);
                });
            api.post("usermanagement/getuserpoll", {
                user_id: userObject.id,
            }).then((response) => {
                const fragrance = response.data.fragrance;
                api.post("customerpollresult", {
                    product_scent: JSON.parse(fragrance),
                }).then((response) => {
                    setPollProducts(response.data);
                });
            });
        }

        api.get("shopping/getbestsellers")
            .then((response) => {
                setBestProducts(response.data);
                console.log(response.data);
            })
            .catch((err) => {
                console.log(err.response);
            });

        api.get("shopping/similarproducts")
            .then((response) => {
                setSimilarProducts(response.data);
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

            {/* <div className="mx-10 my-12">
                <Typography variant="h4" fontWeight={700}>
                    RECOMMENDED
                </Typography>
                <Typography variant="subtitle1" color={"GrayText"}>
                    Here are the products that other users are buying!
                </Typography>
            </div>

            <div className="mx-10">
                <div className="grid grid-cols-1 lg:grid-cols-6 gap-5">
                    {products.map((item, index) => {
                        if (index < 6) {
                            return (
                                <div className="col-span-1">
                                    <CustomShoppingCard
                                        title={String(
                                            item.product_name
                                        ).replace("Bubble N Fizz", "")}
                                        price={item.product_price}
                                        rating={item.product_rating}
                                        scentName={item.product_scent_name}
                                        onClick={() =>
                                            (window.location.href = `/shopping/${item.id}`)
                                        }
                                        sales={item.category.product_sales}
                                        image={item.product_images}
                                    />
                                </div>
                            );
                        }
                    })}
                </div>
            </div> */}
            {userObject !== null && (
                <>
                    <div className="mx-10 my-12">
                        <Typography variant="h4" fontWeight={700}>
                            POLL RESULTS
                        </Typography>
                        <Typography variant="subtitle1" color={"GrayText"}>
                            Here are the products that your poll result have
                            generated!
                        </Typography>
                    </div>

                    <div className="mx-10">
                        <div className="grid grid-cols-1 lg:grid-cols-6 gap-5">
                            {pollProducts.map((item, index) => {
                                if (index < 6) {
                                    return (
                                        <div className="col-span-1">
                                            <CustomShoppingCard
                                                title={String(
                                                    item.product_name
                                                ).replace("Bubble N Fizz", "")}
                                                price={item.product_price}
                                                rating={item.product_rating}
                                                scentName={
                                                    item.product_scent_name
                                                }
                                                onClick={() =>
                                                    (window.location.href = `/shopping/${item.id}`)
                                                }
                                                sales={
                                                    item.category.product_sales
                                                }
                                                image={item.product_images}
                                            />
                                        </div>
                                    );
                                }
                            })}
                        </div>
                    </div>
                </>
            )}
            <div className="mx-10 my-12">
                <Typography variant="h4" fontWeight={700}>
                    SIMILAR PRODUCTS THAT WE RECOMMEND
                </Typography>
                <Typography variant="subtitle1" color={"GrayText"}>
                    Here are the products that other users are checking out!
                </Typography>
            </div>

            <div className="mx-10">
                <div className="grid grid-cols-1 lg:grid-cols-6 gap-5">
                    {similarProducts.map((item, index) => {
                        return (
                            <div className="col-span-1">
                                <CustomShoppingCard
                                    title={String(item.product_name).replace(
                                        "Bubble N Fizz",
                                        ""
                                    )}
                                    price={item.product_price}
                                    rating={item.product_rating}
                                    scentName={item.product_scent_name}
                                    onClick={() =>
                                        (window.location.href = `/shopping/${item.id}`)
                                    }
                                    sales={item.category.product_sales}
                                    image={item.product_images}
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
                                        backgroundColor: "#EDBF47",
                                        color: "#fff",
                                        "&:hover": {
                                            backgroundColor: "#EDBF47",
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
                                        backgroundColor: "#EDBF47",
                                        color: "#fff",
                                        "&:hover": {
                                            backgroundColor: "#EDBF47",
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
                <Typography variant="subtitle1" color={"GrayText"}>
                    Here are the products the best selling products!
                </Typography>
            </div>

            <div className="mx-10">
                <div className="grid grid-cols-1 lg:grid-cols-6 gap-5">
                    {bestProducts.map((item, index) => {
                        return (
                            <div className="col-span-1">
                                <CustomShoppingCard
                                    title={String(
                                        item.product_details.product_name
                                    ).replace("Bubble N Fizz", "")}
                                    price={item.product_details.product_price}
                                    rating={item.product_details.product_rating}
                                    scentName={
                                        item.product_details.product_scent_name
                                    }
                                    onClick={() =>
                                        (window.location.href = `/shopping/${item.id}`)
                                    }
                                    sales={item.product_sales}
                                    image={item.product_details.product_images}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="mx-10 my-12 py-16 border-y-4 border-black">
                <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-8">
                    <div className="col-span-1">
                        <div className="flex justify-center items-center flex-col space-y-7">
                            <img
                                src={JSON.parse(props.image)[3]}
                                height={125}
                                width={125}
                            />
                            <Typography variant="h4" fontWeight={700}>
                                FREE SHIPPING
                            </Typography>
                            <Typography
                                variant="h6"
                                fontWeight={400}
                                textAlign={"center"}
                            >
                                FREE SHIPPING <br /> on orders over ₱250
                            </Typography>
                        </div>
                    </div>
                    <div className="col-span-1">
                        <div className="flex justify-center items-center flex-col space-y-7">
                            <img
                                src={JSON.parse(props.image)[4]}
                                height={125}
                                width={125}
                            />
                            <Typography variant="h4" fontWeight={700}>
                                EASY RETURNS
                            </Typography>
                            <Typography
                                variant="h6"
                                fontWeight={400}
                                textAlign={"center"}
                            >
                                Return the product <br /> anytime within 30 days
                            </Typography>
                        </div>
                    </div>
                    <div className="col-span-1">
                        <div className="flex justify-center items-center flex-col space-y-7">
                            <img
                                src={JSON.parse(props.image)[5]}
                                height={125}
                                width={125}
                            />
                            <Typography variant="h4" fontWeight={700}>
                                RATING CERTIFIED
                            </Typography>
                            <Typography
                                variant="h6"
                                fontWeight={400}
                                textAlign={"center"}
                            >
                                Our certified organic produce is rated 5 <br />{" "}
                                stars by over 1,000 customers.
                            </Typography>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mx-10 my-12">
                <Typography textAlign={"center"} fontWeight={700} variant="h4">
                    Don't take our word for it? See what others are saying
                </Typography>
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

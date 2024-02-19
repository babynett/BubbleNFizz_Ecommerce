import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { api } from "../../config/api";
import CustomTextInput from "../../components/CustomTextInput";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import swal from "sweetalert";
import { Button, Rating } from "@mui/material";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import CommentsCard from "../../cards/CommentsCard";

const ProductPage = ({ id, user }) => {
    const userObject = JSON.parse(user);
    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(1);
    const [totalPrice, setTotalPrice] = useState(0);
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState("");
    const [userReviews, setUserReviews] = useState([])

    useEffect(() => {
        api.get(`shopping/getproduct?id=${id}`)
            .then((response) => {
                setProduct(response.data);
                setTotalPrice(response.data.product_price);
            })
            .catch((err) => {
                console.log(err.response);
            });

        api.get(`shopping/getproductreviews?product_id=${id}`)
            .then((response) => {
                setUserReviews(response.data)
            })
            .catch(err => {
                console.log(err.response)
            })
    }, []);

    const subQuantity = () => {
        if (quantity == 1) {
            swal({
                icon: "error",
                title: "Oops...",
                text: "Quantity should not be lower than 1",
            });
        } else {
            setQuantity(quantity - 1);
            setTotalPrice(Number(totalPrice) - Number(product.product_price));
        }
    };

    const addQuantity = () => {
        setQuantity(quantity + 1);
        setTotalPrice(Number(totalPrice) + Number(product.product_price));
    };

    const submitReview = () => {
        api.post("/shopping/addreview", {
            user_id: userObject.id,
            product_id: product.id,
            product_rating: rating,
            product_description: review,
        })
            .then((response) => {
                console.log(response.data);
                swal({
                    icon: "success",
                    title: "Review Added!",
                    text: "Your review has been added!",
                }).then(() => {
                    setReview("");
                });
            })
            .catch((err) => {
                console.log(err.response);
            });
    };

    const addToCart = () => {
        api.post("shopping/addtocart", {
            product_id: product.id,
            user_id: userObject.id,
            cart_quantity: quantity,
            cart_price: totalPrice,
        })
            .then((response) => {
                swal({
                    icon: "success",
                    title: "Added to Cart!",
                    text: "Item has been added to cart!",
                }).then(() => {
                    location.reload();
                });
            })
            .catch((err) => {
                console.log(err.response);
            });
    };

    return (
        <div className="w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mx-10 my-12">
                <div className="col-span-1">
                    <div className="grid grid-cols-10">
                        {/* smaller images */}
                        <div className="col-span-2">
                            <img
                                src={`https://picsum.photos/125/125`}
                                height={125}
                                width={125}
                            />
                            <img
                                src={`https://picsum.photos/125/125`}
                                height={125}
                                width={125}
                            />
                            <img
                                src={`https://picsum.photos/125/125`}
                                height={125}
                                width={125}
                            />
                            <img
                                src={`https://picsum.photos/125/125`}
                                height={125}
                                width={125}
                            />
                        </div>
                        {/* large, single image */}
                        <div className="col-span-8">
                            <img
                                src={`https://picsum.photos/500/500`}
                                height={500}
                                width={500}
                            />
                        </div>
                    </div>
                </div>
                <div className="col-span-1">
                    <div className="text-2xl font-bold">
                        Bubble N Fizz Bath Bomb With Surprise Toy Inside Squishy
                        Single Item 130G
                    </div>
                    <div className="border-2 border-black my-8"></div>
                    <div className="mx-8">
                        <div className="text-xl my-8">
                            Scent: {product.product_scent_name}
                        </div>
                        <div className="text-xl my-8">
                            Price: ₱{product.product_price}
                        </div>
                        <div className="text-xl my-8">
                            Stock: {product.product_stock}
                        </div>
                        <div className="text-xl my-8">
                            Quantity:{" "}
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
                        <div className="text-xl my-8">
                            Total Price: ₱{totalPrice}
                        </div>
                        <Button
                            sx={{
                                backgroundColor: "#B75800",
                                color: "#fff",
                                paddingLeft: 4,
                                paddingRight: 4,
                                "&:hover": {
                                    backgroundColor: "#B75800",
                                    color: "#fff",
                                },
                            }}
                            onClick={addToCart}
                        >
                            Add To Cart
                        </Button>
                    </div>
                </div>
            </div>
            <div className="border-2 my-12 mx-10 border-black"></div>
            <div className="mx-10">
                <div className="text-2xl font-bold mb-12">DESCRIPTION</div>
                <div className="text-xl whitespace-break-spaces">
                    {String(product.product_description).replace(/~/g, "\n")}
                </div>
            </div>
            <div className="border-2 my-12 mx-10 border-black"></div>
            <div className="px-10 w-full">
                <div className="flex justify-center items-center flex-col">
                    <div className="text-2xl font-bold mb-12">
                        CUSTOMER REVIEW
                    </div>
                    <div className="text-xl">Review This Product</div>
                    <Rating
                        className="my-6"
                        name="simple-controlled"
                        value={rating}
                        size="large"
                        onChange={(event, newValue) => {
                            setRating(newValue);
                        }}
                    />
                    <div className="w-1/2">
                        <CustomTextInput
                            label={`Review Description`}
                            multiline
                            value={review}
                            onChangeValue={(e) => setReview(e.target.value)}
                        />
                    </div>
                    <Button
                        sx={{
                            backgroundColor: "#B75800",
                            color: "#fff",
                            paddingLeft: 4,
                            paddingRight: 4,
                            marginTop: 2,
                            "&:hover": {
                                backgroundColor: "#B75800",
                                color: "#fff",
                            },
                        }}
                        onClick={submitReview}
                    >
                        Submit Review
                    </Button>
                </div>
            </div>
            <div className="border-2 my-12 mx-10 border-black"></div>
            <div className="px-10 w-full">
                <div className="flex justify-center items-center flex-col">
                    <div className="text-2xl font-bold mb-12">COMMENTS</div>
                </div>
                {userReviews.map((item, index) => {
                    return (
                        <CommentsCard name={item.user.name} description={item.product_description} rating={item.product_rating} />
                    )
                })}
            </div>
        </div>
    );
};

export default ProductPage;

if (document.getElementById("ProductPage")) {
    const element = document.getElementById("ProductPage");
    const props = Object.assign({}, element.dataset);
    ReactDOM.render(
        <ProductPage {...props} />,
        document.getElementById("ProductPage")
    );
}

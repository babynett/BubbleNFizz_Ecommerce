import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Rating,
    Typography,
} from "@mui/material";
import React, { useState } from "react";
import CustomTextInput from "../components/CustomTextInput";
import { api } from "../config/api";
import swal from "sweetalert";

const NotificationCard = ({ order, setRefresher, user, refresher }) => {
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState("");

    const handleSubmitReview = () => {
        api.post('shopping/addreview', {
            user_id: user.id,
            product_id: order.id,
            product_rating: rating, 
            product_description: review,
        }).then(response => {
            setRefresher(refresher + 1)
            swal({
                icon: "success",
                title: "Review Added!",
                text: "Review has been added to product!",
            })
        }).catch(err => {
            console.log(err.response)
        })
    }

    return (
        <>
            <div className="col-span-3 bg-blue-500">
                <img
                    src={`https://picsum.photos/500/300`}
                    height={300}
                    width={500}
                />
            </div>
            <div className="col-span-9">
                <div className="py-1">
                    <Typography variant="body1" fontWeight={700}>
                        Have you rated your purchase?
                    </Typography>
                </div>
                <div className="py-1">
                    <Typography variant="body1">
                        Order is <span className="font-bold">completed</span>.
                        Your feedback matters to others! Rate the product and
                        get chance to get a free discount vouchers.{" "}
                    </Typography>
                </div>
                <div className="w-full h-full">
                    <div className="flex justify-end items-end h-1/2">
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: "#B75800",
                                "&:hover": { backgroundColor: "#B75800" },
                            }}
                            onClick={() => setOpen(true)}
                        >
                            Write A Review
                        </Button>
                    </div>
                    <Dialog
                        open={open}
                        onClose={() => {
                            setOpen(false);
                            setRating(0);
                            setReview("");
                        }}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <div className="w-full border-b-2 border-black">
                            <DialogTitle id="alert-dialog-title">
                                Rate {order.product_name} (
                                {order.product_scent_name})
                            </DialogTitle>
                        </div>
                        <DialogContent>
                            <div className="flex justify-center items-center w-full flex-col">
                                <Rating
                                    className="my-6"
                                    name={`rating${order.id}`}
                                    size="large"
                                    value={rating}
                                    onChange={(event, newValue) => {
                                        setRating(newValue);
                                    }}
                                />
                                <CustomTextInput
                                    label={`Review Description`}
                                    multiline
                                    value={review}
                                    onChangeValue={(e) =>
                                        setReview(e.target.value)
                                    }
                                />
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
                                    setRating(0);
                                    setReview("");
                                }}
                                variant="contained"
                                color="error"
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={() => {
                                    handleSubmitReview()
                                    setOpen(false);
                                    setRating(0);
                                    setReview("");
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
        </>
    );
};

export default NotificationCard;

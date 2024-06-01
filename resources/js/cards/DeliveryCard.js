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

const DeliveryCard = ({ order, setRefresher, user, refresher, image }) => {
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
            <div className="col-span-12">
                <div className="py-1">
                    <Typography variant="body1" fontWeight={700}>
                        Order #{}
                    </Typography>
                </div>
                <div className="py-1">
                    <Typography variant="body1">
                        Order is <span className="font-bold">completed</span>.
                        Your feedback matters to others! Rate the product and
                        get chance to get a free discount vouchers.{" "}
                    </Typography>
                </div>
            </div>
        </>
    );
};

export default DeliveryCard;

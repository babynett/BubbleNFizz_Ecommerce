import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import React, { useState } from "react";
import { api } from "../config/api";
import swal from "sweetalert";
import CustomTextInput from "../components/CustomTextInput";
import CustomFileUpload from "../components/CustomFileUpload";

const CheckoutCard = ({ cart, darkMode = true, isCart = true, refundButton = false }) => {
    const [open, setOpen] = useState(false)
    const [refundImage, setRefundImage] = useState(null)
    const [refundComment, setRefundComment] = useState('')


    const handleRefund = () => {
        const formdata = new FormData()
        formdata.append('id', cart.order_id)
        formdata.append('order_status', "Refund")
        formdata.append('refund_images', refundImage)
        formdata.append('refund_comment', refundComment)
        api.post('ordersmanagement/refunditem', formdata).then(response => {
            swal({
                icon: "success",
                title: "Success!",
                text: "Wait for the refund to be approved!"
            }).then(() => {
                location.reload()
            })
        })
    }

    return (
        <div className="bg-transparent grid grid-cols-12 gap-6 p-4 my-3">
            <div className="col-span-3">
                <div className="flex justify-center items-center h-full">
                    <img
                        src={decodeURI(`https://bubblenfizz-store.com/BubbleNFizz-main/public/image/products/${cart.product.product_images}`)}
                        height={300}
                        width={500}
                    />
                </div>
            </div>
            <div className="col-span-6 h-full flex flex-col justify-between">
                <div className={`text-lg ${darkMode ? 'text-white' : 'text-black'}`}>{cart.product.product_name} {cart.product.product_scent_name} ({cart.order_quantity}x)</div>
            </div>
            <div className="col-span-3">
                <div className="flex justify-center items-center flex-col h-full">
                    <div className={`text-lg ${darkMode ? 'text-white' : 'text-black'} font-bold`}>₱{isCart ? cart.cart_price : cart.order_price}</div>
                {refundButton && (
                    <div className="mt-8" onClick={() => setOpen(true)}>
                        <Button variant="contained" color="error">Refund</Button>
                        <Dialog
                        open={open}
                        onClose={() => {
                            setOpen(false);
                            setRefundImage(null);
                            setRefundComment("");
                        }}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <div className="w-full border-b-2 border-black">
                            <DialogTitle id="alert-dialog-title">
                                Refund Details
                            </DialogTitle>
                        </div>
                        <DialogContent>
                            <div className="flex justify-center items-center w-full flex-col space-y-3">
                                <CustomTextInput
                                    label={`Refund Description`}
                                    multiline
                                    value={refundComment}
                                    onChangeValue={(e) =>
                                        setRefundComment(e.target.value)
                                    }
                                />
                                <CustomFileUpload handleFile={setRefundImage} />
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
                                    setRefundImage(null);
                                    setRefundComment("");
                                }}
                                variant="contained"
                                color="error"
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={() => {
                                    handleRefund()
                                    setOpen(false);
                                    setRefundImage(null);
                                    setRefundComment("");
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
                )}
                </div>
            </div>
        </div>
    );
};

export default CheckoutCard;

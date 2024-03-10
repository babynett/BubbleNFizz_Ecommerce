import { Button, Typography } from "@mui/material";
import React, { useState } from "react";
import CheckOutCard from '../../cards/CheckoutCard'

const MyPurchases = () => {
    const [page, setPage] = useState("To Pay");
    return (
        <>
            <div className="flex justify-around border-b-2 py-6 border-black">
                <Button
                    sx={{
                        color: "#000",
                        paddingRight: 2,
                        paddingLeft: 2,
                        paddingTop: 1,
                        paddingBottom: 1,
                        "&:hover": {
                            backgroundColor: "#B75800",
                            color: "#fff",
                        },
                    }}
                    onClick={() => setPage("Profile")}
                >
                    <Typography>To Pay</Typography>
                </Button>
                <Button
                    sx={{
                        color: "#000",
                        paddingRight: 2,
                        paddingLeft: 2,
                        paddingTop: 1,
                        paddingBottom: 1,
                        "&:hover": {
                            backgroundColor: "#B75800",
                            color: "#fff",
                        },
                    }}
                    onClick={() => setPage("Profile")}
                >
                    <Typography>To Ship</Typography>
                </Button>
                <Button
                    sx={{
                        color: "#000",
                        paddingRight: 2,
                        paddingLeft: 2,
                        paddingTop: 1,
                        paddingBottom: 1,
                        "&:hover": {
                            backgroundColor: "#B75800",
                            color: "#fff",
                        },
                    }}
                    onClick={() => setPage("Profile")}
                >
                    <Typography>To Receive</Typography>
                </Button>
                <Button
                    sx={{
                        color: "#000",
                        paddingRight: 2,
                        paddingLeft: 2,
                        paddingTop: 1,
                        paddingBottom: 1,
                        "&:hover": {
                            backgroundColor: "#B75800",
                            color: "#fff",
                        },
                    }}
                    onClick={() => setPage("Profile")}
                >
                    <Typography>Complete</Typography>
                </Button>
                <Button
                    sx={{
                        color: "#000",
                        paddingRight: 2,
                        paddingLeft: 2,
                        paddingTop: 1,
                        paddingBottom: 1,
                        "&:hover": {
                            backgroundColor: "#B75800",
                            color: "#fff",
                        },
                    }}
                    onClick={() => setPage("Profile")}
                >
                    <Typography>Cancelled</Typography>
                </Button>
                <Button
                    sx={{
                        color: "#000",
                        paddingRight: 2,
                        paddingLeft: 2,
                        paddingTop: 1,
                        paddingBottom: 1,
                        "&:hover": {
                            backgroundColor: "#B75800",
                            color: "#fff",
                        },
                    }}
                    onClick={() => setPage("Profile")}
                >
                    <Typography>Refund</Typography>
                </Button>
            </div>
            <div className="w-full">
                {page == "Pay" ? (
                    <CheckOutCard />
                ) : (
                    <CheckOutCard />
                )}
            </div>
        </>
    );
};

export default MyPurchases;

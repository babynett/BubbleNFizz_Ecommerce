import { Button, Typography } from '@mui/material';
import React, { useState } from 'react'
import CheckoutCard from '../../cards/CheckoutCard';

const MyNotification = () => {
    const [page, setPage] = useState("OrderReviews")
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
                    onClick={() => setPage("OrderReviews")}
                >
                    <Typography>Order Reviews</Typography>
                </Button>
            </div>
            <div className="w-full">
                {page == "OrderReviews" && (
                    <>
                        <CheckoutCard />
                    </>
                )}
            </div>
        </>
    );
}

export default MyNotification;
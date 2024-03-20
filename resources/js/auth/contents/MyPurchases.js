import { Button, Card, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CheckOutCard from '../../cards/CheckoutCard'
import {api} from '../../config/api'

const MyPurchases = ({user}) => {
    const [page, setPage] = useState("Pending");
    const [data, setData] = useState([]);
    useEffect(() => {
        api.get(`ordersmanagement/userorders?user_id=${user.id}&page=${page}`)
            .then((response) => {
                setData(response.data)
            })
            .catch(err => {
                console.log(err.response)
            })
        // console.log(user)
    }, [page])
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
                            backgroundColor: "#EDBF47",
                            color: "#fff",
                        },
                    }}
                    onClick={() => setPage("Pending")}
                >
                    <Typography fontWeight={page == "Pending" ? 700 : 400}>To Pay</Typography>
                </Button>
                <Button
                    sx={{
                        color: "#000",
                        paddingRight: 2,
                        paddingLeft: 2,
                        paddingTop: 1,
                        paddingBottom: 1,
                        fontWeight: page == "To Ship" ? 700 : 400,
                        "&:hover": {
                            backgroundColor: "#EDBF47",
                            color: "#fff",
                        },
                    }}
                    onClick={() => setPage("To Ship")}
                >
                    <Typography fontWeight={page == "To Ship" ? 700 : 400}>To Ship</Typography>
                </Button>
                <Button
                    sx={{
                        color: "#000",
                        paddingRight: 2,
                        paddingLeft: 2,
                        paddingTop: 1,
                        paddingBottom: 1,
                        fontWeight: page == "To Receive" ? 700 : 400,
                        "&:hover": {
                            backgroundColor: "#EDBF47",
                            color: "#fff",
                        },
                    }}
                    onClick={() => setPage("To Receive")}
                >
                    <Typography fontWeight={page == "To Receive" ? 700 : 400}>To Receive</Typography>
                </Button>
                <Button
                    sx={{
                        color: "#000",
                        paddingRight: 2,
                        paddingLeft: 2,
                        paddingTop: 1,
                        paddingBottom: 1,
                        fontWeight: page == "Complete" ? 700 : 400,
                        "&:hover": {
                            backgroundColor: "#EDBF47",
                            color: "#fff",
                        },
                    }}
                    onClick={() => setPage("Complete")}
                >
                    <Typography fontWeight={page == "Complete" ? 700 : 400}>Complete</Typography>
                </Button>
                <Button
                    sx={{
                        color: "#000",
                        paddingRight: 2,
                        paddingLeft: 2,
                        paddingTop: 1,
                        paddingBottom: 1,
                        fontWeight: page == "Cancelled" ? 700 : 400,
                        "&:hover": {
                            backgroundColor: "#EDBF47",
                            color: "#fff",
                        },
                    }}
                    onClick={() => setPage("Cancelled")}
                >
                    <Typography fontWeight={page == "Cancelled" ? 700 : 400}>Cancelled</Typography>
                </Button>
                <Button
                    sx={{
                        color: "#000",
                        paddingRight: 2,
                        paddingLeft: 2,
                        paddingTop: 1,
                        paddingBottom: 1,
                        fontWeight: page == "Refund" ? 700 : 400,
                        "&:hover": {
                            backgroundColor: "#EDBF47",
                            color: "#fff",
                        },
                    }}
                    onClick={() => setPage("Refund")}
                >
                    <Typography fontWeight={page == "Refund" ? 700 : 400}>Refund</Typography>
                </Button>
            </div>
            <div className="w-full">
                {page == "Pending" ? (
                    <div>
                        {data.length > 0 ? data.map((item, index) => {
                        if (item.order_status == "Pending") {
                            return (
                                <div className="w-full mt-3" key={index}>
                                    <div className="w-full flex justify-between">
                                    <Typography variant="h5" fontWeight={700}>
                                    Order #{item.id} (₱{item.total_price})
                                    </Typography>
                                    <div className="text-xs bg-amber-500 px-3 flex justify-center items-center rounded-full text-white">
                                        To Pay
                                    </div>
                                    </div>
                                    {item.order_items.map((item, index) => {
                                        return (
                                            <CheckOutCard cart={item} key={index} darkMode={false} isCart={false} />
                                        )
                                    })}
                                </div>
                            )
                        }
                        }) : (
                            <div className="flex justify-center items-center py-3">
                                <Typography variant="h5" fontWeight={700}>No items to display</Typography>
                            </div>
                        )}
                    </div>
                ) : page == "To Ship" ? (
                    <div>
                        {data.length > 0 ? data.map((item, index) => {
                        if (item.order_status == "To Ship") {
                            return (
                                <div className="w-full mt-3" key={index}>
                                    <div className="w-full flex justify-between">
                                    <Typography variant="h5" fontWeight={700}>
                                    Order #{item.id} (₱{item.total_price})
                                    </Typography>
                                    <div className="text-xs bg-sky-500 px-3 flex justify-center items-center rounded-full text-white">
                                        To Ship
                                    </div>
                                    </div>
                                    {item.order_items.map((item, index) => {
                                        return (
                                            <CheckOutCard cart={item} key={index} darkMode={false} isCart={false} />
                                        )
                                    })}
                                </div>
                            )
                        }
                        }) : (
                            <div className="flex justify-center items-center py-3">
                                <Typography variant="h5" fontWeight={700}>No items to display</Typography>
                            </div>
                        )}
                    </div>
                ) : page == "To Receive" ? (
                    <div>
                        {data.length > 0 ? data.map((item, index) => {
                        if (item.order_status == "To Receive") {
                            return (
                                <div className="w-full mt-3" key={index}>
                                    <div className="w-full flex justify-between">
                                    <Typography variant="h5" fontWeight={700}>
                                    Order #{item.id} (₱{item.total_price})
                                    </Typography>
                                    <div className="text-xs bg-yellow-500 px-3 flex justify-center items-center rounded-full text-white">
                                        To Receive
                                    </div>
                                    </div>
                                    {item.order_items.map((item, index) => {
                                        return (
                                            <CheckOutCard cart={item} key={index} darkMode={false} isCart={false} />
                                        )
                                    })}
                                </div>
                            )
                        }
                        }) : (
                            <div className="flex justify-center items-center py-3">
                                <Typography variant="h5" fontWeight={700}>No items to display</Typography>
                            </div>
                        )}
                    </div>
                ) : page == "Complete" ? (
                    <div>
                        {data.length > 0 ? data.map((item, index) => {
                        if (item.order_status == "Complete") {
                            return (
                                <div className="w-full mt-3" key={index}>
                                    <div className="w-full flex justify-between">
                                    <Typography variant="h5" fontWeight={700}>
                                    Order #{item.id} (₱{item.total_price})
                                    </Typography>
                                    <div className="text-xs bg-green-500 px-3 flex justify-center items-center rounded-full text-white">
                                        Complete
                                    </div>
                                    </div>
                                    {item.order_items.map((item, index) => {
                                        return (
                                            <CheckOutCard cart={item} key={index} darkMode={false} isCart={false} refundButton />
                                        )
                                    })}
                                </div>
                            )
                        }
                        }) : (
                            <div className="flex justify-center items-center py-3">
                                <Typography variant="h5" fontWeight={700}>No items to display</Typography>
                            </div>
                        )}
                    </div>
                ) : page == "Cancelled" ? (
                    <div>
                        {data.length > 0 ? data.map((item, index) => {
                        if (item.order_status == "Cancelled") {
                            return (
                                <div className="w-full mt-3" key={index}>
                                    <div className="w-full flex justify-between">
                                    <Typography variant="h5" fontWeight={700}>
                                    Order #{item.id} (₱{item.total_price})
                                    </Typography>
                                    <div className="text-xs bg-red-500 px-3 flex justify-center items-center rounded-full text-white">
                                        Cancelled
                                    </div>
                                    </div>
                                    {item.order_items.map((item, index) => {
                                        return (
                                            <CheckOutCard cart={item} key={index} darkMode={false} isCart={false} />
                                        )
                                    })}
                                </div>
                            )
                        }
                        }) : (
                            <div className="flex justify-center items-center py-3">
                                <Typography variant="h5" fontWeight={700}>No items to display</Typography>
                            </div>
                        )}
                    </div>
                ) : (
                    <div>
                        {data.length > 0 ? data.map((item, index) => {
                        if (item.order_status == "Refund") {
                            return (
                                <div className="w-full mt-3" key={index}>
                                    <div className="w-full flex justify-between">
                                    <Typography variant="h5" fontWeight={700}>
                                    Order #{item.id} (₱{item.total_price})
                                    </Typography>
                                    <div className="text-xs bg-red-500 px-3 flex justify-center items-center rounded-full text-white">
                                        Refund
                                    </div>
                                    </div>
                                    {item.order_items.map((item, index) => {
                                        return (
                                            <CheckOutCard cart={item} key={index} darkMode={false} isCart={false} />
                                        )
                                    })}
                                </div>
                            )
                        }
                        }) : (
                            <div className="flex justify-center items-center py-3">
                                <Typography variant="h5" fontWeight={700}>No items to display</Typography>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </>
    );
};

export default MyPurchases;

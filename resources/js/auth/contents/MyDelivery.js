import { Button, Card, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CheckOutCard from '../../cards/CheckoutCard'
import {api} from '../../config/api'

const MyDelivery = ({user}) => {
    const [page, setPage] = useState("To Receive");
    const [data, setData] = useState([]);
    useEffect(() => {
        api.get(`ordersmanagement/userorders?user_id=${user.id}&page=${page}`)
            .then((response) => {
                setData(response.data)
            })
            .catch(err => {
                console.log(err.response)
            })
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
                                <div className="w-full mt-3 shadow-2xl p-8" key={index}>
                                    <div className="w-full flex justify-between">
                                        <div className="w-full">

                                    <Typography variant="h5" fontWeight={700}>
                                    Order #{item.id} (₱{item.total_price})
                                    </Typography>
                                    <Typography variant="body1">
                                    {item.delivery && item.delivery.delivery_location !== null ? <><span className="font-bold">Location: </span>{item.delivery.delivery_location}</> : null}
                                    </Typography>
                                    <Typography variant='body1'>
                                    {item.delivery && item.delivery.delivery_courier !== null ? <><span className="font-bold">Courier: </span>{item.delivery.delivery_courier}</> : null}
                                    </Typography>
                                    <Typography variant="body1">
                                    {item.delivery && item.delivery.tracking_number !== null ? <><span className="font-bold">Tracking Number: </span>{item.delivery.tracking_number}</> : null}
                                    </Typography>
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
                                            <CheckOutCard cart={item} key={index} darkMode={false} isCart={false} refundButton={true} />
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

export default MyDelivery;

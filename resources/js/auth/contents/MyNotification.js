import { Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CheckoutCard from "../../cards/CheckoutCard";
import NotificationCard from "../../cards/NotificationCard";
import { api } from "../../config/api";

const MyNotification = ({ user }) => {
    const [page, setPage] = useState("OrderReviews");
    const [data, setData] = useState([]);
    const [refresher, setRefresher] = useState(0)

    useEffect(() => {
        api.post("shopping/getproducttoreview", {
            user_id: user.id,
        })
            .then((response) => {
                setData(response.data);
                console.log(response.data);
            })
            .catch((err) => {
                console.log(err.response);
            });
    }, [refresher]);

    return (
        <>
            <div className="w-full">
                <div className="flex justify-center items-center w-full px-6 py-3">
                    <div className="grid grid-cols-12 gap-6">
                        {data.map((item, index) => {
                            return (
                                <NotificationCard order={item} key={index} user={user} refresher={refresher} setRefresher={setRefresher} />
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    );
};

export default MyNotification;

import { Typography } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom";

const CustomerAccounts = () => {
    return (
        <div className="w-full">
            <Typography variant="h1">Customer Accounts</Typography>
        </div>
    );
};

export default CustomerAccounts;

if (document.getElementById("CustomerAccounts")) {
    ReactDOM.render(
        <CustomerAccounts />,
        document.getElementById("CustomerAccounts")
    );
}

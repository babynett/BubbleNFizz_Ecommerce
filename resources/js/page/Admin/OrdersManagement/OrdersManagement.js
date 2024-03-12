import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import CustomTitle from "../../../texts/CustomTitle";
import swal from "sweetalert";
import { Button, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import { api } from "../../../config/api";
import { DataGrid } from "@mui/x-data-grid";
import moment from "moment";
import { MoreVert } from "@mui/icons-material";

const OrdersManagement = (props) => {
    const type = props.type;
    const [data, setData] = useState([]);
    const [refresher, setRefresher] = useState(0);
    // const [anchorEl, setAnchorEl] = React.useState(null);
    // const open = Boolean(anchorEl);

    useEffect(() => {
        if (type == "Orders") {
            api.get("ordersmanagement/getallorders")
                .then((response) => {
                    setData(response.data);
                })
                .catch((err) => {
                    console.log(err.response);
                });
        } else if (type == "Cancelled") {
            api.get("ordersmanagement/getcancelledorders")
                .then((response) => {
                    setData(response.data);
                })
                .catch((err) => {
                    console.log(err.response);
                });
        }
    }, [refresher]);

    // const handleClick = (event) => {
    //     setAnchorEl(event.currentTarget);
    // };

    // const handleClose = () => {
    //     setAnchorEl(null);
    // };

    const cancelOrder = (id) => {
        swal({
            icon: "warning",
            title: "Cancel Order??",
            text: "Are you sure you want to cancel the order?",
            buttons: ['No', "Yes"]
        }).then((response) => {
            if (response) {
                api.post("ordersmanagement/cancelorder", {
                    id: id,
                }).then((response) => {
                    swal({
                        icon: "success",
                        title: "Order Cancelled!",
                        text: "The order has been cancelled",
                    }).then((response) => {
                        location.reload();
                    });
                });
            }
        })
    };

    const confirmOrder = (id, status) => {
        if (status == "Pending") {
            swal({
                icon: "warning",
                title: "Confirm Order?",
                text: "Are you sure you want to confirm the order?",
                buttons: ["No", "Yes"]
            }).then((response) => {
                if(response) {
                    api.post("ordersmanagement/confirmpayment", {
                        id: id,
                    }).then((response) => {
                        swal({
                            icon: "success",
                            title: "Order Confirmed!",
                            text: "The order has been confirmed",
                        }).then(() => {
                            setRefresher(refresher + 1);
                        });
                    });
                }
            })
        } else if (status == "To Ship") {
            swal({
                icon: "warning",
                title: "To Receive Order?",
                text: "Are you sure you want to confirm the order?",
                buttons: ["No", "Yes"]
            }).then((response) => {
                if(response) {
                    api.post("ordersmanagement/toreceive", {
                        id: id,
                    }).then((response) => {
                        swal({
                            icon: "success",
                            title: "Status Changed!",
                            text: "The order status has been changed",
                        }).then(() => {
                            setRefresher(refresher + 1);
                        });
                    });
                }
            })
        } else if (status == "To Receive") {
            swal({
                icon: "warning",
                title: "Complete Order?",
                text: "Are you sure you want to complete the order?",
                buttons: ["No", "Yes"]
            }).then((response) => {
                if(response) {
                    api.post("ordersmanagement/complete", {
                        id: id,
                    }).then((response) => {
                        swal({
                            icon: "success",
                            title: "Status Changed!",
                            text: "The order status has been changed",
                        }).then(() => {
                            setRefresher(refresher + 1);
                        });
                    });
                }
            })
        } 
    };

    const columns = [
        { field: "id", headerName: "ID", width: 90 },
        {
            field: "customer_details",
            headerName: "Customer Details",
            width: 350,
            editable: true,
            renderCell: (cellValue) => {
                // console.log(cellValue.row)
                return (
                    <div className="flex flex-col">
                        <Typography>
                            Name: {cellValue.row.owned_by.name}
                        </Typography>
                        <Typography>
                            Email: {cellValue.row.owned_by.email}
                        </Typography>
                    </div>
                );
            },
        },
        {
            field: "order_details",
            headerName: "Order Details",
            width: 350,
            editable: true,
            renderCell: (cellValue) => {
                return (
                    <>
                        <Typography>
                            Order Quantity: {cellValue.row.total_quantity}
                        </Typography>
                    </>
                );
            },
        },
        {
            field: "total_amount",
            headerName: "Total Amount",
            width: 150,
            editable: true,
            renderCell: (cellValue) => {
                return (
                    <>
                        <Typography>P {cellValue.row.total_price}</Typography>
                    </>
                );
            },
        },
        {
            field: "payment_status",
            headerName: "Payment Status",
            width: 200,
            editable: true,
            renderCell: (cellValue) => {
                return (
                    <>
                        <Typography>{cellValue.row.payment_status}</Typography>
                    </>
                );
            },
        },
        {
            field: "Delivery Status",
            headerName: "Delivery Status",
            width: 200,
            editable: true,
            renderCell: (cellValue) => {
                return (
                    <>
                        <Typography>{cellValue.row.order_status}</Typography>
                    </>
                );
            },
        },
        type == "Orders" && {
            field: "action",
            headerName: "Action",
            width: 200,
            editable: true,
            renderCell: (cellValue) => {
                const [anchorEl, setAnchorEl] = React.useState(null);
                const open = Boolean(anchorEl);
                const handleClick = (event) => {
                    setAnchorEl(event.currentTarget);
                };

                const handleClose = () => {
                    setAnchorEl(null);
                };
                return (
                    <div className="flex flex-col space-y-2">
                        <IconButton
                            aria-label="more"
                            id={`menu-button${cellValue.row.id}`}
                            aria-controls={
                                open ? `menu${cellValue.row.id}` : undefined
                            }
                            aria-expanded={open ? "true" : undefined}
                            aria-haspopup="true"
                            onClick={(event) => setAnchorEl(event.currentTarget)}
                        >
                            <MoreVert />
                        </IconButton>
                        <Menu
                            id={`menu${cellValue.row.id}`}
                            MenuListProps={{
                                "aria-labelledby": `menu-button${cellValue.row.id}`,
                            }}
                            anchorEl={anchorEl}
                            open={open}
                            onClose={() => setAnchorEl(null)}
                        >
                            {/* PENDING */}
                            {cellValue.row.order_status == "Pending" && (
                                <MenuItem
                                    onClick={() =>
                                        confirmOrder(cellValue.row.id, cellValue.row.order_status)
                                    }
                                >
                                    Confirm Payment
                                </MenuItem>
                            )}
                            {/* TO SHIP */}
                            {cellValue.row.order_status == "To Ship" && (
                                <MenuItem
                                    onClick={() =>
                                        confirmOrder(cellValue.row.id, cellValue.row.order_status)
                                    }
                                >
                                    To Receive
                                </MenuItem>
                            )}
                            {cellValue.row.order_status == "To Receive" && (
                                <MenuItem
                                    onClick={() =>
                                        confirmOrder(cellValue.row.id, cellValue.row.order_status)
                                    }
                                >
                                    Complete
                                </MenuItem>
                            )}
                            {cellValue.row.payment != "COD" && (
                                <MenuItem onClick={handleClose}>
                                    Display Payment
                                </MenuItem>
                            )}
                            {cellValue.row.order_status != "Complete" && (
                            <MenuItem
                                onClick={() => cancelOrder(cellValue.row.id)}
                            >
                                Cancel Order
                            </MenuItem>
                            )}
                        </Menu>
                    </div>
                );
            },
        },
    ];

    return (
        <div className="w-full">
            <CustomTitle
                text={
                    type == "Orders"
                        ? "Pending Delivery/Shipping"
                        : "Canceled Orders"
                }
            />
            {type == "Orders" && (
                <div className="flex w-full justify-end items-center">
                    <Button
                        variant="contained"
                        sx={{ marginBottom: 1 }}
                        onClick={() =>
                            swal({
                                icon: "info",
                                title: "Clicked!",
                                text: "na click hehe",
                            })
                        }
                    >
                        Add Order
                    </Button>
                </div>
            )}
            <DataGrid
                rows={data}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 10,
                        },
                    },
                }}
                pageSizeOptions={[10]}
                disableRowSelectionOnClick
                autoHeight
                rowHeight={100}
            />
        </div>
    );
};

export default OrdersManagement;

if (document.getElementById("OrdersPage")) {
    const element = document.getElementById("OrdersPage");
    const props = Object.assign({}, element.dataset);
    ReactDOM.render(
        <OrdersManagement {...props} />,
        document.getElementById("OrdersPage")
    );
}

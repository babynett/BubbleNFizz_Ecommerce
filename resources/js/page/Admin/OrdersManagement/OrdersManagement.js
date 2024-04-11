import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import CustomTitle from "../../../texts/CustomTitle";
import swal from "sweetalert";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    Menu,
    MenuItem,
    Typography,
} from "@mui/material";
import { api } from "../../../config/api";
import { DataGrid } from "@mui/x-data-grid";
import moment from "moment";
import { MoreVert } from "@mui/icons-material";
import CustomShoppingCard from "../../../components/shopping/CustomShoppingCard";
import CheckoutCard from "../../../cards/CheckoutCard";

const OrdersManagement = (props) => {
    const type = props.type;
    const [data, setData] = useState([]);
    const [refresher, setRefresher] = useState(0);
    // const [anchorEl, setAnchorEl] = React.useState(null);
    // const open = Boolean(anchorEl);
    const [openDialog, setOpenDialog] = useState(false);
    const [openDetails, setOpenDetails] = useState(false);
    const [selectedItem, setSelectedItem] = useState([])

    useEffect(() => {
        if (type == "Orders") {
            api.get("ordersmanagement/getallorders")
                .then((response) => {
                    console.log(response.data);
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
            buttons: ["No", "Yes"],
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
        });
    };

    const confirmOrder = (id, status) => {
        if (status == "Pending") {
            swal({
                icon: "warning",
                title: "Confirm Order?",
                text: "Are you sure you want to confirm the order?",
                buttons: ["No", "Yes"],
            }).then((response) => {
                if (response) {
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
            });
        } else if (status == "To Ship") {
            swal({
                icon: "warning",
                title: "To Receive Order?",
                text: "Are you sure you want to confirm the order?",
                buttons: ["No", "Yes"],
            }).then((response) => {
                if (response) {
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
            });
        } else if (status == "To Receive") {
            swal({
                icon: "warning",
                title: "Complete Order?",
                text: "Are you sure you want to complete the order?",
                buttons: ["No", "Yes"],
            }).then((response) => {
                if (response) {
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
            });
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
                        <Typography>
                            Address: {cellValue.row.owned_by.profile.address},{" "}
                            {cellValue.row.owned_by.profile.city}
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
                const items = cellValue.row.order_items;
                return (
                    <div className="flex flex-col space-y-3">
                        <Typography>
                            Order Quantity: {cellValue.row.total_quantity}
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                setOpenDetails(true)
                                setSelectedItem(cellValue.row.order_items)
                            }}
                        >
                            View Order Items
                        </Button>
                        
                    </div>
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
                    <div className="flex flex-col">
                        <Typography>{cellValue.row.payment_status}</Typography>
                        <Typography>
                            Payment Method:{cellValue.row.payment}
                        </Typography>
                        <Typography>
                            Ref No.:{cellValue.row.payment_reference}
                        </Typography>
                    </div>
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
                            onClick={(event) =>
                                setAnchorEl(event.currentTarget)
                            }
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
                                        confirmOrder(
                                            cellValue.row.id,
                                            cellValue.row.order_status
                                        )
                                    }
                                >
                                    Confirm Payment
                                </MenuItem>
                            )}
                            {/* TO SHIP */}
                            {cellValue.row.order_status == "To Ship" && (
                                <MenuItem
                                    onClick={() =>
                                        confirmOrder(
                                            cellValue.row.id,
                                            cellValue.row.order_status
                                        )
                                    }
                                >
                                    To Receive
                                </MenuItem>
                            )}
                            {cellValue.row.order_status == "To Receive" && (
                                <MenuItem
                                    onClick={() =>
                                        confirmOrder(
                                            cellValue.row.id,
                                            cellValue.row.order_status
                                        )
                                    }
                                >
                                    Complete
                                </MenuItem>
                            )}
                            {cellValue.row.payment != "COD" && (
                                <MenuItem
                                    onClick={() => {
                                        setAnchorEl(null);
                                        setOpenDialog(true);
                                    }}
                                >
                                    Display Payment
                                </MenuItem>
                            )}
                            {cellValue.row.order_status != "Complete" && (
                                <MenuItem
                                    onClick={() =>
                                        cancelOrder(cellValue.row.id)
                                    }
                                >
                                    Cancel Order
                                </MenuItem>
                            )}
                        </Menu>
                        <Dialog
                            open={openDialog}
                            onClose={() => {
                                setOpenDialog(false);
                            }}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <div className="w-full border-b-2 border-black">
                                <DialogTitle id="alert-dialog-title">
                                    Payment Receipt
                                </DialogTitle>
                            </div>
                            <DialogContent>
                                <div className="flex justify-center items-center w-full flex-col">
                                    {/* <CustomTextInput
                                        label={`Review Description`}
                                        multiline
                                        value={review}
                                        onChangeValue={(e) =>
                                            setReview(e.target.value)
                                        }
                                    /> */}
                                    <img
                                        src={`https://bubblenfizz-store.com/BubbleNFizz-main/public/image/order/${cellValue.row.payment_image}`}
                                        height={500}
                                        width={500}
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
                                        setOpenDialog(false);
                                    }}
                                    variant="contained"
                                    color="error"
                                >
                                    Close
                                </Button>
                                {/* <Button
                                    onClick={() => {
                                        handleSubmitReview();
                                        setOpen(false);
                                        setRating(0);
                                        setReview("");
                                    }}
                                    autoFocus
                                    variant="contained"
                                    color="primary"
                                >
                                    Agree
                                </Button> */}
                            </DialogActions>
                        </Dialog>
                    </div>
                );
            },
        },
    ];

    return (
        <div className="w-full">
            <CustomTitle
                text={type == "Orders" ? "Manage Orders" : "Canceled Orders"}
            />
            <Dialog
                            open={openDetails}
                            onClose={() => {
                                setOpenDetails(false);
                                setSelectedItem([])
                            }}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <div className="w-full border-b-2 border-black">
                                <DialogTitle id="alert-dialog-title">
                                    Order Items
                                </DialogTitle>
                            </div>
                            <DialogContent>
                                <div className="flex justify-center items-center w-full flex-col">
                                    {selectedItem.map((item, index) => {
                                        return (
                                            <CheckoutCard
                                                key={index}
                                                cart={item}
                                                darkMode={false}
                                                isCart={false}
                                            />
                                        );
                                    })}
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
                                        setOpenDetails(false);
                                        setSelectedItem([])
                                    }}
                                    autoFocus
                                    variant="contained"
                                    color="primary"
                                >
                                    Close
                                </Button>
                            </DialogActions>
                        </Dialog>
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

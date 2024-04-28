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
import CustomTextInput from "../../../components/CustomTextInput";

const OrdersManagement = (props) => {
    const type = props.type;
    const [data, setData] = useState([]);
    const [refresher, setRefresher] = useState(0);
    // const [anchorEl, setAnchorEl] = React.useState(null);
    // const open = Boolean(anchorEl);
    const [openDialog, setOpenDialog] = useState(false);
    const [openDetails, setOpenDetails] = useState(false);
    const [openRefund, setOpenRefund] = useState(false);
    // FOR DELIVERY
    const [openDelivery, setOpenDelivery] = useState(false)
    const [dialogId, setDialogId] = useState(0);
    const [dialogTitle, setDialogTitle] = useState("");
    const [dialogValue, setDialogValue] = useState("")

    const [refundComment, setRefundComment] = useState("");
    const [refundId, setRefundId] = useState(0);
    const [refundImage, setRefundImage] = useState("");
    const [selectedItem, setSelectedItem] = useState([]);

    const addCourier = () => {
        api.post('ordersmanagement/addcourier', {
            id: dialogId,
            delivery_courier: dialogValue
        }).then((response) => {
            swal({
                icon: "success",
                title: "Courier Added",
                text: "Courier has been added!"
            }).then(() => {
                setRefresher(refresher + 1)
            })
        })
        setOpenDelivery(false);
        setDialogValue("")
    }

    const updateTracking = () => {
        api.post('ordersmanagement/updatetracking', {
            id: dialogId,
            tracking_number: dialogValue
        }).then((response) => {
            swal({
                icon: "success",
                title: "Tracking Updated!",
                text: "Tracking has been updated!"
            }).then(() => {
                setRefresher(refresher + 1)
            })
        })
        setOpenDelivery(false);
        setDialogValue("")
    }

    const updateLocation = () => {
        api.post('ordersmanagement/updatelocation', {
            id: dialogId,
            delivery_location: dialogValue
        }).then((response) => {
            swal({
                icon: "success",
                title: "Location Updated!",
                text: "Location has been updated!"
            }).then(() => {
                setRefresher(refresher + 1)
            })
        })
        setOpenDelivery(false);
        setDialogValue("")
    }

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
        } else if (type == "Refund") {
            api.get("ordersmanagement/getrefundorders")
                .then((response) => {
                    setData(response.data);
                })
                .catch((err) => {
                    console.log(err.response);
                });
        } else if (type == "Delivery") {
            api.get("ordersmanagement/getdeliveries")
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
            width: 300,
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
                                setOpenDetails(true);
                                setSelectedItem(cellValue.row.order_items);
                            }}
                        >
                            View Order Items
                        </Button>
                    </div>
                );
            },
        },
        type != "Delivery" ? {
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
        } : {
            field: "total_amount",
            headerName: "Total Amount",
            width: 300,
            editable: true,
            renderCell: (cellValue) => {
                return (
                    <>
                        {cellValue.row.delivery.delivery_courier == null ? (
                            <Button variant="contained" onClick={() => {
                                setDialogTitle('Add Courier')
                                setDialogId(cellValue.row.delivery.id)
                                setOpenDelivery(true)
                            }}>Add Courier</Button>
                        ) : (
                            <div className="flex-col">
                                <Typography>Courier: {cellValue.row.delivery.delivery_courier}</Typography>
                                <Typography>Tracking #: {cellValue.row.delivery.tracking_number != null ? cellValue.row.delivery.tracking_number : "N/A"}</Typography>
                                <Typography>Location: {cellValue.row.delivery.delivery_location != null ? cellValue.row.delivery.delivery_location : "N/A"}</Typography>
                            </div>
                        )}
                    </>
                );
            },
        },
        type != "Delivery"
            ? {
                  field: "payment_status",
                  headerName: "Payment Status",
                  width: 200,
                  editable: true,
                  renderCell: (cellValue) => {
                      return (
                          <div className="flex flex-col">
                              <Typography>
                                  {cellValue.row.payment_status}
                              </Typography>
                              <Typography>
                                  Payment Method:{cellValue.row.payment}
                              </Typography>
                              <Typography>
                                  Ref No.:{cellValue.row.payment_reference}
                              </Typography>
                          </div>
                      );
                  },
              }
            : {
                  field: "delivery_status",
                  headerName: "Delivery Status",
                  width: 200,
                  editable: true,
                  renderCell: (cellValue) => {
                      return (
                          <div className="flex flex-col">
                              <Typography>
                                  {cellValue.row.delivery.delivery_status}
                              </Typography>
                          </div>
                      );
                  },
              },
        {
            field: "order_status",
            headerName: "Order Status",
            width: 200,
            editable: true,
            renderCell: (cellValue) => {
                return (
                    <>
                        <Typography>{type == "Orders" && cellValue.row.order_status}</Typography>
                    </>
                );
            },
        },
        {
            field: "refund_status",
            headerName: "Refund Status",
            width: 200,
            editable: true,
            renderCell: (cellValue) => {
                return (
                    <>
                        <Typography>
                            {type == "Refund" && cellValue.row.refunds.refund_status}
                        </Typography>
                    </>
                );
            },
        },
        (type == "Orders" || type == "Refund" || type == "Delivery") && {
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
                            {type == "Orders" ? (
                                <>
                                    {/* PENDING */}
                                    {cellValue.row.order_status ==
                                        "Pending" && (
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
                                    {cellValue.row.order_status ==
                                        "To Ship" && (
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
                                    {cellValue.row.order_status ==
                                        "To Receive" && (
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
                                    {cellValue.row.order_status !=
                                        "Complete" && (
                                        <MenuItem
                                            onClick={() =>
                                                cancelOrder(cellValue.row.id)
                                            }
                                        >
                                            Cancel Order
                                        </MenuItem>
                                    )}
                                </>
                            ) : type == "Refund" ? (
                                <>
                                    {cellValue.row.order_status == "Refund" && (
                                        <MenuItem
                                            onClick={() => {
                                                setRefundComment(
                                                    cellValue.row.refunds
                                                        .refund_comment
                                                );
                                                setRefundImage(
                                                    cellValue.row.refunds
                                                        .refund_image
                                                );
                                                setRefundId(
                                                    cellValue.row.refunds.id
                                                );
                                                setOpenRefund(true);
                                            }}
                                        >
                                            Review Refund
                                        </MenuItem>
                                    )}
                                    {cellValue.row.refunds.refund_status ==
                                        "Pending" && (
                                        <>
                                            <MenuItem
                                                onClick={() => {
                                                    api.post(
                                                        "ordersmanagement/confirmrefund",
                                                        {
                                                            id: cellValue.row
                                                                .refunds.id,
                                                        }
                                                    ).then((response) => {
                                                        swal({
                                                            icon: "success",
                                                            title: "Item Refunded!",
                                                            text: "Item has been refunded!",
                                                        }).then(() => {
                                                            location.reload();
                                                        });
                                                    });
                                                }}
                                            >
                                                Accept Refund
                                            </MenuItem>
                                            <MenuItem
                                                onClick={() => {
                                                    api.post(
                                                        "ordersmanagement/rejectrefund",
                                                        {
                                                            id: cellValue.row
                                                                .refunds.id,
                                                        }
                                                    ).then((response) => {
                                                        swal({
                                                            icon: "success",
                                                            title: "Item Rejected!",
                                                            text: "Item has been rejected for refund!",
                                                        }).then(() => {
                                                            location.reload();
                                                        });
                                                    });
                                                }}
                                            >
                                                Reject Refund
                                            </MenuItem>
                                        </>
                                    )}
                                </>
                            ) : (
                                <>
                                    {cellValue.row.delivery.delivery_status ==
                                        "Preparing To Ship" && (
                                        <MenuItem
                                            onClick={() => {
                                                api.post('ordersmanagement/pickedup', {
                                                    id: cellValue.row.delivery.id
                                                }).then(() => {
                                                    swal({
                                                        icon: "success",
                                                        title: "Picked Up!",
                                                        text: "Item has been picked up by courier!"
                                                    }).then(() => {
                                                        setRefresher(refresher + 1)
                                                    })
                                                })
                                            }}
                                        >
                                            Picked Up
                                        </MenuItem>
                                    )}
                                    {cellValue.row.delivery.delivery_status ==
                                        "Picked Up by Courier" && (
                                        <MenuItem
                                            onClick={() => {
                                                api.post('ordersmanagement/delivered', {
                                                    id: cellValue.row.delivery.id
                                                }).then(() => {
                                                    swal({
                                                        icon: "success",
                                                        title: "Delivered!",
                                                        text: "Item has been delivered by courier!"
                                                    }).then(() => {
                                                        setRefresher(refresher + 1)
                                                    })
                                                })
                                            }}
                                        >
                                            Delivered
                                        </MenuItem>
                                    )}
                                    {cellValue.row.delivery.delivery_courier !=
                                        null && (
                                        <MenuItem
                                            onClick={() => {
                                                setDialogTitle('Add/Update Tracking Number')
                                                setDialogId(cellValue.row.delivery.id)
                                                setOpenDelivery(true)
                                            }}
                                        >
                                            Add/Update Tracking Number
                                        </MenuItem>
                                    )}
                                    {cellValue.row.delivery.delivery_courier !=
                                        null && (
                                        <MenuItem
                                            onClick={() => {
                                                setDialogTitle('Add/Update Delivery Location')
                                                setDialogId(cellValue.row.delivery.id)
                                                setOpenDelivery(true)
                                            }}
                                        >
                                            Add/Update Delivery Location
                                        </MenuItem>
                                    )}
                                </>
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
                text={
                    type == "Orders"
                        ? "Manage Orders"
                        : type == "Refund"
                        ? "Manage Refunds"
                        : type == "Delivery"
                        ? "Manage Delivery"
                        : "Canceled Orders"
                }
            />
            <Dialog
                open={openDetails}
                onClose={() => {
                    setOpenDetails(false);
                    setSelectedItem([]);
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
                            setSelectedItem([]);
                        }}
                        autoFocus
                        variant="contained"
                        color="primary"
                    >
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={openRefund}
                onClose={() => {
                    setOpenRefund(false);
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
                    <div className="flex justify-center items-center w-full flex-col">
                        {/* <CustomTextInput
                                        label={`Review Description`}
                                        multiline
                                        value={review}
                                        onChangeValue={(e) =>
                                            setReview(e.target.value)
                                        }
                                    /> */}
                        {refundImage != "" && (
                            <img
                                src={`https://bubblenfizz-store.com/BubbleNFizz-main/public/image/refunds/${refundImage}`}
                                height={500}
                                width={500}
                            />
                        )}
                        <Typography variant="h6">
                            {refundComment != "" && refundComment}
                        </Typography>
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
                            setOpenRefund(false);
                        }}
                        variant="contained"
                        color="error"
                    >
                        Close
                    </Button>
                    {/* <Button
                        onClick={() => {
                            api.post("ordersmanagement/confirmrefund", {
                                id: refundId,
                            }).then((response) => {
                                swal({
                                    icon: "success",
                                    title: "Item Refunded!",
                                    text: "Item has been refunded!",
                                }).then(() => {
                                    location.reload();
                                });
                            });
                            handleSubmitReview();
                            setOpen(false);
                        }}
                        autoFocus
                        variant="contained"
                        color="primary"
                    >
                        Agree
                    </Button> */}
                </DialogActions>
            </Dialog>
            <Dialog
                open={openDelivery}
                onClose={() => {
                    setOpenDelivery(false);
                }}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth
                maxWidth="sm"
            >
                <div className="w-full border-b-2 border-black">
                    <DialogTitle id="alert-dialog-title">
                        {dialogTitle}
                    </DialogTitle>
                </div>
                <DialogContent>
                    <div className="flex justify-center items-center w-full flex-col">
                        <CustomTextInput
                            label={dialogTitle}
                            value={dialogValue}
                            onChangeValue={(e) =>
                                setDialogValue(e.target.value)
                            }
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
                            setOpenDelivery(false);
                        }}
                        variant="contained"
                        color="error"
                    >
                        Close
                    </Button>
                    <Button
                        onClick={() => {
                            if (dialogTitle == "Add Courier") {
                                addCourier()
                            } else if (dialogTitle == "Add/Update Tracking Number") {
                                updateTracking()
                            } else if (dialogTitle == "Add/Update Delivery Location") {
                                updateLocation()
                            }
                        }}
                        variant="contained"
                        color="primary"
                    >
                        Update
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
                    columns: {
                        columnVisibilityModel: type == "Orders" ? {
                            refund_status: false
                        } : type == "Refund" ? {
                            order_status: false
                        } : {
                            refund_status: false,
                            order_status: false
                        }
                    }
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

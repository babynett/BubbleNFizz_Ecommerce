import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import CustomTitle from "../../../texts/CustomTitle";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Rating,
    Typography,
} from "@mui/material";
import { api } from "../../../config/api";
import { DataGrid } from "@mui/x-data-grid";
import swal from "sweetalert";
import CustomTextInput from "../../../components/CustomTextInput";

const ProductsManagement = (props) => {
    const [data, setData] = useState([]);
    const [open, setOpen] = useState(false);
    const [productId, setProductId] = useState("");
    const [productName, setProductName] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [productScent, setProductScent] = useState("");
    // stock
    const [stock, setStock] = useState('');
    const [refresher, setRefresher] = useState(0);

    useEffect(() => {
        console.log(props.deleted);
        console.log(props.stock == true);
        if (props.deleted == "true") {
            api.get("products/getdeletedproducts")
                .then((response) => {
                    setData(response.data);
                    console.log(response.data);
                })
                .catch((err) => {
                    console.log(err.response);
                });
        } else {
            api.get("shopping/getallproducts")
                .then((response) => {
                    setData(response.data);
                    console.log(response.data);
                })
                .catch((err) => {
                    console.log(err.response);
                });
        }
    }, [refresher]);

    const deleteProduct = (id) => {
        api.post("products/deleteproduct", {
            id: id,
        })
            .then((response) => {
                swal({
                    icon: "success",
                    title: "Product Deleted!",
                    text: "Product has been deleted!",
                }).then((response) => {
                    location.reload();
                });
            })
            .catch((err) => {
                console.log(err.response);
            });
    };

    const recoverProduct = (id) => {
        api.post("products/recoverproduct", {
            id: id,
        }).then((response) => {
            swal({
                icon: "success",
                title: "Product Recovered!",
                text: "Product has been recovered!",
            }).then((response) => {
                location.reload();
            });
        });
    };

    const handleStockAdjustment = () => {
        api.post('products/adjuststock', {
            id: productId,
            product_stock: stock
        }).then((response) => {
            setRefresher(refresher + 1)
        }).catch(err => {
            console.log(err.response)
        })
    }

    const handleEditProduct = () => {
        api.post("products/editproduct", {
            id: productId,
            product_name: productName,
            product_description: productDescription,
            product_price: productPrice,
            product_scent: productScent,
            product_stock: stock
        })
            .then((response) => {
                setRefresher(refresher + 1);
            })
            .catch((err) => {
                console.log(err.response);
            });
    };

    const columns = [
        { field: "id", headerName: "ID", width: 90 },
        {
            field: "product_info",
            headerName: "Product Information",
            width: 700,
            editable: true,
            renderCell: (cellValue) => {
                // console.log(cellValue.row)
                return (
                    <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-3">
                            <img
                                src={`https://picsum.photos/300/300`}
                                height={300}
                                width={300}
                            />
                        </div>
                        <div className="col-span-6">
                            <Typography variant="h6">
                                Name: {cellValue.row.product_name}
                            </Typography>
                            <Typography variant="h6">
                                Category:{" "}
                                {cellValue.row.category.product_category}
                            </Typography>
                            <Typography variant="h6">
                                Scent: {cellValue.row.product_scent_name}
                            </Typography>
                        </div>
                        <div className="col-span-3">
                            <div className="flex h-full justify-end items-end space-x-4">
                                {props.deleted == "true" ? (
                                    <Button
                                        variant="contained"
                                        color="success"
                                        onClick={() =>
                                            recoverProduct(cellValue.row.id)
                                        }
                                    >
                                        Recover
                                    </Button>
                                ) : (
                                    <>
                                        {props.stock == "true" ? (
                                            <Button
                                                variant="contained"
                                                color="success"
                                                onClick={() => {
                                                    setOpen(true);
                                                    setProductId(cellValue.row.id)
                                                    setStock(cellValue.row.product_stock)
                                                }}
                                            >
                                                Adjust Stock
                                            </Button>
                                        ) : (
                                            <>
                                                <Button
                                                    variant="contained"
                                                    color="success"
                                                    onClick={() => {
                                                        setOpen(true);
                                                        setProductId(
                                                            cellValue.row.id
                                                        );
                                                        setProductName(
                                                            cellValue.row
                                                                .product_name
                                                        );
                                                        setProductDescription(
                                                            cellValue.row
                                                                .product_description
                                                        );
                                                        setProductPrice(
                                                            cellValue.row
                                                                .product_price
                                                        );
                                                        setProductScent(
                                                            cellValue.row
                                                                .product_scent_name
                                                        );
                                                        setStock(
                                                            cellValue.row
                                                                .product_stock
                                                        );
                                                    }}
                                                >
                                                    Edit
                                                </Button>

                                                <Button
                                                    variant="contained"
                                                    color="error"
                                                    onClick={() =>
                                                        deleteProduct(
                                                            cellValue.row.id
                                                        )
                                                    }
                                                >
                                                    Delete
                                                </Button>
                                            </>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                );
            },
        },
        {
            field: "product_price",
            headerName: "Product Price",
            width: 130,
            editable: true,
            renderCell: (cellValue) => {
                return (
                    <>
                        <Typography>P {cellValue.row.product_price}</Typography>
                    </>
                );
            },
        },
        {
            field: "product_stock",
            headerName: "Product Stock",
            width: 200,
            editable: true,
            renderCell: (cellValue) => {
                return (
                    <div className="flex justify-center items-start flex-col">
                        <Typography>
                            Total Stock: {cellValue.row.product_stock}
                        </Typography>
                        <Typography>
                            Sold: {cellValue.row.category.product_sales}
                        </Typography>
                    </div>
                );
            },
        },
    ];

    return (
        <div className="w-full">
            <div className="flex w-full justify-between items-center">
                <CustomTitle
                    text={
                        props.deleted == "true"
                            ? `Deleted Products`
                            : props.stock == 'true' ? `Stock Management` : `Product Management`
                    }
                />
                {!props.deleted && (
                    <Button
                        variant="contained"
                        sx={{ marginBottom: 1 }}
                        onClick={() => {
                            alert("add product");
                        }}
                    >
                        Add Product
                    </Button>
                )}
            </div>
            <DataGrid
                rows={data}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 5,
                        },
                    },
                }}
                pageSizeOptions={[5]}
                disableRowSelectionOnClick
                autoHeight
                rowHeight={200}
            />

            <Dialog
                open={open}
                onClose={() => {
                    setOpen(false);
                    setProductName("");
                    setProductDescription("");
                    setProductScent("");
                    setProductId("");
                    setStock("");
                }}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth
            >
                <div className="w-full border-b-2 border-black">
                    <DialogTitle id="alert-dialog-title">
                        Edit Product
                    </DialogTitle>
                </div>
                <DialogContent>
                    <div className="flex justify-center items-center w-full flex-col space-y-4 ">
                        {props.stock == "true" ? (
                            <CustomTextInput
                                label={`Stock Adjustment`}
                                value={stock}
                                onChangeValue={(e) =>
                                    setStock(e.target.value)
                                }
                            />
                        ) : (
                            <>
                                <CustomTextInput
                                    label={`Product Name`}
                                    value={productName}
                                    onChangeValue={(e) =>
                                        setProductName(e.target.value)
                                    }
                                />
                                <CustomTextInput
                                    label={`Product Description`}
                                    value={productDescription}
                                    onChangeValue={(e) =>
                                        setProductDescription(e.target.value)
                                    }
                                    multiline
                                />
                                <CustomTextInput
                                    label={`Product Price`}
                                    value={productPrice}
                                    onChangeValue={(e) =>
                                        setProductPrice(e.target.value)
                                    }
                                />
                                <CustomTextInput
                                    label={`Product Scent`}
                                    value={productScent}
                                    onChangeValue={(e) =>
                                        setProductScent(e.target.value)
                                    }
                                />
                                <CustomTextInput
                                label={`Stock Adjustment`}
                                value={stock}
                                onChangeValue={(e) =>
                                    setStock(e.target.value)
                                }
                            />
                            </>
                        )}
                    </div>
                    <DialogContentText id="alert-dialog-description"></DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => {
                            setOpen(false);
                            setProductName("");
                            setProductDescription("");
                            setProductScent("");
                            setStock("");
                        }}
                        variant="contained"
                        color="error"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={() => {
                            if (props.stock == 'true') {
                                handleStockAdjustment()
                            } else {
                                handleEditProduct();
                            }
                            setOpen(false);
                            setProductName("");
                            setProductDescription("");
                            setProductScent("");
                            setStock("");
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
    );
};

export default ProductsManagement;

if (document.getElementById("ProductsManagement")) {
    const element = document.getElementById("ProductsManagement");
    const props = Object.assign({}, element.dataset);
    ReactDOM.render(
        <ProductsManagement {...props} />,
        document.getElementById("ProductsManagement")
    );
}

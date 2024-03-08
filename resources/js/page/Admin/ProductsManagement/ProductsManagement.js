import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import CustomTitle from "../../../texts/CustomTitle";
import { Button, Typography } from "@mui/material";
import { api } from "../../../config/api";
import { DataGrid } from "@mui/x-data-grid";
import swal from "sweetalert";

const ProductsManagement = (props) => {
    const [data, setData] = useState([]);

    
    useEffect(() => {
        console.log(props.deleted)
        if (props.deleted == 'true') {
            api.get("products/getdeletedproducts")
            .then((response) => {
                setData(response.data);
                console.log(response.data)
            })
            .catch((err) => {
                console.log(err.response);
            });
        } else {
            api.get("shopping/getallproducts")
            .then((response) => {
                setData(response.data);
                console.log(response.data)
            })
            .catch((err) => {
                console.log(err.response);
            });
        }
    }, []);

    const deleteProduct = (id) => {
        api.post('products/deleteproduct', {
            id: id
        })
            .then((response) => {
                swal({
                    icon: "success",
                    title: "Product Deleted!",
                    text: "Product has been deleted!"
                }).then((response) => {
                    location.reload()
                })
            })
            .catch(err => {
                console.log(err.response)
            })
    }

    const recoverProduct = (id) => {
        api.post('products/recoverproduct', {
            id: id
        }).then((response) => {
            swal({
                icon: 'success',
                title: 'Product Recovered!',
                text: "Product has been recovered!"
            }).then((response) => {
                location.reload()
            })
        })
    }

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
                            <Typography variant="h6">Name: {cellValue.row.product_name}</Typography>
                            <Typography variant="h6">Category: {cellValue.row.category.product_category}</Typography>
                            <Typography variant="h6">Scent: {cellValue.row.product_scent_name}</Typography>
                        </div>
                        <div className="col-span-3">
                            <div className="flex h-full justify-end items-end space-x-4">
                                {props.deleted == 'true' ? (
                                    <Button variant="contained" color="success" onClick={() => recoverProduct(cellValue.row.id)}>Recover</Button>
                                ) : (
                                    <>
                                <Button variant="contained" color="success">Edit</Button>
                                <Button variant="contained" color="error" onClick={() => deleteProduct(cellValue.row.id)}>Delete</Button>
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
                        <Typography>
                            P {cellValue.row.product_price}
                        </Typography>
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
                        <Typography>Total Stock: {cellValue.row.product_stock}</Typography>
                        <Typography>Sold: {100 - Number(cellValue.row.product_stock)}</Typography>
                    </div>
                );
            },
        },
    ];

    return (
        <div className="w-full">
            <div className="flex w-full justify-between items-center">
                <CustomTitle text={props.deleted ? `Deleted Products` : `Product Management`} />
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

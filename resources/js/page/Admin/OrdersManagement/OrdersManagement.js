import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom';
import CustomTitle from '../../../texts/CustomTitle';
import swal from 'sweetalert';
import { Button, Typography } from '@mui/material';
import { api } from '../../../config/api';
import { DataGrid } from '@mui/x-data-grid';
import moment from 'moment';

const OrdersManagement = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        api.get('ordersmanagement/getallorders')
            .then(response => {
                setData(response.data)
            })
            .catch(err => {
                console.log(err.response)
            })
    }, [])

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
                    <div className='flex flex-col'>
                    <Typography>Name: {cellValue.row.owned_by.name}</Typography>
                    <Typography>Email: {cellValue.row.owned_by.email}</Typography>
                    </div>
                )
            }
        },
        {
            field: "order_details",
            headerName: "Order Details",
            width: 350,
            editable: true,
            renderCell: (cellValue) => {
                return (
                    <>
                    <Typography>Order Quantity: {cellValue.row.total_quantity}</Typography>
                    </>
                )
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
                )
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
                )
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
                )
            },
        },
        {
            field: "action",
            headerName: "Action",
            width: 200,
            editable: true,
            renderCell: (cellValue) => {
                return (
                    <div className='flex flex-col space-y-2'>
                        <Button variant="contained" color="primary" sx={{ marginRight: 1 }}>
                            Confirm Order
                        </Button>
                        <Button variant="contained" color="success">
                            Confirm Payment
                        </Button>
                    </div>
                )
            },
        },
    ];

    return (
        <div className="w-full">
            <CustomTitle text={"Pending Delivery/Shipping"} />
            <div className="flex w-full justify-end items-center">
                <Button 
                    variant="contained"
                    sx={{ marginBottom: 1 }}
                    onClick={() => swal({icon: "info", title: "Clicked!", text: "na click hehe"})}
                >
                    Add Order
                </Button>
            </div>
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
}

export default OrdersManagement;

if (document.getElementById("OrdersPage")) {
    ReactDOM.render(<OrdersManagement />, document.getElementById('OrdersPage'))
}
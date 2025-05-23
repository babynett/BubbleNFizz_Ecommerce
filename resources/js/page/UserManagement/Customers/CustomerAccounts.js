import { Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import CustomTitle from "../../../texts/CustomTitle";
import { DataGrid } from "@mui/x-data-grid";
import { api } from "../../../config/api";
import swal from 'sweetalert';
import moment from "moment";

const CustomerAccounts = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        api.get('usermanagement/getallcustomers')
            .then((response) => {
                setData(response.data)
            }).catch(err => {
                console.err(err.response)
            })
    }, [])

    const columns = [
        { field: "id", headerName: "ID", width: 90 },
        {
            field: "name",
            headerName: "Name",
            width: 350,
            editable: true,
        },
        {
            field: "email",
            headerName: "Email",
            width: 350,
            editable: true,
            renderCell: (cellValue) => {
                return cellValue.value;
            },
        },
        {
            field: "created_at",
            headerName: "Date Joined",
            width: 350,
            editable: true,
            renderCell: (cellValue) => {
                return moment(cellValue.value).format("LL hh:mm:ssA");
            },
        },
        {
            field: "action",
            headerName: "Action",
            width: 350,
            editable: true,
            renderCell: (cellValue) => {
                return (
                    <>
                    {cellValue.row.is_suspended ? (
                        <Button variant="contained" color="success" onClick={() => {
                            api.post('usermanagement/unsuspenduser', {
                                id: cellValue.row.id
                            }).then((response) => {
                                swal({
                                    icon:'success',
                                    title: "User Unsuspended!",
                                    text: "User has been unsuspended!"
                                }).then((response) => {
                                    location.reload()
                                })
                            })
                        }}>
                            Unsuspend User
                        </Button>
                    ) : (
                        <Button variant="contained" color="error" onClick={() => {
                            api.post('usermanagement/suspenduser', {
                                id: cellValue.row.id
                            }).then((response) => {
                                swal({
                                    icon:'success',
                                    title: "User Suspended!",
                                    text: "User has been suspended!"
                                }).then((response) => {
                                    location.reload()
                                })
                            })
                        }}>
                            Suspend User
                        </Button>
                    )}
                    </>
                )
            },
        },
    ];
    return (
        <div className="w-full">
            <CustomTitle text={`Customer Accounts`} />
            <div className="flex w-full justify-end items-center">
                <Button 
                    variant="contained"
                    sx={{ marginBottom: 1 }}
                    onClick={() => (location.href = '/addcustomer')}
                >
                    Add Customer
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
            />
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

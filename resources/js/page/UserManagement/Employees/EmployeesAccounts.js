import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import CustomButton from "../../../components/CustomButton";
import { Button } from "@mui/material";
import { api } from "../../../config/api";
import moment from "moment";


const EmployeesAccounts = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        api.get("usermanagement/getallemployees")
            .then((response) => {
                setData(response.data)
            }).catch(err => {
                console.log(err.response)
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
            headerName: "Date Added",
            width: 350,
            editable: true,
            renderCell: (cellValue) => {
                return moment(cellValue.value).format("YYYY-MM-DD | hh:mmA");
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
                        <Button variant="contained" color="warning" sx={{ marginRight: 1 }}>
                            Edit User
                        </Button>
                        <Button variant="contained" color="error">
                            Delete User
                        </Button>
                    </>
                )
            },
        },
    ];
    return (
        <div className="w-full">
            <div className="flex w-full justify-end items-center">
                <Button
                    variant="contained"
                    sx={{ marginBottom: 1 }}
                    onClick={() => (location.href = "/addemployee")}
                >
                    Add Employee
                </Button>
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
                disableRowSelectionOnClick />
        </div>
    );
};

export default EmployeesAccounts;

if (document.getElementById("EmployeesAccounts")) {
    ReactDOM.render(
        <EmployeesAccounts />,
        document.getElementById("EmployeesAccounts")
    );
}

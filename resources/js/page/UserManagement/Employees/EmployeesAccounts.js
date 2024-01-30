import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import ReactDOM from "react-dom";
import CustomButton from "../../../components/CustomButton";
import { Button } from "@mui/material";

const rows = [
    { id: 1, col1: "Hello", col2: "World" },
    { id: 2, col1: "DataGridPro", col2: "is Awesome" },
    { id: 3, col1: "MUI", col2: "is Amazing" },
];

const columns = [
    { field: "col1", headerName: "Column 1", width: 150 },
    { field: "col2", headerName: "Column 2", width: 150 },
];

const EmployeesAccounts = () => {
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
            <DataGrid rows={rows} columns={columns} />
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

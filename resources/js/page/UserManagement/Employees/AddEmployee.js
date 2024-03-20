import { Button, Card, Typography } from "@mui/material";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import CustomTextInput from "../../../components/CustomTextInput";
import { api } from "../../../config/api";
import swal from "sweetalert";
import CustomTitle from "../../../texts/CustomTitle";

const AddEmployee = () => {
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confPassword, setConfPassword] = useState("");

    const submit = () => {
        if (password !== confPassword) {
            swal({
                icon: "error",
                title: "Error!",
                text: "Password did not match!"
            })
        } else {
            api.post("usermanagement/addemployee", {
                fname,
                lname,
                email: email,
                password: password,
            })
                .then((response) => {
                    swal({
                        icon: "success",
                        title: "Employee Added!",
                        text: "User has been added!",
                    }).then(() => {
                        setName("");
                        setEmail("");
                        setPassword("");
                        setConfPassword("");
                    });
                })
                .catch((err) => {
                    console.error(err.response);
                    swal({
                        icon: "error",
                        title: "Email Taken!",
                        text: "User's email has been taken!",
                    });
                });
        }
    };

    return (
        <div className="w-full">
            <CustomTitle text={`Employee Details`} />
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <div className="col-span-1">
                    <CustomTextInput
                        my={6}
                        value={fname}
                        onChangeValue={(e) => setFname(e.target.value)}
                        label={`Employee First Name`}
                    />
                </div>
                <div className="col-span-1">
                    <CustomTextInput
                        my={6}
                        value={lname}
                        onChangeValue={(e) => setLname(e.target.value)}
                        label={`Employee Last Name`}
                    />
                </div>
            </div>
                    <CustomTextInput
                        my={6}
                        value={email}
                        onChangeValue={(e) => setEmail(e.target.value)}
                        label={`Employee Email`}
                    />
            <CustomTextInput
                my={6}
                value={password}
                onChangeValue={(e) => setPassword(e.target.value)}
                label={`Employee Password`}
                type={`password`}
            />
            <CustomTextInput
                my={6}
                label={`Employee Confirm Password`}
                type={`password`}
                value={confPassword}
                onChangeValue={(e) => setConfPassword(e.target.value)}
            />
            <div className="flex justify-center items-center w-full my-3">
                <Button
                    variant="contained"
                    fullWidth
                    onClick={submit}
                    sx={{ backgroundColor: "#EDBF47", fontWeight: 700 }}
                >
                    Submit
                </Button>
            </div>
        </div>
    );
};

export default AddEmployee;

if (document.getElementById("AddEmployee")) {
    ReactDOM.render(<AddEmployee />, document.getElementById("AddEmployee"));
}

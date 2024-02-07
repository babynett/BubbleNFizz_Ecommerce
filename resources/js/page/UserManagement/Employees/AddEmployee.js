import { Button, Card, Typography } from "@mui/material";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import CustomTextInput from "../../../components/CustomTextInput";
import {api} from '../../../config/api'
import swal from 'sweetalert';
import CustomTitle from '../../../texts/CustomTitle'


const AddEmployee = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confPassword, setConfPassword] = useState("");

    const submit = () => {
        api.post('usermanagement/addemployee', {
            name: name,
            email: email,
            password: password,
        }).then((response) => {
            swal({
                icon: 'success',
                title: "Employee Added!",
                text: "User has been added!",
            }).then(() => {
                setName("")
                setEmail("")
                setPassword("")
                setConfPassword("")
            })
        }).catch(err => {
            console.error(err.response)
            swal({
                icon: 'error',
                title: "Email Taken!",
                text: "User's email has been taken!",
            })
        })
    };

    return (
        <div className="w-full">
            <CustomTitle text={`Employee Details`} />
            <CustomTextInput
                my={6}
                value={name}
                onChangeValue={(e) => setName(e.target.value)}
                label={`Employee Name`}
            />
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
                <Button variant="contained" fullWidth onClick={submit} sx={{ backgroundColor:"#B75800", fontWeight: 700 }}>
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

import { Button, Card, Typography } from "@mui/material";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import CustomTextInput from "../../../components/CustomTextInput";

const AddEmployee = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confPassword, setConfPassword] = useState("");

    const submit = () => {
        console.log(name);
        console.log(email);
        console.log(password);
        console.log(confPassword);
    };

    return (
        <div className="w-full">
            <Typography>Employee Details</Typography>
            <CustomTextInput
                my={6}
                value={name}
                onChangeValue={(e) => setName(e.target.value)}
                label={`Name`}
            />
            <CustomTextInput
                my={6}
                value={email}
                onChangeValue={(e) => setEmail(e.target.value)}
                label={`Email`}
            />
            <CustomTextInput
                my={6}
                value={password}
                onChangeValue={(e) => setPassword(e.target.value)}
                label={`Password`}
                type={`password`}
            />
            <CustomTextInput
                my={6}
                label={`Confirm Password`}
                type={`password`}
                value={confPassword}
                onChangeValue={(e) => setConfPassword(e.target.value)}
            />
            <div className="flex justify-center items-center w-full my-3">
                <Button variant="contained" fullWidth onClick={submit}>
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

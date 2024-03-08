import { Button, Typography } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom";
import ProfileSideBar from "./ProfileSideBar";

const EditProfile = () => {
    return (
        <div className="w-full px-12">
            <div className="grid grid-cols-12 gap-8">
                <div className="col-span-3">
                    <ProfileSideBar name={"Robby"} />
                </div>
                <div className="col-span-9">
                    <div className="flex justify-around border-b-2 py-6 border-black">
                        <Button sx={{ color: "#000", paddingRight: 2, paddingLeft: 2, paddingTop: 1, paddingBottom: 1, "&:hover": {backgroundColor: "#B75800", color: "#fff"} }}>
                            <Typography>Profile</Typography>
                        </Button>
                        <Button sx={{ color: "#000", paddingRight: 2, paddingLeft: 2, paddingTop: 1, paddingBottom: 1, "&:hover": {backgroundColor: "#B75800", color: "#fff"} }}>
                            <Typography>Addresses</Typography>
                        </Button>
                        <Button sx={{ color: "#000", paddingRight: 2, paddingLeft: 2, paddingTop: 1, paddingBottom: 1, "&:hover": {backgroundColor: "#B75800", color: "#fff"} }}>
                            <Typography>Change Password</Typography>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditProfile;

if (document.getElementById("EditProfile")) {
    const element = document.getElementById("EditProfile");
    const props = Object.assign({}, element.dataset);
    ReactDOM.render(
        <EditProfile {...props} />,
        document.getElementById("EditProfile")
    );
}

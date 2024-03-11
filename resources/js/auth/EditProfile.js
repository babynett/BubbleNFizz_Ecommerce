import { Button, Typography } from "@mui/material";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import ProfileSideBar from "./ProfileSideBar";
import MyProfile from "./contents/MyProfile";
import MyPurchases from "./contents/MyPurchases";

const EditProfile = (props) => {
    const userObject = JSON.parse(props.user)
    const [page, setPage] = useState("Profile")
    return (
        <div className="w-full px-12">
            <div className="grid grid-cols-12 gap-8">
                <div className="col-span-3">
                    <ProfileSideBar name={"Robby"} setPage={setPage} page={page} />
                </div>
                <div className="col-span-9">
                    {page == "Profile" ? (
                        <MyProfile />
                    ) : page == "Purchases" ? (
                        <MyPurchases user={userObject} />
                    ) : (
                        <div>dasd</div>
                    )}
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

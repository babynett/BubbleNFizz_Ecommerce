import { Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import CustomTextInput from "../../components/CustomTextInput";

const MyProfile = () => {
    const [page, setPage] = useState("Profile");
    return (
        <>
            <div className="flex justify-around border-b-2 py-6 border-black">
                <Button
                    sx={{
                        color: "#000",
                        paddingRight: 2,
                        paddingLeft: 2,
                        paddingTop: 1,
                        paddingBottom: 1,
                        "&:hover": {
                            backgroundColor: "#B75800",
                            color: "#fff",
                        },
                    }}
                    onClick={() => setPage("Profile")}
                >
                    <Typography>Profile</Typography>
                </Button>
                <Button
                    sx={{
                        color: "#000",
                        paddingRight: 2,
                        paddingLeft: 2,
                        paddingTop: 1,
                        paddingBottom: 1,
                        "&:hover": {
                            backgroundColor: "#B75800",
                            color: "#fff",
                        },
                    }}
                    onClick={() => setPage("Addresses")}
                >
                    <Typography>Addresses</Typography>
                </Button>
                <Button
                    sx={{
                        color: "#000",
                        paddingRight: 2,
                        paddingLeft: 2,
                        paddingTop: 1,
                        paddingBottom: 1,
                        "&:hover": {
                            backgroundColor: "#B75800",
                            color: "#fff",
                        },
                    }}
                    onClick={() => setPage("ChangePassword")}
                >
                    <Typography>Change Password</Typography>
                </Button>
            </div>
            <div className="w-full">
                {page == "Profile" ? (
                    <div className="px-6 py-4">
                        <div className="grid grid-cols-1 gap-5">
                            <div className="col-span-1">
                                <CustomTextInput label={`Name`} />
                            </div>
                            <div className="col-span-1">
                                <CustomTextInput label={`Email`} />
                            </div>
                            <div className="col-span-1">
                                <CustomTextInput label={`Gender`} />
                            </div>
                            <div className="col-span-1">
                                <CustomTextInput label={`Phone Number`} />
                            </div>
                        </div>
                    </div>
                ) : page == "Addresses" ? (
                    <div className="px-6 py-4">
                        <Typography>Addresses</Typography>
                    </div>
                ) : (
                    <div className="px-6 py-4">
                        <Typography>Change Password</Typography>
                    </div>
                )}
            </div>
        </>
    );
};

export default MyProfile;

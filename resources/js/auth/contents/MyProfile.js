import { Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import CustomTextInput from "../../components/CustomTextInput";
import { api } from "../../config/api";
import swal from "sweetalert";

const MyProfile = ({ user }) => {
    const [page, setPage] = useState("Profile");
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [gender, setGender] = useState(user.profile.gender);
    const [phoneNumber, setPhoneNumber] = useState(user.profile.contact_no);

    // address
    const [address, setAddress] = useState(user.profile.address);
    const [city, setCity] = useState(user.profile.city);
    const [postalCode, setPostalCode] = useState(user.profile.postal_code);

    // CHANGE PASSWORD
    const [currPassword, setCurrPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confPassword, setConfPassword] = useState("");

    const handleSubmitProfile = () => {
        if (phoneNumber.length == 11) {
            api.post("usermanagement/editcontactno", {
                user_id: user.id,
                contact_no: phoneNumber,
            })
                .then((response) => {
                    swal({
                        icon: "success",
                        title: "Profile Updated!",
                        text: "Your profile has been updated!"
                    }).then(() => {
                        location.reload()
                    })
                })
                .catch((err) => {
                    console.log(err.response);
                });
        } else {
            swal({
                icon: "error",
                title: "Error!",
                text: "Phone number must be 11 characters",
            });
        }
    };

    const handleSubmitAddress = () => {
        api.post("usermanagement/editaddress", {
            user_id: user.id,
            address,
            city,
            postal_code: postalCode,
        })
            .then((response) => {
                location.reload();
            })
            .catch((err) => {
                console.log(err.response);
            });
    };

    const handleChangePassword = () => {
        swal({
            icon: "warning",
            title: "Change Password?",
            text: "Are you sure you want to change your password?",
            buttons: ["No", "Yes"],
        }).then((response) => {
            if (newPassword !== confPassword) {
                swal({
                    icon: "error",
                    title: "Oops...",
                    text: "New password and confirm password does not match!",
                });
            } else {
                api.post("usermanagement/changepassword", {
                    id: user.id,
                    newPassword,
                    currPassword,
                }).then((response) => {
                    console.log(response.data);
                    if (response.data) {
                        swal({
                            icon: "success",
                            title: "Password Changed!",
                            text: "Password has been updated!",
                        }).then(() => {
                            location.reload();
                        });
                    } else {
                        swal({
                            icon: "error",
                            title: "Oops...",
                            text: "Current password did not match",
                        });
                    }
                });
            }
        });
    };

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
                            backgroundColor: "#EDBF47",
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
                            backgroundColor: "#EDBF47",
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
                            backgroundColor: "#EDBF47",
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
                                <CustomTextInput
                                    label={`Name`}
                                    value={name}
                                    disabled
                                />
                            </div>
                            <div className="col-span-1">
                                <CustomTextInput
                                    label={`Email`}
                                    value={email}
                                    disabled
                                />
                            </div>
                            <div className="col-span-1">
                                <CustomTextInput
                                    label={`Gender`}
                                    value={gender}
                                    disabled
                                />
                            </div>
                            <div className="col-span-1">
                                <CustomTextInput
                                    label={`Phone Number`}
                                    value={phoneNumber}
                                    onChangeValue={(e) => {
                                        let numOnly = e.target.value
                                        numOnly = numOnly.replace(/[A-Z a-z]/g, '')
                                        setPhoneNumber(numOnly);
                                    }}
                                />
                            </div>
                            <div className="w-full">
                                <Button
                                    variant="contained"
                                    fullWidth
                                    onClick={handleSubmitProfile}
                                >
                                    Submit
                                </Button>
                            </div>
                        </div>
                    </div>
                ) : page == "Addresses" ? (
                    <div className="px-6 py-4">
                        <div className="grid grid-cols-1 gap-5">
                            <div className="col-span-1">
                                <CustomTextInput
                                    label={`Address`}
                                    value={address}
                                    onChangeValue={(e) =>
                                        setAddress(e.target.value)
                                    }
                                />
                            </div>
                            <div className="col-span-1">
                                <CustomTextInput
                                    label={`City`}
                                    value={city}
                                    onChangeValue={(e) =>
                                        setCity(e.target.value)
                                    }
                                />
                            </div>
                            <div className="col-span-1">
                                <CustomTextInput
                                    label={`Postal Code`}
                                    value={postalCode}
                                    onChangeValue={(e) =>
                                        setPostalCode(e.target.value)
                                    }
                                />
                            </div>
                            <div className="w-full">
                                <Button
                                    variant="contained"
                                    fullWidth
                                    onClick={handleSubmitAddress}
                                >
                                    Submit
                                </Button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="px-6 py-4">
                        <div className="grid grid-cols-1 gap-5">
                            <div className="col-span-1">
                                <CustomTextInput
                                    type={`password`}
                                    label={`Current Password`}
                                    value={currPassword}
                                    onChangeValue={(e) =>
                                        setCurrPassword(e.target.value)
                                    }
                                />
                            </div>
                            <div className="col-span-1">
                                <CustomTextInput
                                    type={`password`}
                                    label={`New Password`}
                                    value={newPassword}
                                    onChangeValue={(e) =>
                                        setNewPassword(e.target.value)
                                    }
                                />
                            </div>
                            <div className="col-span-1">
                                <CustomTextInput
                                    type={`password`}
                                    label={`Confirm Password`}
                                    value={confPassword}
                                    onChangeValue={(e) =>
                                        setConfPassword(e.target.value)
                                    }
                                />
                            </div>
                            <div className="w-full">
                                <Button
                                    variant="contained"
                                    fullWidth
                                    onClick={handleChangePassword}
                                >
                                    Submit
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default MyProfile;

import { Edit, Notifications, Person, ShoppingBag, Visibility } from "@mui/icons-material";
import { Typography } from "@mui/material";
import React from "react";

const ProfileSideBar = ({ id, name, page, setPage }) => {
    return (
        <div className="w-full px-12 py-8 bg-black text-white">
            <div className="flex space-x-6 px-4">
                <img
                    src={`https://bubblenfizz-store.com/images/static/image282.png`}
                    height={100}
                    width={100}
                />
                <div>
                    <Typography variant="h6">{name}</Typography>
                    {/* <a href="#" className="hover:text-amber-500" style={{ fontSize: 10 }}> <Edit style={{ fontSize: 12 }} /> Edit Profile</a> */}
                </div>
            </div>
            <div className="w-full border-b-2 border-white my-5"></div>
            <div className="flex justify-center items-center flex-col w-full space-y-14 my-14">
                <div onClick={() => setPage('Profile')} className="flex space-x-3 w-2/3 hover:text-amber-500">
                    <Person className="text-xl" />
                    <a href="#">My Account</a>
                </div>
                <div onClick={() => setPage('Purchases')} className="flex space-x-3 w-2/3 hover:text-amber-500">
                    <ShoppingBag className="text-xl" />
                    <a href="#">My Purchase</a>
                </div>
                <div onClick={() => setPage('Notification')} className="flex space-x-3 w-2/3 hover:text-amber-500">
                    <Notifications className="text-xl" />
                    <a href="#">Notification</a>
                </div>
                <div onClick={() => setPage('RecentProducts')} className="flex space-x-3 w-2/3 hover:text-amber-500">
                    <Visibility className="text-xl" />
                    <a href="#">Recently Viewed Products</a>
                </div>
            </div>
        </div>
    );
};

export default ProfileSideBar;

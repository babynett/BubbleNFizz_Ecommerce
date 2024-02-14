import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import DashboardCards from "../cards/DashboardCards";
import { Chart, LinearScale } from "chart.js";
import { getRelativePosition } from "chart.js/helpers";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    PointElement,
    LineElement,
    Title,
} from "chart.js";
import { Line } from "react-chartjs-2";
import swal from "sweetalert";
import { Typography } from "@mui/material";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const Dashboard = (props) => {
    const userObject = JSON.parse(props.user);
    useEffect(() => {
        if (userObject.user_role == 3 && userObject.profile == null) {
            swal({
                icon: "warning",
                title: "Redirecting...",
                text: "You will be redirected to complete your profile!",
            }).then((response) => {
                location.replace("/customerpoll");
            });
        } else if (userObject.user_role == 3) {
            swal({
                icon: "warning",
                title: "Redirecting...",
                text: "You will be redirected for shopping!",
            }).then((response) => {
                location.replace("/shopping");
            });
        } else {
            console.log("not customer :D");
            console.log(userObject.profile == null);
        }
    }, []);

    const data = {
        labels: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
        ],
        datasets: [
            {
                label: "Count",
                data: [65, 59, 80, 81, 26, 55, 40],
                fill: false,
                borderColor: "rgb(75, 192, 192)",
            },
        ],
    };

    const options = {
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: "Visitors",
            },
        },
    };
    return (
        <div className="w-full">
            {userObject.user_role == 3 ? (
                <div className="flex justify-center items-center w-full">
                    <Typography variant="h4">Redirecting...</Typography>
                </div>
            ) : (
                <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-1">
                        <div className="grid grid-cols-2 gap-4 justify-center items-center h-full">
                            <div className="col-span-1">
                                <DashboardCards
                                    title={"Total Products"}
                                    bgColor={"bg-yellow-400"}
                                    textColor={"text-white"}
                                    count={`20`}
                                />
                            </div>
                            <div className="col-span-1">
                                <DashboardCards
                                    title={"Total Revenue"}
                                    bgColor={"bg-lime-700"}
                                    textColor={"text-white"}
                                    count={`P 50,000`}
                                />
                            </div>
                            <div className="col-span-1">
                                <DashboardCards
                                    title={"Total Customer"}
                                    bgColor={"bg-red-600"}
                                    textColor={"text-white"}
                                    count={`64`}
                                />
                            </div>
                            <div className="col-span-1">
                                <DashboardCards
                                    title={"Total Orders"}
                                    bgColor={"bg-blue-700"}
                                    textColor={"text-white"}
                                    count={`120`}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-span-1 h-72 border flex justify-center items-center">
                        <Line options={options} data={data} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;

if (document.getElementById("Dashboard")) {
    const element = document.getElementById("Dashboard");
    const props = Object.assign({}, element.dataset);
    ReactDOM.render(
        <Dashboard {...props} />,
        document.getElementById("Dashboard")
    );
}

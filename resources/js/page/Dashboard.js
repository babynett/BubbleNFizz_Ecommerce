import React from "react";
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

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const Dashboard = () => {
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

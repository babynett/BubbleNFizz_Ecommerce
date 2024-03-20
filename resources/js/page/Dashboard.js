import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import DashboardCards from "../cards/DashboardCards";
import { BarElement, Chart, LinearScale } from "chart.js";
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
import { Bar, Line } from "react-chartjs-2";
import swal from "sweetalert";
import {
    Paper,
    Rating,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import { api } from "../config/api";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const Dashboard = (props) => {
    const userObject = JSON.parse(props.user);
    const [dashboardData, setDashboardData] = useState([]);
    const [productsData, setProductsData] = useState([]);
    const [monthlyLabel, setMonthlyLabel] = useState([]);
    const [monthlyData, setMonthlyData] = useState([]);

    const [salesReports, setSalesReports] = useState([])
    const [salesData, setSalesData] = useState([])
    const [salesLabel, setSalesLabel] = useState([])


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

    useEffect(() => {
        api.get("/dashboard")
            .then((response) => {
                console.log(response.data.monthlyVisitor);
                const visitors = response.data.monthlyVisitor;
                visitors.map((item) => {
                    let tempLabel = [];
                    tempLabel.push(item.month);

                    let tempData = [];
                    tempData.push(item.visitor_count);

                    setMonthlyData(tempData);
                    setMonthlyLabel(tempLabel);
                });
                setDashboardData(response.data);
            })
            .catch((err) => {
                console.log(err.response);
            });
        api.get("shopping/getbestsellers")
            .then((response) => {
                console.log(response.data);
                setProductsData(response.data);
            })
            .catch((err) => {
                console.log(err.response);
            });

        api.get('reportsmanagement/getsalesreports')
            .then((response) => {
                console.log(response.data.monthly)
                const monthly = response.data.monthly
                let data = []
                let label = []
                monthly.map((item) => {
                    data.push(item.total_sales)
                    label.push(item.month)
                })
                setSalesData(data)
                setSalesLabel(label)
            }).catch(err => {
                console.log(err.response)
            })
    }, []);

    const salesOptions = {
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: "Monthly Sales",
            },
        },
    };

    const salesDatas = {
        labels: salesLabel,
        datasets: [
            {
                label: "Count",
                data: salesData,
                fill: false,
                borderColor: "rgb(75, 192, 192)",
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 205, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(201, 203, 207, 0.2)'
                  ],
            },
        ],
    };

    const data = {
        labels: monthlyLabel,
        datasets: [
            {
                label: "Count",
                data: monthlyData,
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
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-44 gap-y-20">
                    <div className="col-span-1">
                        <div className="grid grid-cols-2 gap-4 justify-center items-center h-full">
                            <div className="col-span-1">
                                <DashboardCards
                                    title={"Total Products"}
                                    bgColor={"bg-yellow-400"}
                                    textColor={"text-white"}
                                    count={dashboardData.product_counts}
                                />
                            </div>
                            <div className="col-span-1">
                                <DashboardCards
                                    title={"Total Revenue"}
                                    bgColor={"bg-lime-700"}
                                    textColor={"text-white"}
                                    count={`P ${dashboardData.total_revenue}`}
                                />
                            </div>
                            <div className="col-span-1">
                                <DashboardCards
                                    title={"Total Customer"}
                                    bgColor={"bg-red-600"}
                                    textColor={"text-white"}
                                    count={dashboardData.total_customer}
                                />
                            </div>
                            <div className="col-span-1">
                                <DashboardCards
                                    title={"Total Orders"}
                                    bgColor={"bg-blue-700"}
                                    textColor={"text-white"}
                                    count={dashboardData.total_orders}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-span-1 h-72 border flex justify-center items-center">
                        <Line options={options} data={data} />
                    </div>
                    <div className="col-span-1">
                        <Bar options={salesOptions} data={salesDatas} />
                    </div>
                    <div className="col-span-1">
                        <Typography variant="h5" fontWeight={700}>
                            Top Products
                        </Typography>
                        <TableContainer component={Paper}>
                            <Table
                                sx={{ minWidth: 650 }}
                                aria-label="caption table"
                            >
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Products</TableCell>
                                        <TableCell>Sales</TableCell>
                                        <TableCell>Rating</TableCell>
                                        <TableCell>Stocks</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {productsData.map((item, index) => {
                                        if (index < 3) {

                                            return (
                                                <TableRow key={index}>
                                                <TableCell
                                                    component={`th`}
                                                    scope="row"
                                                >
                                                    <div className="grid grid-cols-12 gap-4">
                                                        <div className="col-span-3">
                                                    <img
                                                        src={`https://picsum.photos/100/100`}
                                                        height={100}
                                                        width={100}
                                                        />
                                                        </div>
                                                        <div className="col-span-9">
                                                            <Typography variant="h6">{item.product_details.product_name}</Typography>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                            <Typography variant="h6">{item.product_sales}</Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Rating name="read-only" value={Number(item.product_rating)} precision={0.1} readOnly />
                                                </TableCell>
                                                <TableCell>
                                                            <Typography variant="h6">{item.product_details.product_stock}</Typography>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    }
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
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

import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import CustomTitle from "../../../texts/CustomTitle";
import { api } from "../../../config/api";
import { Button } from "@mui/material";
import { Chart, LinearScale } from "chart.js";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    PointElement,
    LineElement,
    Title,
    BarElement,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import swal from "sweetalert";
import { Typography } from "@mui/material";
import DashboardCards from "../../../cards/DashboardCards";
import CustomSelectInput from "../../../components/CustomSelectInput";
import CustomDatePicker from "../../../components/CustomDatePicker";
import moment from "moment";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const AnalyticsBoard = () => {
    const [categorySales, setCategorySales] = useState([]);
    const [salesReports, setSalesReports] = useState([]);
    const [salesData, setSalesData] = useState([]);
    const [salesLabel, setSalesLabel] = useState([]);

    const [renderType, setRenderType] = useState("Monthly");

    const [month, setMonth] = useState("");
    const [startDate, setStartDate] = useState(moment());
    const [endDate, setEndDate] = useState(moment());

    useEffect(() => {
        api.get("reportsmanagement/getsales")
            .then((response) => {
                setCategorySales(response.data);
                console.log(response.data);
            })
            .catch((err) => {
                console.log(err.response);
            });
    }, []);

    useEffect(() => {
        if (renderType == "Monthly") {
            api.get(`reportsmanagement/getsalesreports?month=${month}`)
                .then((response) => {
                    setSalesReports(response.data);
                    
                })
                .catch((err) => {
                    console.log(err.response);
                });
        } else {
            api.get(
                `reportsmanagement/getsalesreports?startDate=${moment(
                    startDate
                ).format("YYYY-MM-DD")}&endDate=${moment(endDate).format(
                    "YYYY-MM-DD"
                )}`
            )
                .then((response) => {
                    let data = []
                    let label = []
                    const salesReport = response.data
                    console.log(response.data);
                    salesReport.weekly.map((item) => {
                        data.push(item.total_sales)
                        label.push(item.day_of_week)
                    })
                    console.log(data)
                    console.log(label)

                    // setSalesData(monthly.)
                    setSalesData(data)
                    setSalesLabel(label)
                })
                .catch((err) => {
                    console.log(err.response);
                });
        }
    }, [month, startDate, endDate]);
    const data = {
        labels: salesLabel,
        datasets: [
            {
                label: "Count",
                data: salesData,
                fill: false,
                borderColor: "rgb(75, 192, 192)",
                backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(255, 159, 64, 0.2)",
                    "rgba(255, 205, 86, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(153, 102, 255, 0.2)",
                    "rgba(201, 203, 207, 0.2)",
                ],
            },
        ],
    };

    const yData = {
        labels: [
            "Artisan Facial and Body Soaps",
            "Shampoo Bars",
            "Bath Bomb",
            "Bubble Bath",
        ],
        datasets: [
            {
                label: "Category Sales",
                axis: "y",
                data: categorySales.salesCategory,
                fill: false,
                backgroundColor: [
                    "rgba(75, 192, 192, 0.8)",
                    "rgba(54, 162, 235, 0.8)",
                    "rgba(153, 102, 255, 0.8)",
                    "rgba(201, 203, 207, 0.8)",
                ],
            },
        ],
    };

    const yOptions = {
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: "Category Sales",
            },
        },
    };

    const options = {
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: "Sales",
            },
        },
    };

    return (
        <div className="w-full">
            <CustomTitle text={`Analytics Board`} />
            <div className="flex justify-around w-full">
                <Button
                    onClick={() => {
                        setRenderType("Weekly");
                    }}
                >
                    Weekly
                </Button>
                <Button onClick={() => {
                    let data = []
                    let label = []
                    salesReports.monthly.map((item) => {
                        data.push(item.total_sales)
                        label.push(`${item.month} ${item.year}`)
                    })

                    // setSalesData(monthly.)
                    setSalesData(data)
                    setSalesLabel(label)
                }}>
                    Monthly
                </Button>
            </div>
            {renderType == "Monthly" ? (
                <div className="col-span-1">
                    {/* <div className="flex justify-around w-full">
                        <CustomSelectInput
                            label={`Select Month`}
                            onChange={(e) => {
                                setMonth(e.target.value);
                            }}
                            value={month}
                            options={[
                                "January",
                                "February",
                                "March",
                                "April",
                                "May",
                                "June",
                                "July",
                                "August",
                                "September",
                                "October",
                                "November",
                                "December",
                            ]}
                        />
                    </div> */}
                </div>
            ) : (
                <div className="col-span-1">
                    <CustomDatePicker
                        label={`Start Date`}
                        onChangeValue={(value) => {
                            setStartDate(value);
                            setEndDate(moment(value).add(7, "days"));
                        }}
                        value={startDate}
                    />
                    <CustomDatePicker
                        label={`End Date`}
                        my={10}
                        onChangeValue={(value) => {
                            setEndDate(value);
                            setStartDate(moment(value).subtract(7, "days"));
                        }}
                        value={endDate}
                    />
                </div>
            )}
            <Bar options={options} data={data} />
            <Bar options={yOptions} data={yData} />
        </div>
    );
};

export default AnalyticsBoard;

if (document.getElementById("AnalyticsBoard")) {
    ReactDOM.render(
        <AnalyticsBoard />,
        document.getElementById("AnalyticsBoard")
    );
}

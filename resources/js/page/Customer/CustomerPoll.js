import { Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import FragranceColor from "../../cards/FragranceColor";
import AreaCard from "../../cards/AreaCard";
import CustomPollButton from "../../components/CustomPollButton";
import swal from "sweetalert";
import CustomTextInput from "../../components/CustomTextInput";
import moment from "moment";
import CustomDatePicker from "../../components/CustomDatePicker";
import { api } from "../../config/api";
import CustomShoppingCard from "../../components/shopping/CustomShoppingCard";

const CustomerPoll = (props) => {
    const userObject = JSON.parse(props.user);
    const [page, setPage] = useState(1);
    const [gender, setGender] = useState("");
    const [selectedScent, setSelectedScent] = useState([]);
    const [location, setLocation] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [texture, setTexture] = useState("");
    const [design, setDesign] = useState("");
    const [ageBracket, setAgeBracket] = useState("");
    const [frequency, setFrequency] = useState("");
    const [bathType, setBathType] = useState("");
    const [loading, setLoading] = useState(false);

    // FOR PROFILE
    const [birthday, setBirthday] = useState(moment());
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [contactNo, setContactNo] = useState("");

    const [pollResults, setPollResults] = useState([]);

    useEffect(() => {
        console.log(userObject);
    }, []);

    const nextPage = () => {
        if (page == 1 && gender == "")
            swal({
                icon: "warning",
                title: "Skip Gender?",
                text: "Skip picking gender?",
                buttons: ["No", "Yes"],
            }).then((response) => {
                if (response == true) {
                    setPage(2);
                }
            });
        else if (page == 2 && selectedScent == "")
            swal({
                icon: "error",
                title: "Oops...",
                text: "You haven't picked a scent yet!",
            });
        else if (page == 3 && texture == "")
            swal({
                icon: "error",
                title: "Oops...",
                text: "You haven't picked a texture yet!",
            });
        else if (page == 4 && design == "")
            swal({
                icon: "error",
                title: "Oops...",
                text: "You haven't picked a design yet!",
            });
        else if (page == 5 && ageBracket == "")
            swal({
                icon: "error",
                title: "Oops...",
                text: "You haven't picked an age bracket yet!",
            });
        else if (page == 6 && frequency == "")
            swal({
                icon: "error",
                title: "Oops...",
                text: "You haven't picked a frequency yet!",
            });
        else if (page == 7 && bathType == "")
            swal({
                icon: "error",
                title: "Oops...",
                text: "You haven't picked a bath preference yet!",
            });
        else if (page == 7 && bathType !== "")
            api.post("usermanagement/adduserpoll", {
                user_id: userObject.id,
                gender: gender,
                scent: JSON.stringify(selectedScent),
                location: location,
                ingredients: ingredients,
                texture: texture,
                design: design,
                age_bracket: ageBracket,
                frequency: frequency,
                bath_type: bathType,
            })
                .then((response) => {
                    console.log(response.data);
                    setPage(page + 1);
                })
                .catch((err) => {
                    console.err(err.response);
                });
        else if (
            page == 8 &&
            (birthday == "" ||
                address == "" ||
                city == "" ||
                postalCode == "" ||
                contactNo == "")
        )
            swal({
                icon: "error",
                title: "Oops...",
                text: "Please complete the form to proceed!",
            });
        else if (
            page == 8 &&
            (birthday !== "" ||
                address !== "" ||
                city !== "" ||
                postalCode !== "" ||
                contactNo !== "")
        )
            api.post("usermanagement/adduserprofile", {
                user_id: userObject.id,
                birthday: moment(birthday).format("YYYY-MM-DD"),
                address: address,
                city: city,
                postal_code: postalCode,
                contact_no: contactNo,
            })
                .then((response) => {
                    console.log(response.data);
                    setPage(page + 1);
                })
                .catch((err) => {
                    console.err(err.response);
                });
        else setPage(page + 1);
    };

    const prevPage = () => {
        setPage(page - 1);
    };

    return (
        <div className="w-full">
            <div className="flex justify-center w-full items-center flex-col py-6">
                {page == 1 ? (
                    <>
                        <div className="text-center w-2/3 lg:w-1/4">
                            <div className="px-0">
                                <Typography
                                    variant="h3"
                                    fontWeight={700}
                                    color={"#EDBF47"}
                                >
                                    Hi {String(userObject.name).split(" ", 1)}!
                                </Typography>
                            </div>
                            <div className="px-0">
                                <Typography variant="h5">
                                    To get the best Bath experience, tell us
                                    about yourself! Your response will be kept
                                    private.
                                </Typography>
                            </div>
                        </div>
                        <div className="w-2/3">
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 py-10">
                                <div className="col-span-1 flex justify-between items-center flex-col h-80">
                                    <svg
                                        onClick={() => setGender("He")}
                                        className="h-60 hover:scale-110 duration-75"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <g
                                            id="SVGRepo_bgCarrier"
                                            strokeWidth="0"
                                        ></g>
                                        <g
                                            id="SVGRepo_tracerCarrier"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        ></g>
                                        <g id="SVGRepo_iconCarrier">
                                            {" "}
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M22.7099 5.79421C22.4248 5.48211 20.2708 3.17995 17.3257 1.76499C15.8446 1.05339 14.1051 0.537489 12.2683 0.6601C10.5472 0.774986 8.81081 1.44662 7.19057 2.9142C5.13666 2.54192 3.55846 2.92677 2.49394 4.0217C1.40549 5.14125 1.09579 6.77376 1.06276 8.22731C1.02891 9.71678 1.28131 11.2428 1.53146 12.3725C1.65771 12.9426 1.78604 13.4235 1.88331 13.7634C1.93137 13.9314 1.97199 14.0654 2.00124 14.1594C2.08641 19.6088 6.53039 24 12 24C17.2352 24 21.5307 19.9771 21.964 14.8541L22.9867 6.66897C23.0214 6.39118 22.9533 6.06056 22.7099 5.79421ZM4.98994 7.37281C4.23662 8.0105 3.60174 8.76553 3.11347 9.62375C3.07254 9.17353 3.05213 8.71763 3.06224 8.27275C3.09171 6.9763 3.37576 5.98381 3.92793 5.41586C4.41282 4.91712 5.33908 4.51889 7.27096 4.97345C7.60807 5.05277 7.96222 4.95202 8.20711 4.70714C9.61269 3.30155 11.0443 2.74625 12.4015 2.65566C13.7846 2.56334 15.1726 2.94938 16.4596 3.56772C18.5886 4.59057 20.2808 6.17022 20.949 6.84591L20.6506 9.23458C20.1999 8.53573 19.6473 7.91228 19.0101 7.37281C17.1724 5.81727 14.6819 5.00003 12 5.00003C9.31814 5.00003 6.82756 5.81727 4.98994 7.37281ZM20 14C20 14.2189 19.9912 14.4358 19.974 14.6503L19.8864 15.351C19.2444 19.1259 15.9578 22 12 22C7.58172 22 4 18.4183 4 14C4 11.8084 4.87826 10.0877 6.28214 8.89932C7.70188 7.69751 9.7113 7.00003 12 7.00003C14.2887 7.00003 16.2981 7.69751 17.7179 8.89932C19.1217 10.0877 20 11.8084 20 14ZM8.03001 17.2426C7.87428 16.6196 8.36619 16.0003 9.00016 15.9998H15.0002C15.6333 16.0003 16.126 16.6172 15.9703 17.24C15.4525 18.9881 13.7854 20 12.0002 20C10.2834 20 8.46902 18.9986 8.03001 17.2426ZM16.5 12C16.5 12.8285 15.8284 13.5 15 13.5C14.1716 13.5 13.5 12.8285 13.5 12C13.5 11.1716 14.1716 10.5 15 10.5C15.8284 10.5 16.5 11.1716 16.5 12ZM9 13.5C9.82843 13.5 10.5 12.8285 10.5 12C10.5 11.1716 9.82843 10.5 9 10.5C8.17157 10.5 7.5 11.1716 7.5 12C7.5 12.8285 8.17157 13.5 9 13.5Z"
                                                fill={
                                                    gender == "He"
                                                        ? "#EDBF47"
                                                        : "#000"
                                                }
                                            ></path>{" "}
                                        </g>
                                    </svg>
                                    <Typography
                                        fontWeight={700}
                                        variant="h6"
                                        color={
                                            gender == "He" ? "#EDBF47" : "#000"
                                        }
                                    >
                                        He
                                    </Typography>
                                </div>
                                <div className="col-span-1 flex justify-between items-center flex-col h-80">
                                    <svg
                                        onClick={() => setGender("She")}
                                        className="h-60 hover:scale-110 duration-75"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <g
                                            id="SVGRepo_bgCarrier"
                                            strokeWidth="0"
                                        ></g>
                                        <g
                                            id="SVGRepo_tracerCarrier"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        ></g>
                                        <g id="SVGRepo_iconCarrier">
                                            {" "}
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M12 3C6.36969 3 2.03198 7.6159 2.0002 13.6164C1.9894 15.6573 2.40037 17.72 4.00753 20H5.2711C4.0877 18.6805 3.27928 17.0105 3.01375 15.1653C3.00276 15.1 2.99841 15.035 3.0002 14.971C3.01253 14.4913 3.3697 14.0768 3.86058 14.0076L3.86527 14.007C8.44557 13.0682 11.6592 9.86012 13.0513 5.68377C13.2052 5.22219 13.663 4.94748 14.1281 5.00805C14.2642 4.99033 14.4062 5.0005 14.5461 5.0428C18.2864 6.17376 21 9.68632 21 13.8309C21 16.2024 20.1103 18.369 18.6477 20H19.9692C21.2064 18.0777 22.0103 15.5756 21.9999 13.6164C21.9681 7.6159 17.6304 3 12 3ZM14.6274 7.19414C12.9911 11.29 9.71879 14.5198 5.1736 15.7509C5.99951 18.7865 8.73433 21 11.9593 21C15.8329 21 19 17.8053 19 13.8309C19 10.8265 17.187 8.26246 14.6274 7.19414ZM3.50018 22H7.84859C9.08061 22.6391 10.4773 23 11.9593 23C13.4508 23 14.8559 22.6345 16.0937 21.9878C16.1446 21.9958 16.1968 22 16.25 22H20.4999C20.8238 22 21.1275 21.8432 21.3151 21.5792C22.9181 19.3231 24.0136 16.1891 23.9999 13.6058C23.9629 6.63448 18.8561 1 12 1C5.14401 1 0.0371506 6.63448 0.000231528 13.6058C-0.0131697 16.1363 0.551323 18.7647 2.7032 21.604C2.89225 21.8535 3.18719 22 3.50018 22ZM10.0002 15.9998C9.36619 16.0002 8.87429 16.6196 9.03002 17.2425C9.46903 18.9986 11 20 12.0002 20C12.9219 20 14.4525 18.9881 14.9703 17.24C15.126 16.6172 14.6333 16.0002 14.0002 15.9998H10.0002ZM15 13.5C15.8284 13.5 16.5 12.8284 16.5 12C16.5 11.1716 15.8284 10.5 15 10.5C14.1716 10.5 13.5 11.1716 13.5 12C13.5 12.8284 14.1716 13.5 15 13.5Z"
                                                fill={
                                                    gender == "She"
                                                        ? "#EDBF47"
                                                        : "#000"
                                                }
                                            ></path>{" "}
                                        </g>
                                    </svg>
                                    <Typography
                                        fontWeight={700}
                                        variant="h6"
                                        color={
                                            gender == "She" ? "#EDBF47" : "#000"
                                        }
                                    >
                                        She
                                    </Typography>
                                </div>
                                <div className="col-span-1 flex justify-between items-center flex-col h-80">
                                    <svg
                                        onClick={() => setGender("They")}
                                        className="h-60 hover:scale-110 duration-75"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <g
                                            id="SVGRepo_bgCarrier"
                                            strokeWidth="0"
                                        ></g>
                                        <g
                                            id="SVGRepo_tracerCarrier"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        ></g>
                                        <g id="SVGRepo_iconCarrier">
                                            {" "}
                                            <path
                                                d="M12 23.25C18.2132 23.25 23.25 18.2132 23.25 12C23.25 5.7868 18.2132 0.75 12 0.75C5.7868 0.75 0.75 5.7868 0.75 12C0.75 18.2132 5.7868 23.25 12 23.25Z"
                                                stroke={
                                                    gender == "They"
                                                        ? "#EDBF47"
                                                        : "#000"
                                                }
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            ></path>{" "}
                                            <path
                                                d="M11.9982 18.7542C13.2563 18.7542 14.4893 18.4027 15.5583 17.7394C16.6202 17.0804 17.4782 16.1399 18.0371 15.0224L5.94824 15C6.50681 16.1273 7.3692 17.076 8.43818 17.7394C9.50715 18.4027 10.7402 18.7542 11.9982 18.7542Z"
                                                stroke={
                                                    gender == "They"
                                                        ? "#EDBF47"
                                                        : "#000"
                                                }
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            ></path>{" "}
                                            <path
                                                d="M18.75 10.5005C18.595 10.0617 18.3077 9.68178 17.9278 9.41305C17.5478 9.14432 17.0939 9.00001 16.6285 9.00001C16.1631 9.00001 15.7092 9.14432 15.3292 9.41305C14.9572 9.67617 14.6741 10.0459 14.5169 10.4731"
                                                stroke={
                                                    gender == "They"
                                                        ? "#EDBF47"
                                                        : "#000"
                                                }
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            ></path>{" "}
                                            <path
                                                d="M5.25004 10.5005C5.40506 10.0617 5.69233 9.68178 6.07228 9.41305C6.45223 9.14432 6.90616 9.00001 7.37154 9.00001C7.83692 9.00001 8.29085 9.14432 8.6708 9.41305C9.04416 9.67713 9.32804 10.0486 9.48486 10.4778"
                                                stroke={
                                                    gender == "They"
                                                        ? "#EDBF47"
                                                        : "#000"
                                                }
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            ></path>{" "}
                                        </g>
                                    </svg>
                                    <Typography
                                        fontWeight={700}
                                        variant="h6"
                                        color={
                                            gender == "They"
                                                ? "#EDBF47"
                                                : "#000"
                                        }
                                    >
                                        They
                                    </Typography>
                                </div>
                            </div>
                        </div>
                    </>
                ) : page == 2 ? (
                    <div className="w-2/3">
                        <div className="text-center">
                            <Typography variant="h4" fontWeight={700}>
                                What is your fragrance type?
                            </Typography>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 py-10 w-full">
                            <div className="w-full flex justify-center items-center">
                                <div
                                    className={`col-span-1 text-center flex justify-center items-center flex-col border-2 rounded-2xl w-64 py-4 bg-slate-100 hover:scale-110 duration-100 ${
                                        selectedScent.includes('Floral')
                                        ? "border-amber-600"
                                            : ""
                                    }`}
                                    onClick={() => {
                                        let tempScent = selectedScent;
                                        if (!tempScent.includes('Floral')) {
                                            tempScent = [...selectedScent, 'Floral']
                                            
                                        } else {
                                            const index = tempScent.indexOf("Floral")
                                            tempScent = tempScent.filter(scent => scent !== 'Floral');
                                        }
                                        setSelectedScent(tempScent)
                                    }}
                                >
                                    <FragranceColor
                                        title={`Floral`}
                                        color={"#33CC1A"}
                                        description={
                                            "These fragrance categories both evoke natural elements and botanical scents, with one focusing more on fresh, green, and herbal notes reminiscent of gardens and meadows."
                                        }
                                    />
                                </div>
                            </div>
                            <div className="w-full flex justify-center items-center">
                                <div
                                    className={`col-span-1 text-center flex justify-center items-center flex-col border-2 rounded-2xl w-64 py-4 bg-slate-100 hover:scale-110 duration-100 ${
                                        selectedScent.includes('Earthy-Woody Vibes')
                                        ? "border-amber-600"
                                            : ""
                                    }`}
                                    onClick={() => {
                                        let tempScent = selectedScent;
                                        if (!tempScent.includes('Earthy-Woody Vibes')) {
                                            tempScent = [...selectedScent, 'Earthy-Woody Vibes']
                                            
                                        } else {
                                            const index = tempScent.indexOf("Earthy-Woody Vibes")
                                            tempScent = tempScent.filter(scent => scent !== 'Earthy-Woody Vibes');
                                        }
                                        setSelectedScent(tempScent)
                                    }}
                                >
                                    <FragranceColor
                                        title={`Earthy-Woody Vibes`}
                                        color={"#493F07"}
                                        description={
                                            "Fragrances in this category often feature warm, earthy, or woody notes such as sandalwood, cedarwood, or patchouli. They evoke images of forests, trees, and the great outdoors."
                                        }
                                    />
                                </div>
                            </div>
                            <div className="w-full flex justify-center items-center">
                                <div
                                    className={`col-span-1 text-center flex justify-center items-center flex-col border-2 rounded-2xl w-64 py-4 bg-slate-100 hover:scale-110 duration-100 ${
                                        selectedScent.includes('Gourmand Sweet')
                                        ? "border-amber-600"
                                            : ""
                                    }`}
                                    onClick={() => {
                                        let tempScent = selectedScent;
                                        if (!tempScent.includes('Gourmand Sweet')) {
                                            tempScent = [...selectedScent, 'Gourmand Sweet']
                                            
                                        } else {
                                            const index = tempScent.indexOf("Gourmand Sweet")
                                            tempScent = tempScent.filter(scent => scent !== 'Gourmand Sweet');
                                        }
                                        setSelectedScent(tempScent)
                                    }}
                                >
                                    <FragranceColor
                                        title={`Gourmand Sweet`}
                                        color={"#F2C6E3"}
                                        description={
                                            "These fragrances feature edible or dessert-like scents such as vanilla, caramel, chocolate, or pastry notes. They evoke feelings of comfort, indulgence, and sweetness."
                                        }
                                    />
                                </div>
                            </div>
                            <div className="w-full flex justify-center items-center">
                                <div
                                    className={`col-span-1 text-center flex justify-center items-center flex-col border-2 rounded-2xl w-64 py-4 bg-slate-100 hover:scale-110 duration-100 ${
                                        selectedScent.includes('Tropically Fruity')
                                        ? "border-amber-600"
                                            : ""
                                    }`}
                                    onClick={() => {
                                        let tempScent = selectedScent;
                                        if (!tempScent.includes('Tropically Fruity')) {
                                            tempScent = [...selectedScent, 'Tropically Fruity']
                                            
                                        } else {
                                            const index = tempScent.indexOf("Tropically Fruity")
                                            tempScent = tempScent.filter(scent => scent !== 'Tropically Fruity');
                                        }
                                        setSelectedScent(tempScent)
                                    }}
                                >
                                    <FragranceColor
                                        title={`Tropically Fruity`}
                                        color={"#FF0000"}
                                        description={
                                            "These fragrances feature fruity or tropical notes such as citrus, berries, or exotic fruits like mango or papaya. They evoke feelings of freshness, brightness, and tropical escapes."
                                        }
                                    />
                                </div>
                            </div>
                            <div className="w-full flex justify-center items-center">
                                <div
                                    className={`col-span-1 text-center flex justify-center items-center flex-col border-2 rounded-2xl w-64 py-4 bg-slate-100 hover:scale-110 duration-100 ${
                                        selectedScent.includes('Fresh and Clean')
                                        ? "border-amber-600"
                                            : ""
                                    }`}
                                    onClick={() => {
                                        let tempScent = selectedScent;
                                        if (!tempScent.includes('Fresh and Clean')) {
                                            tempScent = [...selectedScent, 'Fresh and Clean']
                                            
                                        } else {
                                            const index = tempScent.indexOf("Fresh and Clean")
                                            tempScent = tempScent.filter(scent => scent !== 'Fresh and Clean');
                                        }
                                        setSelectedScent(tempScent)
                                    }}
                                >
                                    <FragranceColor
                                        title={`Fresh and Clean`}
                                        color={"#B2DFDB"}
                                        description={
                                            "Fragrances in this category feature crisp, clean, or aquatic notes such as sea breeze, rain, or laundry-fresh scents. They evoke feelings of cleanliness, purity, and revitalization."
                                        }
                                    />
                                </div>
                            </div>
                            <div className="w-full flex justify-center items-center">
                                <div
                                    className={`col-span-1 text-center flex justify-center items-center flex-col border-2 rounded-2xl w-64 py-4 bg-slate-100 hover:scale-110 duration-100 ${
                                        selectedScent.includes('Aquatic or Oceanic')
                                        ? "border-amber-600"
                                            : ""
                                    }`}
                                    onClick={() => {
                                        let tempScent = selectedScent;
                                        if (!tempScent.includes('Aquatic or Oceanic')) {
                                            tempScent = [...selectedScent, 'Aquatic or Oceanic']
                                            
                                        } else {
                                            const index = tempScent.indexOf("Aquatic or Oceanic")
                                            tempScent = tempScent.filter(scent => scent !== 'Aquatic or Oceanic');
                                        }
                                        setSelectedScent(tempScent)
                                    }}
                                >
                                    <FragranceColor
                                        title={`Aquatic or Oceanic`}
                                        color={"#007EA7"}
                                        description={
                                            "These fragrances capture the essence of the sea with notes that evoke the ocean breeze, saltwater, or marine accords. They evoke images of coastal landscapes, beach vacations, and aquatic adventures."
                                        }
                                    />
                                </div>
                            </div>
                            <div className="w-full flex justify-center items-center">
                                <div
                                    className={`col-span-1 text-center flex justify-center items-center flex-col border-2 rounded-2xl w-64 py-4 bg-slate-100 hover:scale-110 duration-100 ${
                                        selectedScent.includes('Oriental Spice')
                                        ? "border-amber-600"
                                            : ""
                                    }`}
                                    onClick={() => {
                                        let tempScent = selectedScent;
                                        if (!tempScent.includes('Oriental Spice')) {
                                            tempScent = [...selectedScent, 'Oriental Spice']
                                            
                                        } else {
                                            const index = tempScent.indexOf("Oriental Spice")
                                            tempScent = tempScent.filter(scent => scent !== 'Oriental Spice');
                                        }
                                        setSelectedScent(tempScent)
                                    }}
                                >
                                    <FragranceColor
                                        title={`Oriental Spice`}
                                        color={"#9C640C"}
                                        description={
                                            "These fragrances feature warm, exotic, or spicy notes such as cinnamon, cloves, or amber. They evoke images of bazaars, spices, and mysterious oriental landscapes, adding depth and richness to the scent."
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                ) : page == 3 ? (
                    <div className="w-2/3">
                        <div className="text-center">
                            <Typography variant="h4" fontWeight={700}>
                                What texture do you prefer?
                            </Typography>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 py-10 w-full">
                            <div className="w-full flex justify-center items-center">
                                <div
                                    className={`col-span-1 text-center h-full flex justify-between items-center flex-col border-2 rounded-2xl w-64 py-4 bg-slate-100 hover:scale-110 duration-100 ${
                                        texture == "Foamy"
                                            ? "border-amber-600"
                                            : ""
                                    }`}
                                    onClick={() => setTexture("Foamy")}
                                >
                                    <AreaCard
                                        image={``}
                                        description={`Light and airy textures that create a rich lather for cleansing and refreshing the skin.`}
                                    />
                                </div>
                            </div>
                            <div className="w-full flex justify-center items-center">
                                <div
                                    className={`col-span-1 text-center h-full flex justify-between items-center flex-col border-2 rounded-2xl w-64 py-4 bg-slate-100 hover:scale-110 duration-100 ${
                                        texture == "Exfoliating"
                                            ? "border-amber-600"
                                            : ""
                                    }`}
                                    onClick={() => setTexture("Exfoliating")}
                                >
                                    <AreaCard
                                        image={``}
                                        description={`Gritty or granular textures that help slough away dead skin cells, leaving the skin smooth and revitalized.`}
                                    />
                                </div>
                            </div>
                            <div className="w-full flex justify-center items-center">
                                <div
                                    className={`col-span-1 text-center h-full flex justify-between items-center flex-col border-2 rounded-2xl w-64 py-4 bg-slate-100 hover:scale-110 duration-100 ${
                                        texture == "Bubbly"
                                            ? "border-amber-600"
                                            : ""
                                    }`}
                                    onClick={() => setTexture("Bubbly")}
                                >
                                    <AreaCard
                                        image={``}
                                        description={`Textures that produce abundant bubbles or fizz when agitated, adding a fun and playful element to bath time.`}
                                    />
                                </div>
                            </div>
                            <div className="w-full flex justify-center items-center">
                                <div
                                    className={`col-span-1 text-center h-full flex justify-between items-center flex-col border-2 rounded-2xl w-64 py-4 bg-slate-100 hover:scale-110 duration-100 ${
                                        texture == "Grainy"
                                            ? "border-amber-600"
                                            : ""
                                    }`}
                                    onClick={() => setTexture("Grainy")}
                                >
                                    <AreaCard
                                        image={``}
                                        description={`Coarse or grainy textures that offer gentle exfoliation and may contain natural exfoliating particles like sugar or salt.`}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                ) : page == 4 ? (
                    <div className="w-2/3">
                        <div className="text-center">
                            <Typography variant="h4" fontWeight={700}>
                                What design do you prefer?
                            </Typography>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 py-10 w-full">
                            <div className="w-full flex justify-center items-center">
                                <div
                                    className={`col-span-1 text-center h-full flex justify-between items-center flex-col border-2 rounded-2xl w-64 py-4 bg-slate-100 hover:scale-110 duration-100 ${
                                        design == "Minimalist"
                                            ? "border-amber-600"
                                            : ""
                                    }`}
                                    onClick={() => setDesign("Minimalist")}
                                >
                                    <AreaCard
                                        image={``}
                                        description={`Clean, simple, and understated designs with sleek lines and neutral colors, often focusing on functionality and clarity.`}
                                    />
                                </div>
                            </div>
                            <div className="w-full flex justify-center items-center">
                                <div
                                    className={`col-span-1 text-center h-full flex justify-between items-center flex-col border-2 rounded-2xl w-64 py-4 bg-slate-100 hover:scale-110 duration-100 ${
                                        design == "Bohemian"
                                            ? "border-amber-600"
                                            : ""
                                    }`}
                                    onClick={() => setDesign("Bohemian")}
                                >
                                    <AreaCard
                                        image={``}
                                        description={`Free-spirited and eclectic designs that incorporate vibrant colors, eclectic patterns, and artisanal elements like handcrafted pottery or woven textures.`}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 py-10 w-full">
                            <div className="w-full flex justify-center items-center">
                                <div
                                    className={`col-span-1 text-center h-full flex justify-between items-center flex-col border-2 rounded-2xl w-64 py-4 bg-slate-100 hover:scale-110 duration-100 ${
                                        design == "Elegant"
                                            ? "border-amber-600"
                                            : ""
                                    }`}
                                    onClick={() => setDesign("Elegant")}
                                >
                                    <AreaCard
                                        image={``}
                                        description={`Sophisticated and refined designs that exude luxury and opulence, featuring sleek packaging, metallic accents, and understated embellishments.`}
                                    />
                                </div>
                            </div>
                            <div className="w-full flex justify-center items-center">
                                <div
                                    className={`col-span-1 text-center h-full flex justify-between items-center flex-col border-2 rounded-2xl w-64 py-4 bg-slate-100 hover:scale-110 duration-100 ${
                                        design == "Elegant"
                                            ? "border-amber-600"
                                            : ""
                                    }`}
                                    onClick={() => setDesign("Elegant")}
                                >
                                    <AreaCard
                                        image={``}
                                        description={`Whimsical and imaginative designs that spark joy and creativity, often featuring whimsical illustrations, quirky shapes, and bright colors.`}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                ) : page == 5 ? (
                    <div className="w-2/3">
                        <div className="text-center">
                            <Typography variant="h4" fontWeight={700}>
                                How old are you?
                            </Typography>
                        </div>
                        <div className="flex justify-between items-center w-full flex-col">
                            <CustomPollButton
                                value={ageBracket}
                                onClick={() => setAgeBracket("Under 18")}
                                title={`Under 18`}
                                my={2}
                            />
                            <CustomPollButton
                                value={ageBracket}
                                onClick={() => setAgeBracket("18-24")}
                                title={`18-24`}
                                my={2}
                            />
                            <CustomPollButton
                                value={ageBracket}
                                onClick={() => setAgeBracket("25-34")}
                                title={`25-34`}
                                my={2}
                            />
                            <CustomPollButton
                                value={ageBracket}
                                onClick={() => setAgeBracket("35-44")}
                                title={`35-44`}
                                my={2}
                            />
                            <CustomPollButton
                                value={ageBracket}
                                onClick={() => setAgeBracket("45-55")}
                                title={`45-55`}
                                my={2}
                            />
                            <CustomPollButton
                                value={ageBracket}
                                onClick={() => setAgeBracket("56+")}
                                title={`56+`}
                                my={2}
                            />
                        </div>
                    </div>
                ) : page == 6 ? (
                    <div className="w-2/3">
                        <div className="text-center">
                            <Typography variant="h4" fontWeight={700}>
                                How often do you take a bath?
                            </Typography>
                        </div>
                        <div className="flex justify-between items-center w-full flex-col">
                            <CustomPollButton
                                value={frequency}
                                onClick={() => setFrequency("1 Day")}
                                title={`1 Day`}
                                my={4}
                            />
                            <CustomPollButton
                                value={frequency}
                                onClick={() => setFrequency("2 Days")}
                                title={`2 Days`}
                                my={4}
                            />
                            <CustomPollButton
                                value={frequency}
                                onClick={() => setFrequency("3 Days")}
                                title={`3 Days`}
                                my={4}
                            />
                        </div>
                    </div>
                ) : page == 7 ? (
                    <div className="w-2/3">
                        <div className="text-center">
                            <Typography variant="h4" fontWeight={700}>
                                What Bath Type do you prefer?
                            </Typography>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 py-10 w-full">
                            <div className="w-full flex justify-center items-center">
                                <div
                                    className={`col-span-1 text-center h-full flex justify-between items-center flex-col border-2 rounded-2xl w-64 py-4 bg-slate-100 hover:scale-110 duration-100 ${
                                        bathType == "Hot"
                                            ? "border-amber-600"
                                            : ""
                                    }`}
                                    onClick={() => setBathType("Hot")}
                                >
                                    <AreaCard
                                        image={``}
                                        description={`Hot Shower`}
                                    />
                                </div>
                            </div>
                            <div className="w-full flex justify-center items-center">
                                <div
                                    className={`col-span-1 text-center h-full flex justify-between items-center flex-col border-2 rounded-2xl w-64 py-4 bg-slate-100 hover:scale-110 duration-100 ${
                                        bathType == "Cold"
                                            ? "border-amber-600"
                                            : ""
                                    }`}
                                    onClick={() => setBathType("Cold")}
                                >
                                    <AreaCard
                                        image={``}
                                        description={`Cold Shower`}
                                    />
                                </div>
                            </div>
                            <div className="w-full flex justify-center items-center">
                                <div
                                    className={`col-span-1 text-center h-full flex justify-between items-center flex-col border-2 rounded-2xl w-64 py-4 bg-slate-100 hover:scale-110 duration-100 ${
                                        bathType == "Warm"
                                            ? "border-amber-600"
                                            : ""
                                    }`}
                                    onClick={() => setBathType("Warm")}
                                >
                                    <AreaCard
                                        image={``}
                                        description={`Warm Shower`}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                ) : page == 8 ? (
                    <div className="w-2/3">
                        <div className="text-center">
                            <Typography
                                variant="h4"
                                fontWeight={700}
                                color={"#EDBF47"}
                            >
                                Complete your profile!
                            </Typography>
                        </div>
                        <CustomDatePicker
                            label={"Birthday"}
                            my={15}
                            onChangeValue={(value) => setBirthday(value)}
                            value={birthday}
                        />
                        <CustomTextInput
                            my={15}
                            label={`Address`}
                            onChangeValue={(e) => setAddress(e.target.value)}
                            value={address}
                        />
                        <CustomTextInput
                            my={15}
                            label={`City`}
                            onChangeValue={(e) => setCity(e.target.value)}
                            value={city}
                        />
                        <CustomTextInput
                            my={15}
                            label={`Postal Code`}
                            onChangeValue={(e) => setPostalCode(e.target.value)}
                            value={postalCode}
                        />
                        <CustomTextInput
                            my={15}
                            label={`Contact Number`}
                            onChangeValue={(e) => setContactNo(e.target.value)}
                            value={contactNo}
                        />
                    </div>
                ) : page == 9 ? (
                    <>
                        <div className="text-center w-2/3">
                            <div className="px-10 py-12">
                                <Typography
                                    variant="h3"
                                    fontWeight={700}
                                    color={"#EDBF47"}
                                >
                                    Results are in!
                                </Typography>
                            </div>
                            <div className="w-full flex justify-center">
                                <div className="px-10 p     y-12 w-2/3">
                                    <Typography variant="h5">
                                        Thank you!! Your account is all set. You
                                        may now get the best deals our shop has
                                        to offer.
                                    </Typography>
                                </div>
                            </div>
                            <div className="px-10 py-12">
                                <Button
                                    className="hover:scale-110 duration-100"
                                    onClick={() => {
                                        api.post("customerpollresult", {
                                            product_scent: selectedScent,
                                        })
                                            .then((response) => {
                                                console.log(response.data)
                                                setPage(page + 1);
                                                setPollResults(response.data);
                                            })
                                            .catch((err) => {
                                                console.log(err.response);
                                            });
                                    }}
                                    sx={{
                                        backgroundColor: "#EDBF47",
                                        borderColor: "#EDBF47",
                                        width: "50%",
                                        color: "#fff",
                                        "&:hover": {
                                            backgroundColor: "#EDBF47",
                                        },
                                    }}
                                >
                                    Shop now!
                                </Button>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 lg:grid-cols-6">
                            {pollResults.map((item, index) => {
                                if (index < 6) {
                                    return (
                                        <div className="col-span-1">
                                            <CustomShoppingCard
                                                title={item.product_name}
                                                price={item.product_price}
                                                rating={item.product_rating}
                                                scentName={
                                                    item.product_scent_name
                                                }
                                                onClick={() => {
                                                    window.location.href = `/shopping/${item.id}`;
                                                }}
                                            />
                                        </div>
                                    );
                                }
                            })}
                        </div>
                    </>
                )}
                <div className="flex w-5/6 justify-between items-center">
                    {page > 1 ? (
                        <Button
                            onClick={prevPage}
                            variant="contained"
                            sx={{
                                backgroundColor: "#EDBF47",
                                "&:hover": { backgroundColor: "#EDBF47" },
                            }}
                        >
                            Previous
                        </Button>
                    ) : (
                        <div></div>
                    )}
                    {page < 10 ? (
                        <Button
                            onClick={nextPage}
                            variant="contained"
                            sx={{
                                backgroundColor: "#EDBF47",
                                "&:hover": { backgroundColor: "#EDBF47" },
                            }}
                        >
                            {page == 8 ? "Submit" : "Next"}
                        </Button>
                    ) : (
                        <div></div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CustomerPoll;

if (document.getElementById("CustomerPoll")) {
    const element = document.getElementById("CustomerPoll");
    const props = Object.assign({}, element.dataset);
    ReactDOM.render(
        <CustomerPoll {...props} />,
        document.getElementById("CustomerPoll")
    );
}

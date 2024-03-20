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
import {api} from '../../config/api'

const CustomerPoll = (props) => {
    const userObject = JSON.parse(props.user);
    const [page, setPage] = useState(1);
    const [gender, setGender] = useState("");
    const [selectedScent, setSelectedScent] = useState("");
    const [location, setLocation] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [texture, setTexture] = useState("");
    const [design, setDesign] = useState("");
    const [ageBracket, setAgeBracket] = useState("");
    const [frequency, setFrequency] = useState("");
    const [bathType, setBathType] = useState("");
    const [loading, setLoading] = useState(false);

    // FOR PROFILE
    const [birthday, setBirthday] = useState(moment())
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [postalCode, setPostalCode] = useState('')
    const [contactNo, setContactNo] = useState('')

    useEffect(() => {
        console.log(userObject);
    }, []);

    const nextPage = () => {
        if (page == 1 && gender == "")
            swal({
                icon: "error",
                title: "Oops...",
                text: "You haven't picked a gender yet!",
            });
        else if (page == 2 && selectedScent == "")
            swal({
                icon: "error",
                title: "Oops...",
                text: "You haven't picked a scent yet!",
            });
        else if (page == 3 && location == "")
            swal({
                icon: "error",
                title: "Oops...",
                text: "You haven't picked a location yet!",
            });
        else if (page == 4 && ingredients == "")
            swal({
                icon: "error",
                title: "Oops...",
                text: "You haven't picked an ingredient yet!",
            });
        else if (page == 5 && texture == "")
            swal({
                icon: "error",
                title: "Oops...",
                text: "You haven't picked a texture yet!",
            });
        else if (page == 6 && design == "")
            swal({
                icon: "error",
                title: "Oops...",
                text: "You haven't picked a design yet!",
            });
        else if (page == 7 && ageBracket == "")
            swal({
                icon: "error",
                title: "Oops...",
                text: "You haven't picked an age bracket yet!",
            });
        else if (page == 8 && frequency == "")
            swal({
                icon: "error",
                title: "Oops...",
                text: "You haven't picked a frequency yet!",
            });
        else if (page == 9 && bathType == "")
            swal({
                icon: "error",
                title: "Oops...",
                text: "You haven't picked a bath preference yet!",
            });
        else if (page == 9 && bathType !== "") 
            api.post('usermanagement/adduserpoll', {
                user_id: userObject.id,
                gender: gender,
                scent: selectedScent,
                location: location,
                ingredients: ingredients,
                texture: texture,
                design: design,
                age_bracket: ageBracket,
                frequency: frequency,
                bath_type: bathType,
            }).then((response) => {
                console.log(response.data)
                setPage(page + 1)
            }).catch(err => {
                console.err(err.response)
            })
        else if (page == 10 && (birthday == "" || address == "" || city == "" || postalCode == "" || contactNo == ""))
            swal({
                icon: "error",
                title: "Oops...",
                text: "Please complete the form to proceed!",
            });
        else if (page == 10 && (birthday !== "" || address !== "" || city !== "" || postalCode !== "" || contactNo !== ""))
            api.post('usermanagement/adduserprofile', {
                user_id: userObject.id,
                birthday: moment(birthday).format('YYYY-MM-DD'),
                address: address,
                city: city,
                postal_code: postalCode,
                contact_no: contactNo
            }).then((response) => {
                console.log(response.data)
                setPage(page + 1)
            }).catch(err => {
                console.err(err.response)
            })
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
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 py-10 w-full">
                            <div className="w-full flex justify-center items-center">
                                <div
                                    className={`col-span-1 text-center flex justify-center items-center flex-col border-2 rounded-2xl w-64 py-4 bg-slate-100 hover:scale-110 duration-100 ${
                                        selectedScent == "Fresh"
                                            ? "border-amber-600"
                                            : ""
                                    }`}
                                    onClick={() => setSelectedScent("Fresh")}
                                >
                                    <FragranceColor
                                        title={`Fresh`}
                                        color={"#33CC1A"}
                                        description={
                                            "Comprise of citrus, water and green notes."
                                        }
                                    />
                                </div>
                            </div>
                            <div className="w-full flex justify-center items-center">
                                <div
                                    className={`col-span-1 text-center flex justify-center items-center flex-col border-2 rounded-2xl w-64 py-4 bg-slate-100 hover:scale-110 duration-100 ${
                                        selectedScent == "Floral"
                                            ? "border-amber-600"
                                            : ""
                                    }`}
                                    onClick={() => setSelectedScent("Floral")}
                                >
                                    <FragranceColor
                                        title={`Floral`}
                                        color={"#F2C6E3"}
                                        description={
                                            "Sweet and flowery scent such as roses, jasmine, lilies and peonies."
                                        }
                                    />
                                </div>
                            </div>
                            <div className="w-full flex justify-center items-center">
                                <div
                                    className={`col-span-1 text-center flex justify-center items-center flex-col border-2 rounded-2xl w-64 py-4 bg-slate-100 hover:scale-110 duration-100 ${
                                        selectedScent == "Woody"
                                            ? "border-amber-600"
                                            : ""
                                    }`}
                                    onClick={() => setSelectedScent("Woody")}
                                >
                                    <FragranceColor
                                        title={`Woody`}
                                        color={"#493F07"}
                                        description={
                                            "Mysterious and captivating scent favoured like cedarwood, sandalwood, vetiver and amber."
                                        }
                                    />
                                </div>
                            </div>
                            <div className="w-full flex justify-center items-center">
                                <div
                                    className={`col-span-1 text-center flex justify-center items-center flex-col border-2 rounded-2xl w-64 py-4 bg-slate-100 hover:scale-110 duration-100 ${
                                        selectedScent == "Oriental"
                                            ? "border-amber-600"
                                            : ""
                                    }`}
                                    onClick={() => setSelectedScent("Oriental")}
                                >
                                    <FragranceColor
                                        title={`Oriental`}
                                        color={"#FF0000"}
                                        description={
                                            "Luxurious fragrance family, oriental from floral oriental, soft oriental and woody oriental."
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
                                Where do you live?
                            </Typography>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 py-10 w-full">
                            <div className="w-full flex justify-center items-center">
                                <div
                                    className={`col-span-1 text-center h-full flex justify-between items-center flex-col border-2 rounded-2xl w-64 py-4 bg-slate-100 hover:scale-110 duration-100 ${
                                        location == "Desert"
                                            ? "border-amber-600"
                                            : ""
                                    }`}
                                    onClick={() => setLocation("Desert")}
                                >
                                    <AreaCard
                                        image={``}
                                        description={`Dry or desert climate`}
                                    />
                                </div>
                            </div>
                            <div className="w-full flex justify-center items-center">
                                <div
                                    className={`col-span-1 text-center h-full flex justify-between items-center flex-col border-2 rounded-2xl w-64 py-4 bg-slate-100 hover:scale-110 duration-100 ${
                                        location == "Humid"
                                            ? "border-amber-600"
                                            : ""
                                    }`}
                                    onClick={() => setLocation("Humid")}
                                >
                                    <AreaCard
                                        image={``}
                                        description={`Hot/humid in the summer, moderate to severely cold winters.`}
                                    />
                                </div>
                            </div>
                            <div className="w-full flex justify-center items-center">
                                <div
                                    className={`col-span-1 text-center h-full flex justify-between items-center flex-col border-2 rounded-2xl w-64 py-4 bg-slate-100 hover:scale-110 duration-100 ${
                                        location == "City"
                                            ? "border-amber-600"
                                            : ""
                                    }`}
                                    onClick={() => setLocation("City")}
                                >
                                    <AreaCard
                                        image={``}
                                        description={`City/Urban Area`}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 py-10 w-full">
                            <div className="w-full flex justify-center items-center">
                                <div
                                    className={`col-span-1 text-center h-full flex justify-between items-center flex-col border-2 rounded-2xl w-64 py-4 bg-slate-100 hover:scale-110 duration-100 ${
                                        location == "Mountain"
                                            ? "border-amber-600"
                                            : ""
                                    }`}
                                    onClick={() => setLocation("Mountain")}
                                >
                                    <AreaCard
                                        image={``}
                                        description={`Mountain/high altitude environment.`}
                                    />
                                </div>
                            </div>
                            <div className="w-full flex justify-center items-center">
                                <div
                                    className={`col-span-1 text-center h-full flex justify-between items-center flex-col border-2 rounded-2xl w-64 py-4 bg-slate-100 hover:scale-110 duration-100 ${
                                        location == "Beach"
                                            ? "border-amber-600"
                                            : ""
                                    }`}
                                    onClick={() => setLocation("Beach")}
                                >
                                    <AreaCard
                                        image={``}
                                        description={`Coastal/beach area`}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                ) : page == 4 ? (
                    <div className="w-2/3">
                        <div className="text-center">
                            <Typography variant="h4" fontWeight={700}>
                                What ingredients do you prefer?
                            </Typography>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 py-10 w-full">
                            <div className="w-full flex justify-center items-center">
                                <div
                                    className={`col-span-1 text-center h-full flex justify-between items-center flex-col border-2 rounded-2xl w-64 py-4 bg-slate-100 hover:scale-110 duration-100 ${
                                        ingredients == "Organic"
                                            ? "border-amber-600"
                                            : ""
                                    }`}
                                    onClick={() => setIngredients("Organic")}
                                >
                                    <AreaCard
                                        image={``}
                                        description={`Grown without the use of synthetic chemicals`}
                                    />
                                </div>
                            </div>
                            <div className="w-full flex justify-center items-center">
                                <div
                                    className={`col-span-1 text-center h-full flex justify-between items-center flex-col border-2 rounded-2xl w-64 py-4 bg-slate-100 hover:scale-110 duration-100 ${
                                        ingredients == "Non-organic"
                                            ? "border-amber-600"
                                            : ""
                                    }`}
                                    onClick={() =>
                                        setIngredients("Non-organic")
                                    }
                                >
                                    <AreaCard
                                        image={``}
                                        description={`Often produced using artificial chemicals`}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 gap-4 py-10 w-full">
                            <div className="w-full flex justify-center items-center">
                                <div
                                    className={`col-span-1 text-center h-full flex justify-between items-center flex-col border-2 rounded-2xl w-64 py-4 bg-slate-100 hover:scale-110 duration-100 ${
                                        ingredients == "All-natural"
                                            ? "border-amber-600"
                                            : ""
                                    }`}
                                    onClick={() =>
                                        setIngredients("All-natural")
                                    }
                                >
                                    <AreaCard
                                        image={``}
                                        description={`composed of ingredients that are from nature and not artificial.`}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                ) : page == 5 ? (
                    <div className="w-2/3">
                        <div className="text-center">
                            <Typography variant="h4" fontWeight={700}>
                                What texture do you prefer?
                            </Typography>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 py-10 w-full">
                            <div className="w-full flex justify-center items-center">
                                <div
                                    className={`col-span-1 text-center h-full flex justify-between items-center flex-col border-2 rounded-2xl w-64 py-4 bg-slate-100 hover:scale-110 duration-100 ${
                                        texture == "Concentrate"
                                            ? "border-amber-600"
                                            : ""
                                    }`}
                                    onClick={() => setTexture("Concentrate")}
                                >
                                    <AreaCard
                                        image={``}
                                        description={`Lightweight skin care product with a high concentration of active ingredients`}
                                    />
                                </div>
                            </div>
                            <div className="w-full flex justify-center items-center">
                                <div
                                    className={`col-span-1 text-center h-full flex justify-between items-center flex-col border-2 rounded-2xl w-64 py-4 bg-slate-100 hover:scale-110 duration-100 ${
                                        texture == "Serum"
                                            ? "border-amber-600"
                                            : ""
                                    }`}
                                    onClick={() => setTexture("Serum")}
                                >
                                    <AreaCard
                                        image={``}
                                        description={`A care that acts in depth despite its application on the surface`}
                                    />
                                </div>
                            </div>
                            <div className="w-full flex justify-center items-center">
                                <div
                                    className={`col-span-1 text-center h-full flex justify-between items-center flex-col border-2 rounded-2xl w-64 py-4 bg-slate-100 hover:scale-110 duration-100 ${
                                        texture == "Lotion"
                                            ? "border-amber-600"
                                            : ""
                                    }`}
                                    onClick={() => setTexture("Lotion")}
                                >
                                    <AreaCard
                                        image={``}
                                        description={`The perfect consistency if you like layered products`}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 py-10 w-full">
                            <div className="w-full flex justify-center items-center">
                                <div
                                    className={`col-span-1 text-center h-full flex justify-between items-center flex-col border-2 rounded-2xl w-64 py-4 bg-slate-100 hover:scale-110 duration-100 ${
                                        texture == "Oily"
                                            ? "border-amber-600"
                                            : ""
                                    }`}
                                    onClick={() => setTexture("Oily")}
                                >
                                    <AreaCard
                                        image={``}
                                        description={`*INSERT DESCRIPTION HERE*`}
                                    />
                                </div>
                            </div>
                            <div className="w-full flex justify-center items-center">
                                <div
                                    className={`col-span-1 text-center h-full flex justify-between items-center flex-col border-2 rounded-2xl w-64 py-4 bg-slate-100 hover:scale-110 duration-100 ${
                                        texture == "Solid"
                                            ? "border-amber-600"
                                            : ""
                                    }`}
                                    onClick={() => setTexture("Solid")}
                                >
                                    <AreaCard
                                        image={``}
                                        description={`*INSERT DESCRIPTION HERE*`}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                ) : page == 6 ? (
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
                                        design == "Bright"
                                            ? "border-amber-600"
                                            : ""
                                    }`}
                                    onClick={() => setDesign("Bright")}
                                >
                                    <AreaCard
                                        image={``}
                                        description={`Vibrant colors are present in the product`}
                                    />
                                </div>
                            </div>
                            <div className="w-full flex justify-center items-center">
                                <div
                                    className={`col-span-1 text-center h-full flex justify-between items-center flex-col border-2 rounded-2xl w-64 py-4 bg-slate-100 hover:scale-110 duration-100 ${
                                        design == "Neutral"
                                            ? "border-amber-600"
                                            : ""
                                    }`}
                                    onClick={() => setDesign("Neutral")}
                                >
                                    <AreaCard
                                        image={``}
                                        description={`Colors present in the product are nonchalant`}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 py-10 w-full">
                            <div className="w-full flex justify-center items-center">
                                <div
                                    className={`col-span-1 text-center h-full flex justify-between items-center flex-col border-2 rounded-2xl w-64 py-4 bg-slate-100 hover:scale-110 duration-100 ${
                                        design == "Warm"
                                            ? "border-amber-600"
                                            : ""
                                    }`}
                                    onClick={() => setDesign("Warm")}
                                >
                                    <AreaCard
                                        image={``}
                                        description={`Vivid and bold colors are present in the product`}
                                    />
                                </div>
                            </div>
                            <div className="w-full flex justify-center items-center">
                                <div
                                    className={`col-span-1 text-center h-full flex justify-between items-center flex-col border-2 rounded-2xl w-64 py-4 bg-slate-100 hover:scale-110 duration-100 ${
                                        design == "Monotone"
                                            ? "border-amber-600"
                                            : ""
                                    }`}
                                    onClick={() => setDesign("Monotone")}
                                >
                                    <AreaCard
                                        image={``}
                                        description={`Product only has a single tone of color`}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                ) : page == 7 ? (
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
                ) : page == 8 ? (
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
                ) : page == 9 ? (
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
                ) : page == 10 ? (
                    <div className="w-2/3">
                        <div className="text-center">
                            <Typography variant="h4" fontWeight={700} color={"#EDBF47"}>
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
                            onChangeValue={e => setAddress(e.target.value)}
                            value={address}
                        />
                        <CustomTextInput 
                            my={15}
                            label={`City`}
                            onChangeValue={e => setCity(e.target.value)}
                            value={city}
                        />
                        <CustomTextInput 
                            my={15}
                            label={`Postal Code`}
                            onChangeValue={e => setPostalCode(e.target.value)}
                            value={postalCode}
                        />
                        <CustomTextInput 
                            my={15}
                            label={`Contact Number`}
                            onChangeValue={e => setContactNo(e.target.value)}
                            value={contactNo}
                        />
                    </div>
                ) : (
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
                                <div className="px-10 py-12 w-2/3">
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
                                    onClick={() => window.location.href = '/shopping'}
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
                    {page < 11 ? (
                        <Button
                            onClick={nextPage}
                            variant="contained"
                            sx={{
                                backgroundColor: "#EDBF47",
                                "&:hover": { backgroundColor: "#EDBF47" },
                            }}
                        >
                            {page == 10 ? "Submit" : "Next"}
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

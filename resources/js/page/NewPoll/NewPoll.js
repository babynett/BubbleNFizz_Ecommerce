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
import PollQuestion1 from "./PollQuestions/PollQuestion1";

const NewPoll = ({user}) => {
    const userObject = JSON.parse(user)
    const [active, setActive] = useState(0);
    const [fade, setFade] = useState(false);
    const [step, setStep] = useState(1);
    
    // FOR PROFILE
    const [birthday, setBirthday] = useState(moment());
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [contactNo, setContactNo] = useState("");
    
    // SCENT
    const [selectedScent, setSelectedScent] = useState([]);
    const [skinType, setSkinType] = useState('')

    const questions = [
        {
            id: 1,
            question:
                "Do you frequently experience tightness or discomfort on your body due to dry skin?",
            value: "1",
        },
        {
            id: 2,
            question:
                "Do you find that your skin often feels itchy or irritated, especially after showering or bathing?",
            value: "Dry Skin",
        },
        {
            id: 3,
            question:
                "Are you looking for effective body care tips or products specifically designed to manage and relieve dry skin on your body?",
            value: "Dry Skin",
        },
        {
            id: 4,
            question:
                "Are you allergic to the following ingredients? (Coconut oil, Palm oil, Olive oil)",
            value: "Dry Skin:Allergic",
        },
        {
            id: 5,
            question:
                "Do you suffer from an allergic reaction to strong fragrances?",
            value: "Dry Skin:AllergicF",
        },
        {
            id: 6,
            question:
                "Do you often notice an oily or greasy feeling on your back, chest, or other parts of your body?",
            value: "2",
        },
        {
            id: 7,
            question:
                "Are you concerned about body acne or breakouts in areas like your shoulders or back due to excess oil?",
            value: "Oily Skin",
        },
        {
            id: 8,
            question:
                "Do you find that your clothing frequently becomes stained or feels uncomfortable due to your oily skin?",
            value: "Oily Skin",
        },
        {
            id: 9,
            question:
                "Have you tried various body care products to control oiliness but haven't found a lasting solution?",
            value: "Oily Skin",
        },
        {
            id: 10,
            question:
                "Are you looking for effective body care tips or products specifically designed to manage and reduce oily skin on your body?",
            value: "Oily Skin",
        },
        {
            id: 11,
            question:
                "Are you allergic to the following ingredients? (Coconut oil, Palm oil, Olive oil)",
            value: "Oily Skin:Allergic",
        },
        {
            id: 12,
            question:
                "Do you suffer from an allergic reaction to strong fragrances?",
            value: "Oily Skin:AllergicF",
        },
        {
            id: 13,
            question:
                "Do you often experience redness, itching, or irritation on your body after using certain skincare products or after showering?",
            value: "3",
        },
        {
            id: 14,
            question:
                "Are you concerned about frequent reactions to common ingredients in body soaps?",
            value: "Sensitive Skin",
        },
        {
            id: 15,
            question:
                "Do you find that your skin is easily affected by changes in weather or environmental factors, causing discomfort or sensitivity?",
            value: "Sensitive Skin",
        },
        {
            id: 16,
            question:
                "Are you looking for gentle and effective body care tips or products specifically designed to soothe and protect sensitive skin on your body?",
            value: "Sensitive Skin",
        },
        {
            id: 17,
            question:
                "Are you allergic to the following ingredients? (Coconut oil, Palm oil, Olive oil)",
            value: "Sensitive Skin:Allergic",
        },
        {
            id: 18,
            question:
                "Do you suffer from an allergic reaction to strong fragrances?",
            value: "Sensitive Skin:AllergicF",
        },
        {
            id: 19,
            question:
                "Do you notice that some areas of your body are oily while other areas are dry or normal?",
            value: "4",
        },
        {
            id: 20,
            question:
                "Are you concerned about finding the right balance of body care products that can address both oily and dry areas effectively?",
            value: "Combination Skin",
        },
        {
            id: 21,
            question:
                "Have you struggled to find body care routines or products that cater to the different needs of your combination skin?",
            value: "Combination Skin",
        },
        {
            id: 22,
            question:
                "Are you looking for specific tips or products to help manage and balance the unique challenges of combination skin on your body?",
            value: "Combination Skin",
        },
        {
            id: 23,
            question:
                "Are you allergic to the following ingredients? (Coconut oil, Palm oil, Olive oil)",
            value: "Combination Skin:Allergic",
        },
        {
            id: 24,
            question:
                "Do you suffer from an allergic reaction to strong fragrances?",
            value: "Combination Skin:AllergicF",
        },
        {
            id: 25,
            question:
                "Do you find that your skin is generally well-balanced, without frequent dryness or oiliness?",
            value: "5",
        },
        {
            id: 26,
            question:
                "Are you looking for body soaps to maintain your skin's healthy appearance and prevent potential issues?",
            value: "Normal Skin",
        },
        {
            id: 27,
            question:
                "Do you experience occasional breakouts or irritations, but overall have smooth and clear skin?",
            value: "Normal Skin",
        },
        {
            id: 28,
            question:
                "Have you been searching for body care products that will help keep your skin in its current healthy condition?",
            value: "Normal Skin",
        },
        {
            id: 29,
            question:
                "Are you interested in learning about products that can enhance and preserve the natural balance of your normal skin?",
            value: "Normal Skin",
        },
        {
            id: 30,
            question:
                "Are you allergic to the following ingredients? (Coconut oil, Palm oil, Olive oil)",
            value: "Normal Skin:Allergic",
        },
        {
            id: 31,
            question:
                "Do you suffer from an allergic reaction to strong fragrances?",
            value: "Normal Skin:AllergicF",
        },
        {
            id: 32,
            question:
                "Are you concerned about flaky, rough, or scaly patches on areas like your arms, legs, or torso?",
            value: "6",
        },
        {
            id: 33,
            question:
                "Do you frequently notice rough, scaly patches on areas like your elbows, knees, or other parts of your body?",
            value: "Scaly Skin",
        },
        {
            id: 34,
            question:
                "Are you concerned about the appearance and texture of your skin due to persistent scaling or flaking?",
            value: "Scaly Skin",
        },
        {
            id: 35,
            question:
                "Do you experience itching or discomfort in areas where your skin is particularly scaly?",
            value: "Scaly Skin",
        },
        {
            id: 36,
            question:
                "Have you tried various body care products to smooth and hydrate your skin but haven't found a lasting solution?",
            value: "Scaly Skin",
        },
        {
            id: 37,
            question:
                "Are you allergic to the following ingredients? (Coconut oil, Palm oil, Olive oil)",
            value: "Scaly Skin:Allergic",
        },
        {
            id: 38,
            question:
                "Do you suffer from an allergic reaction to strong fragrances?",
            value: "Scaly Skin:AllergicF",
        },
        {
            id: 39,
            question:
                "Do you frequently experience breakouts or pimples on your back, chest, or other areas of your body?",
            value: "7",
        },
        {
            id: 40,
            question:
                "Are you concerned about acne scars or dark spots resulting from previous breakouts on your body?",
            value: "Acne Prone Skin",
        },
        {
            id: 41,
            question:
                "Do you find that your body acne worsens with certain activities, such as sweating or wearing tight clothing?",
            value: "Acne Prone Skin",
        },
        {
            id: 42,
            question:
                "Have you tried various body care products or routines to control acne but haven't found a lasting solution?",
            value: "Acne Prone Skin",
        },
        {
            id: 43,
            question:
                "Are you concerned about body acne or breakouts in areas like your shoulders or back due to excess oil?",
            value: "Acne Prone Skin",
        },
        {
            id: 44,
            question:
                "Are you allergic to the following ingredients? (Coconut oil, Palm oil, Olive oil)",
            value: "Acne Prone Skin:Allergic",
        },
        {
            id: 45,
            question:
                "Do you suffer from an allergic reaction to strong fragrances?",
            value: "Acne Prone Skin:AllergicF",
        },
    ];

    const onSubmit = () => {
        const skinTypeVal = questions[active].value
        const skinTypeArr = skinTypeVal.split(':')
        api.post("usermanagement/adduserprofile", {
            user_id: userObject.id,
            birthday: moment(birthday).format("YYYY-MM-DD"),
            address: address,
            city: city,
            postal_code: postalCode,
            contact_no: contactNo,
            skin_type: skinTypeArr[0],
            scent: JSON.stringify(selectedScent),
            allergic: skinTypeArr[1] != undefined && skinTypeArr[1] == 'Allergic' ? skinTypeArr[1] : null
            })
            .then((response) => {
                console.log(response.data);
                setSkinType(skinTypeArr[0])
                setStep(step + 1);
            })
            .catch((err) => {
                console.log(err.response);
            });
    }

    useEffect(() => {
        questions[active];
    }, [active]);

    const onNegative = () => {
        setFade(true);
        const answerVal = questions[active].value;
        const answerValArr = answerVal.split(":");
        console.log(answerValArr)
        setTimeout(() => {
            setFade(false);
            console.log("no");
            if (questions[active].id == 1) {
                setActive(5);
                console.log(questions[active].value);
            } else if (questions[active].id == 6) {
                setActive(12);
                console.log(questions[active].value);
            } else if (questions[active].id == 13) {
                setActive(18);
                console.log(questions[active].value);
            } else if (questions[active].id == 19) {
                setActive(24);
                console.log(questions[active].value);
            } else if (questions[active].id == 25) {
                setActive(31);
                console.log(questions[active].value);
            } else if (questions[active].id == 32) {
                setActive(38);
                console.log(questions[active].value);
            } else if (questions[active].id == 39) {
                setActive(0);
                console.log(questions[active].value);
            } else {
                if (answerValArr[1] !== undefined && answerValArr[1] == 'AllergicF') {
                    console.log("Pili ng scent")
                    setFade(false)
                    setStep(2)
                } else {
                    setActive(active + 1);
                    console.log(questions[active].id);
                }
            }
        }, 500);
    };

    const onPositive = () => {
        setFade(true);
        const answerVal = questions[active].value;
        const answerValArr = answerVal.split(":");
        setTimeout(() => {
            if (answerValArr[1] !== undefined && answerValArr[1] == 'Allergic') {
                console.log("Allergic ya");
                setFade(false);
                console.log("yes");
                setStep(3)
            } else if (answerValArr[1] !== undefined && answerValArr[1] == 'AllergicF') {
                console.log("Allergic Fragrance ya");
                setFade(false);
                console.log("yes");
                setStep(3)
            } else {
                setFade(false);
                console.log("yes");
                setActive(active + 1);
            }
        }, 500);
    };

    return (
        <div className="w-full">
            <div className="flex justify-center w-full items-center flex-col py-6">
                {step === 1 ? (

                <div className="text-center h-screen w-2/3 lg:w-8/12 items-center justify-center flex">
                    <div className="px-0 flex flex-col justify-around h-2/3">
                        <Typography
                            variant="h4"
                            className={`transition-opacity duration-300 ${
                                fade ? "opacity-0" : "opacity-100"
                            }`}
                        >
                            {questions[active].question}
                        </Typography>
                        <div className="flex justify-center items-center space-x-8">
                            <Button
                                fontWeight={700}
                                variant="contained"
                                fullWidth
                                onClick={onNegative}
                                sx={{
                                    color: "#fff",
                                    borderColor: "#EDBF47",
                                    backgroundColor: "#EDBF47",
                                    height: 60,
                                    "&:hover": {
                                        color: "#fff",
                                        backgroundColor: "#EDBF47",
                                        borderColor: "#EDBF47",
                                    },
                                }}
                            >
                                No
                            </Button>
                            <Button
                                fontWeight={700}
                                variant="contained"
                                fullWidth
                                onClick={onPositive}
                                sx={{
                                    color: "#fff",
                                    borderColor: "#EDBF47",
                                    backgroundColor: "#EDBF47",
                                    height: 60,
                                    "&:hover": {
                                        color: "#fff",
                                        backgroundColor: "#EDBF47",
                                        borderColor: "#EDBF47",
                                    },
                                }}
                            >
                                Yes
                            </Button>
                        </div>
                    </div>
                </div>
                ) : step == 2 ? (
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
                        <Button fullWidth variant="contained" onClick={() => setStep(3)}>Next</Button>
                    </div>
                ) : step == 3 ? (
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
                        <Button fullWidth variant="contained" onClick={onSubmit}>SUBMIT</Button>
                    </div>
                ) : (
                    <div className="text-center h-screen w-2/3 lg:w-8/12 items-center justify-center flex">
                    <div className="px-0 flex flex-col justify-around h-2/3">
                        <Typography
                            variant="h4"
                            className={`transition-opacity duration-300 ${
                                fade ? "opacity-0" : "opacity-100"
                            }`}
                        >
                            Your poll answers reveal your skin type and according to the results you may have {skinType}! And with your favorite fragrances in mind, we’ll suggest body soaps that are perfect for your skin and smell amazing!
                        </Typography>
                        <div className="flex justify-center items-center space-x-8">
                            <Button
                                fontWeight={700}
                                variant="contained"
                                fullWidth
                                onClick={() => location.href = "/shopping"}
                                sx={{
                                    color: "#fff",
                                    borderColor: "#EDBF47",
                                    backgroundColor: "#EDBF47",
                                    height: 60,
                                    "&:hover": {
                                        color: "#fff",
                                        backgroundColor: "#EDBF47",
                                        borderColor: "#EDBF47",
                                    },
                                }}
                            >
                                SHOP NOW!
                            </Button>
                        </div>
                    </div>
                </div>
                )}
            </div>
        </div>
    );
};

export default NewPoll;

if (document.getElementById("CustomerPoll")) {
    const element = document.getElementById("CustomerPoll");
    const props = Object.assign({}, element.dataset);
    ReactDOM.render(
        <NewPoll {...props} />,
        document.getElementById("CustomerPoll")
    );
}

import { Typography } from "@mui/material";
import React from "react";
import CustomButton from "../../../components/CustomButton";
import CustomPollButton from "../../../components/CustomPollButton";

const PollQuestion1 = ({question, value, onPositive, onNegative}) => {
    return (
        <div className="text-center w-2/3 lg:w-8/12 items-center justify-center flex h-full">
            <div className="px-0 flex flex-col justify-around h-2/3">
                <Typography variant="h4" className="transition-opacity">
                    {question}
                </Typography>
                <div className="flex justify-center items-center space-x-8">
                    <CustomPollButton title={'NO'} value={'no'} onClick={onNegative} />
                    <CustomPollButton title={'YES'} value={'yes'} onClick={onPositive} />
                </div>
            </div>
        </div>
    );
};

export default PollQuestion1;

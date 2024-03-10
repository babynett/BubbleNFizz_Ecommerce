import { Typography } from "@mui/material";
import React from "react";
import CustomSelectInput from "../components/CustomSelectInput";

const CustomTitle = ({ text, hasButton = false, setSort, sort, options }) => {
    return (
        <div className="flex justify-between items-center w-full">
            <Typography
                variant="h3"
                color={"#B75800"}
                fontWeight={700}
                sx={{ marginBottom: 3 }}
            >
                {text}
            </Typography>
            {hasButton && (
                <CustomSelectInput
                    label={`Sort By`}
                    onChange={(event) => setSort(event.target.value)}
                    value={sort}
                    options={options}
                    fullWidth={false}
                />
            )}
        </div>
    );
};

export default CustomTitle;

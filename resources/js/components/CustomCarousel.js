import { Card, Typography } from "@mui/material";
import React from "react";
import FiberManualRecordOutlinedIcon from "@mui/icons-material/FiberManualRecordOutlined";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

const CustomCarousel = () => {
    return (
        <>
            <Card
                style={{
                    paddingLeft: 15,
                    paddingRight: 15,
                    paddingTop: 8,
                    paddingBottom: 8,
                }}
                variant="outlined"
            >
                <Typography
                    variant="h4"
                    fontWeight={`700`}
                    textAlign={`center`}
                >
                    Announcements
                </Typography>
                <Typography variant="h6">Announcement Title</Typography>
                <Typography variant="body1">
                    Announcement Description: Lorem ipsum, dolor sit amet
                    consectetur adipisicing elit. Quis necessitatibus natus
                    incidunt! Nam porro quas voluptatum incidunt! Sunt tenetur,
                    nihil repudiandae enim cum vitae nam, ex quam similique
                    rerum laborum?
                </Typography>
                <div className="flex justify-center items-center"></div>
            </Card>
        </>
    );
};

export default CustomCarousel;

import { Button } from "@mui/material";
import React, { useRef } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const CustomFileUpload = ({ handleFile, my }) => {
    const hiddenFileInput = useRef(null);
    const handleClick = (e) => {
        hiddenFileInput.current.click();
    };
    const handleChange = (e) => {
        const fileUploaded = e.target.files[0];
        toast("File has been uploaded!", {
            type: "success",
        });
        handleFile(fileUploaded);
    };
    return (
        <Button
            startIcon={<CloudUploadIcon />}
            variant="contained"
            sx={{ backgroundColor: "#B75800", "&:hover": {backgroundColor: "#B75800"} }}
            onClick={handleClick}
            fullWidth
            style={{
                marginTop: my,
                marginBottom: my,
            }}
        >
            UPLOAD FILE
            <input
                type="file"
                className="hidden"
                ref={hiddenFileInput}
                onChange={handleChange}
                accept="image/png, image/jpeg"
            ></input>
        </Button>
    );
};

export default CustomFileUpload;

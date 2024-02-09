import React from "react";
import { Box, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import {
  setGroupSelectedTrue,
  setUserSelectedTrue,
} from "../../store/slices/chatSlice";
import { XCircle } from "@phosphor-icons/react";

const InfoTitle = ({ value }) => {
  const dispatch = useDispatch();
  const selectedCross = () => {
    dispatch(setUserSelectedTrue({ userSelected: false }));
    dispatch(setGroupSelectedTrue({ groupSelected: false }));
  };
  return (
    <Box
      sx={{
        borderLeft: "1.5px solid #B4B4B4",
        backgroundColor: "var(--backgroundColor2)",
        display: "flex",
        gap: "2rem",
        alignItems: "center",
        height: "4.6rem",
        // boxShadow: 1,
      }}
    >
      <XCircle
        size={24}
        color="var(--grayFontColor)"
        style={{ marginLeft: "2rem" }}
        onClick={() => selectedCross()}
      />
      <Typography
        sx={{
          color: "var(--grayFontColor)",
          fontSize: "1.1rem",
          fontWeight: 500,
          my: "1rem",
        }}
      >
        {value}
      </Typography>
    </Box>
  );
};

export default InfoTitle;

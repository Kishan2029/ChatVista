import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import OnlineAvatar from "../common/OnlineAvatar";
import { useDispatch, useSelector } from "react-redux";
import {
  setContactInfoId,
  setGroupSelectedTrue,
  setUserSelectedTrue,
} from "../../store/slices/chatSlice";

const Title = ({ name, id }) => {
  const chatData = useSelector((state) => state.chat);
  const chatUserId = chatData.userInfo.id;
  const isGroup = chatData.userInfo.group;
  const members = chatData.userInfo.members;
  const memberCount = chatData.userInfo.memberCount;
  const profileUrl = chatData.userInfo.profileUrl;
  const [online, setOnline] = useState(false);

  const dispatch = useDispatch();

  let groupComponent = "";
  if (isGroup) {
    groupComponent = (
      <div>
        {members.map((item, index) => {
          if (index < 3)
            return (
              <span key={index}>
                {item}
                {index !== members.length - 1 && ", "}
              </span>
            );
        })}
        {members.length > 3 && (
          <span>{" & " + (memberCount - 3) + " other"} </span>
        )}
      </div>
    );
  }

  const selectedInfo = () => {
    // console.log("click on info");
    if (groupComponent) {
      dispatch(setContactInfoId({ contactId: id }));
      dispatch(setUserSelectedTrue({ userSelected: false }));
      dispatch(setGroupSelectedTrue({ groupSelected: true }));
    } else {
      dispatch(setContactInfoId({ contactId: id }));
      dispatch(setGroupSelectedTrue({ groupSelected: false }));
      dispatch(setUserSelectedTrue({ userSelected: true }));
    }
  };
  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: "var(--backgroundColor2)",
        justifyContent: "space-between",
        px: "1rem",
        py: "0.8rem",
        borderLeft: "1.5px solid #B4B4B4",
        alignItems: "center",
        cursor: "pointer",
      }}
      onClick={() => selectedInfo()}
    >
      <Box sx={{ display: "flex", gap: "1.4rem" }}>
        <OnlineAvatar
          name={name}
          id={chatUserId}
          online={online}
          setOnline={setOnline}
          profileUrl={profileUrl}
        />
        <Box>
          <Typography sx={{ color: "#030303", fontWeight: 600 }}>
            {name}
          </Typography>
          <Typography sx={{ color: "var(--grayFontColor2)" }}>
            {isGroup ? groupComponent : online ? `Online` : `Offline`}
          </Typography>
        </Box>
      </Box>
      {/* <MagnifyingGlass size={28} /> */}
    </Box>
  );
};

export default Title;

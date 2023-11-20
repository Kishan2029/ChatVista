import { Box, InputAdornment, TextField } from "@mui/material";
import { Link, Smiley, TelegramLogo } from "@phosphor-icons/react";
import React, { useEffect, useState } from "react";

const WriteMessage = () => {
  const [sendMessage, setSendMessage] = useState("");

  const onSendMessage = () => {
    console.log("message", sendMessage);
    socket.emit("sendMessage", sendMessage);
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        bgcolor: "var(--chatEnterMessageButtonMarginColor)",
        // bgcolor: "green",
        p: "1rem",
        borderLeft: "1.5px solid #B4B4B4",
      }}
    >
      <Box sx={{ width: "90%" }}>
        <TextField
          id="enter-message"
          placeholder="Write a message..."
          value={sendMessage}
          onChange={(e) => setSendMessage(e.target.value)}
          sx={{
            borderColor: "green",
            input: {
              color: "var(--chatEnterMessageButtonFontColor)",
              bgcolor: "var(--chatEnterMessageButtonBackgroundColor)",
              height: "1.2rem",

              // px: 0,
              // mx: 0,
            },
          }}
          inputProps={{ style: { borderColor: "red" } }}
          variant="outlined"
          fullWidth
          // InputProps={{
          //   startAdornment: (
          //     <InputAdornment position="start" sx={{ bgcolor: "yellow" }}>
          //       <Box sx={{ bgcolor: "blue" }}>
          //         <Link
          //           size={32}
          //           color="var(--chatEnterMessageButtonFontColor)"
          //         />
          //       </Box>
          //     </InputAdornment>
          //   ),
          //   endAdornment: (
          //     <InputAdornment
          //       position="end"
          //       sx={{
          //         bgcolor: "yellow",
          //         color: "green",
          //       }}
          //     >
          //       <Smiley
          //         size={32}
          //         color="var(--chatEnterMessageButtonFontColor)"
          //       />
          //     </InputAdornment>
          //   ),
          // }}

          onKeyDown={(ev) => {
            if (ev.key === "Enter") {
              console.log("Enter Pressed");
              ev.preventDefault();

              // console.log("comment", commentMessage);
              if (sendMessage !== "") {
                onSendMessage();
              }
            }
          }}
        />
      </Box>
      <Box sx={{ width: "10%", ml: "2rem" }}>
        <Box
          sx={{
            p: "0.9rem",
            bgcolor: "var(--chatMessageBlue)",
            height: "1.7rem",
            width: "1.7rem",
            borderRadius: "1rem",
          }}
        >
          <TelegramLogo
            size={28}
            color="#fff"
            onClick={() => onSendMessage()}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default WriteMessage;

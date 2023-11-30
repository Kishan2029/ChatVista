import { Box, InputAdornment, TextField } from "@mui/material";
import { Link, Smiley, TelegramLogo } from "@phosphor-icons/react";
import React, { useEffect, useRef, useState } from "react";
import { writeMessage } from "../../reactQuery/mutation";
import { useSelector } from "react-redux";
import { useMutation, useQueryClient } from "react-query";
import { socket } from "../../socket/index";

const WriteMessage = ({ scrollView, setScrollView }) => {
  const auth = useSelector((state) => state.auth.user);
  const chatData = useSelector((state) => state.chat);
  const chatUserId = chatData.userInfo.id;

  const queryClient = useQueryClient();

  const [sendMessage, setSendMessage] = useState("");

  const writeMessageMutation = useMutation({
    mutationFn: (body) => writeMessage(body),
    onMutate: async (body) => {
      // add message into user chat
      queryClient.setQueriesData(["userChats", chatUserId], (oldData) => {
        const newData = oldData.map((item) => {
          if (item.date.toLowerCase() === "today") {
            item.messages.push({
              time: "now",
              content: body.content,
              id: Math.floor(Math.random() * 90000) + 10000,
              createdBy: auth.userId,
            });
          }
          return item;
        });

        return newData;
      });
      setScrollView(Math.floor(Math.random() * 90000) + 10000);

      // update last message in card
      queryClient.setQueriesData(["allChats"], (oldData) => {
        const newData = oldData.map((item) => {
          if (item.friendId === body.userB) {
            item.lastMessage = body.content;
          }
          return item;
        });

        return newData;
      });
    },
    onSuccess: async (queryKey, body) => {
      // set data
      console.log("message created successfully");
    },
  });

  const onSendMessage = () => {
    const socketData = {
      userA: auth.userId,
      userB: chatUserId,
      content: sendMessage,
    };
    socket.emit("sendMessage", socketData);

    writeMessageMutation.mutate({
      userA: auth.userId,
      userB: chatUserId,
      status: "sent",
      content: sendMessage,
    });

    setSendMessage("");
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
              ev.preventDefault();

              // console.log("comment", commentMessage);
              if (sendMessage !== "") {
                onSendMessage();
              }
            } else {
              const socketData = {
                userA: auth.userId,
                userB: chatUserId,
              };
              socket.emit("userTyping", socketData);
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

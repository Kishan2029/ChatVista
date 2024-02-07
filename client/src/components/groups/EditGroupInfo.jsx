import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  Divider,
  IconButton,
  Paper,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { Camera } from "@phosphor-icons/react/dist/ssr";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { editGroupInfo } from "../../reactQuery/mutation";
import { notify } from "../../util/notify";
import { useDispatch, useSelector } from "react-redux";
import { setChatValue } from "../../store/slices/chatSlice";

const EditGroupInfo = ({ groupInfo, userId, groupId }) => {
  const [editProfile, setEditProfile] = useState(false);
  const [image, setImage] = useState(groupInfo?.profileUrl);
  const [editImage, setEditImage] = useState(groupInfo?.profileUrl);
  const [groupName, setGroupName] = useState(groupInfo.name);
  const [edit, setEdit] = useState(false);
  const [changeName, setChangeName] = useState(false);

  const chatData = useSelector((state) => state.chat);
  const dispatch = useDispatch();

  console.log("edit groupInfo", groupInfo);
  const queryClient = useQueryClient();

  const updateGroupInfoMutation = useMutation({
    mutationFn: (body) => editGroupInfo(body),
    onMutate: async (body) => {
      notify("success", "Group info updated.");
    },
    onSuccess: async (data, body) => {
      console.log("data", data);
      // set data
      console.log("Group info updated successfully");

      // update data where avatar is present
      queryClient.invalidateQueries(["allGroups"]);
      queryClient.invalidateQueries(["groupInfo", groupId]);
      if (chatData.userInfo.id === groupId)
        dispatch(
          setChatValue({
            userInfo: {
              ...chatData.userInfo,
              profileUrl: data.profileUrl,
              name: data.name,
            },
          })
        );
      //   queryClient.setQueriesData(["groupInfo", groupId], (oldData) => {
      //     const newData = {
      //       ...oldData,
      //       name: data.name,
      //       profileUrl: data.profileUrl,
      //     };
      //     console.log("newData", newData);
      //     return newData;
      //   });
    },
  });

  const isEmptyValue = () => {
    if (groupName === "") return true;
    return false;
  };

  const saveProfile = () => {
    let formData = new FormData();
    formData.append("name", groupName);
    formData.append("userId", userId);
    formData.append("groupId", groupId);
    if (edit) formData.append("images", editImage);
    setEditProfile(false);
    // setEdit(false);
    updateGroupInfoMutation.mutate(formData);
  };
  return (
    <>
      {editProfile ? (
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Box
            sx={{
              display: "flex",
              gap: "2rem",
              alignItems: "center",
              alignSelf: "center",
            }}
          >
            {/* Avatar Image */}
            <Box sx={{ position: "relative" }}>
              <Avatar
                src={
                  editImage
                    ? editImage.name !== undefined
                      ? URL.createObjectURL(editImage)
                      : editImage
                    : "/broken-image.jpg"
                }
                sx={{
                  height: "7.3rem",
                  width: "7.3rem",
                  mt: "3rem",
                  mb: "2rem",
                }}
              />
              {/* Image select button */}
              <IconButton
                sx={{
                  position: "absolute",
                  top: "62%",
                  left: "60%",
                }}
              >
                <label
                  htmlFor="profile-image"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <Paper
                    sx={{
                      borderRadius: "3rem",
                      padding: "0.3rem",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Camera size={22} color="#432828" />
                  </Paper>
                </label>
              </IconButton>
              <input
                id="profile-image"
                style={{ display: "none" }}
                type="file"
                name="myImage"
                accept="image/*"
                multiple
                // value={coverImage}
                onChange={(event) => {
                  setEdit(true);
                  //   setImage(event.target.files[0]);
                  setEditImage(event.target.files[0]);
                }}
              />
            </Box>
            {/* Text field */}
            <Box sx={{ mt: "0.6rem", width: "200%" }}>
              {/* <Box sx={{ display: "flex", alignItems: "center" }}> */}
              <TextField
                id="groupName"
                label="Group Name"
                variant="outlined"
                value={groupName}
                required
                onChange={(e) => {
                  setGroupName(e.target.value);
                  setChangeName(true);
                }}
                fullWidth
              />
              {/* </Box> */}
            </Box>
          </Box>
          <Button
            variant="outlined"
            sx={{
              px: "2.2rem",
              py: "0.4rem",
              fontWeight: 500,
              alignSelf: "flex-end",
              textTransform: "none",
              mt: "0rem",
              mr: "2rem",
              mb: "1.5rem",
            }}
            disabled={isEmptyValue()}
            onClick={() => saveProfile()}
          >
            Save
          </Button>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            gap: "2rem",
            alignItems: "center",
            alignSelf: "center",
          }}
        >
          <Avatar
            // src={groupInfo?.profileUrl ? groupInfo?.profileUrl : ""}
            src={
              edit
                ? editImage.name !== undefined
                  ? URL.createObjectURL(editImage)
                  : editImage
                : groupInfo?.profileUrl
                ? groupInfo?.profileUrl
                : ""
            }
            // src={
            //   editImage
            //     ? editImage.name !== undefined
            //       ? URL.createObjectURL(editImage)
            //       : editImage
            //     : "/broken-image.jpg"
            // }
            sx={{
              height: "6rem",
              width: "6rem",
              mt: "3rem",
              mb: "2rem",
            }}
          />
          <Box sx={{ mt: "0.6rem" }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography
                sx={{ fontSize: "1.2rem", color: "var(--userInfoFontColor)" }}
              >
                {changeName ? groupName : groupInfo.name}
                {/* {groupName} */}
              </Typography>
              <Tooltip title="Click to Edit">
                <EditIcon
                  sx={{
                    color: "var(--userInfoFontColor)",
                    fontSize: "1.5rem",
                    ml: "2rem",
                    alignSelf: "flex-start",
                    cursor: "pointer",
                  }}
                  onClick={() => setEditProfile(true)}
                />
              </Tooltip>
            </Box>
            <Typography
              sx={{ fontSize: "1rem", color: "var(--userInfoFontColor)" }}
            >
              {`${groupInfo.members.length} Members`}
            </Typography>
          </Box>
        </Box>
      )}
    </>
  );
};

export default EditGroupInfo;

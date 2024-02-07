import {
  Avatar,
  Box,
  Button,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { ArrowLeft } from "@phosphor-icons/react";
import React, { useEffect, useState } from "react";
import profileImage from "../assets/images/profile.jpeg";
import { useNavigate } from "react-router-dom";
import { fetchProfile } from "../reactQuery/query";
import { useSelector } from "react-redux";
import { useMutation, useQuery, useQueryClient } from "react-query";
import LocalLoader from "./LocalLoader";
import { updateProfile } from "../reactQuery/mutation";
import { notify } from "../util/notify";
import { Camera } from "@phosphor-icons/react/dist/ssr";

const UserProfile = () => {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth.user);
  const queryClient = useQueryClient();

  const { data, error, isError, isLoading } = useQuery({
    queryKey: ["userProfile"],
    queryFn: () => {
      // Check if auth is available before making the query
      if (auth && auth.userId) {
        return fetchProfile(auth.userId);
      }

      // Return a default value or null if auth is not available
      return [];
    },
    enabled: !!auth && !!auth.userId,
  });

  const profile = data;
  console.log("profile", profile);

  const [firstName, setFirstName] = useState(profile ? profile.firstName : "");
  const [lastName, setLastName] = useState(profile ? profile.lastName : "");
  const [about, setAbout] = useState(profile?.about);
  const [coverImage, setCoverImage] = useState(profile?.profileUrl);
  const [edit, setEdit] = useState(false);

  const updateProfileMutation = useMutation({
    mutationFn: (body) => updateProfile(body),
    onMutate: async (body) => {
      notify("success", "Profile Updated");
    },
    onSuccess: async (queryKey, body) => {
      // set data
      console.log("profile updated successfully");
      queryClient.invalidateQueries(["userProfile"]);
    },
  });

  const saveProfile = () => {
    let formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("about", about);
    formData.append("id", auth.userId);
    if (edit) formData.append("images", coverImage);
    updateProfileMutation.mutate(formData);
  };

  const isEmptyValue = () => {
    if (firstName === "" || lastName === "") return true;
    return false;
  };

  useEffect(() => {
    if (profile) {
      setFirstName(profile.firstName || "");
      setLastName(profile.lastName || "");
      setAbout(profile.about || "");
      setCoverImage(profile.profileUrl || "");
    }
  }, [profile]);
  useEffect(() => {
    console.log("coverImage", coverImage);
  }, [coverImage]);

  if (isLoading) {
    return <LocalLoader />;
  }

  return (
    <Box sx={{ padding: "1rem", height: "100%", position: "relative" }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: "2rem" }}>
        <ArrowLeft
          size={32}
          color="#4B4B4B"
          style={{ marginLeft: "1rem" }}
          onClick={() => navigate(-1)}
        />
        <Typography sx={{ fontSize: "2rem", fontWeight: 550 }}>
          Profile
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
          px: "2rem",
        }}
      >
        <Avatar
          src={
            coverImage
              ? coverImage.name !== undefined
                ? URL.createObjectURL(coverImage)
                : coverImage
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
            top: "22%",
            left: "55%",
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
            setCoverImage(event.target.files[0]);
          }}
        />

        <TextField
          // error={firstNameError.length === 0 ? false : true}
          // helperText={firstNameError}
          id="firstName"
          label="First Name"
          variant="outlined"
          fullWidth
          value={firstName}
          required
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
        />
        <TextField
          // error={firstNameError.length === 0 ? false : true}
          // helperText={firstNameError}
          id="lastName"
          label="Last Name"
          variant="outlined"
          fullWidth
          value={lastName}
          required
          onChange={(e) => {
            setLastName(e.target.value);
          }}
          sx={{
            mt: "1rem",
          }}
        />
        <Typography
          sx={{ color: "var(--grayFontColor2)", alignSelf: "flex-start" }}
        >
          This name is visible to your contacts
        </Typography>
        <TextField
          label="About"
          variant="outlined"
          sx={{ width: "100%", mt: "1rem" }}
          rows={4}
          value={about}
          multiline
          onChange={(e) => {
            setAbout(e.target.value);
          }}
        />

        <Button
          variant="outlined"
          sx={{
            px: "2.2rem",
            py: "0.4rem",
            fontWeight: 500,
            alignSelf: "flex-end",
            textTransform: "none",
            mt: "1rem",
          }}
          disabled={isEmptyValue()}
          onClick={() => saveProfile()}
        >
          Save
        </Button>
      </Box>
    </Box>
  );
};

export default UserProfile;

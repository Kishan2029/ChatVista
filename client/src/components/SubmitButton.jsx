import { Button } from "@mui/material";
import { grey } from "@mui/material/colors";
import React from "react";

const SubmitButton = ({ name, onClick, disabled = false }) => {
  return (
    <Button
      variant="contained"
      sx={{ textTransform: "none", mb: "1rem", mt: "1rem", bgcolor: grey[900] }}
      onClick={onClick}
      disabled={disabled}
      fullWidth
    >
      {name}
    </Button>
  );
};

export default SubmitButton;

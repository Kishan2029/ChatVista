import React, { useState } from "react";
import { Box, InputAdornment, TextField } from "@mui/material";
import { MagnifyingGlass, TelegramLogo } from "@phosphor-icons/react";
const SearchBox = ({ setSearch }) => {
  return (
    <div
      style={{
        display: "flex",
        gap: "1rem",
        backgroundColor: "var(--chatEnterMessageButtonBackgroundColor)",
        color: "var(--chatEnterMessageButtonFontColor)",
        height: "3rem",
        width: "90%",
        alignItems: "center",
        borderRadius: "1.3rem",
        p: "2rem",
      }}
    >
      <MagnifyingGlass
        size={24}
        color="var(--chatEnterMessageButtonFontColor)"
        style={{ marginLeft: "1rem" }}
      />
      <input
        placeholder="Search.."
        style={{
          border: "none",
          backgroundColor: "var(--chatEnterMessageButtonBackgroundColor)",
          outline: "none",
          fontSize: "1rem",
        }}
        onChange={(e) => {
          setSearch(e.target.value);
          // const handler = setTimeout(() => {
          //   setDebouncedValue(e.target.value);
          // }, 50);

          // return () => {
          //   clearTimeout(handler);
          // };
        }}
      />
    </div>
  );
};

export default SearchBox;

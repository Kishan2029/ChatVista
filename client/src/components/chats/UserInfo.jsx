import React from "react";
import { InfoTitle } from "../common";
import UserInfoContent from "./UserInfoContent";

const UserInfo = () => {
  return (
    <>
      <InfoTitle value={"User Info"} />
      <UserInfoContent />
    </>
  );
};

export default UserInfo;

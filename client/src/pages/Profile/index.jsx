import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { extractMessageFromErr } from "../../shared/utils/error";
import axios from "axios";
import { requestWithToken } from "../../shared/utils/axios-http";

const Profile = () => {
  const getMe = async () => {
    try {
      await requestWithToken({
        url: "/user/me",
      });
    } catch (err) {
      toast.error(extractMessageFromErr(err));
    }
  };
  useEffect(() => {
    getMe();
  }, []);
  return <div>Profile</div>;
};

export default Profile;

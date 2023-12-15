import { config } from "../config";
import axios from "axios";


// register user
export const registerUser = async (body) => {
    const { data } = await axios.post(config.urls.auth.register(), body, {

    });
    console.log("data", data);
    return data.data;
}

// verify user
export const verifyUser = async (body) => {
    const { data } = await axios.post(config.urls.auth.verify(), body, {

    });
    // console.log("data", data);
    return data.data;
}

// login user
export const loginUser = async (body) => {
    const { data } = await axios.post(config.urls.auth.login(), body, {

    });
    return data.data;
}

// send request
export const sendRequest = async (body) => {
    const { data } = await axios.post(config.urls.request.sendRequest(), body, {

    });
    return data.data;
}

// write message
export const writeMessage = async (body) => {
    const { data } = await axios.post(config.urls.message.createMessage(), body, {

    });
    return data.data;
}

// update profile
export const updateProfile = async (body) => {
    const { data } = await axios.put(config.urls.profile.updateProfile(), body, {

    });
    return data.data;
}
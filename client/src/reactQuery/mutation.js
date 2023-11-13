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
    // console.log("data", data);
    return data.data;
}
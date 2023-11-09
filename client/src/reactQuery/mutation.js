import { config } from "../config";
import axios from "axios";


// register user
export const registerUser = async (body) => {
    const { data } = await axios.post(config.urls.auth.register(), body, {

    });
    return data.data;
}
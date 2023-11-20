import { config } from "../config";
import axios from "axios";

export const fetchExploreUsers = async (id) => {
    const { data } = await axios.get(config.urls.user.getExploreUsers(id));
    return data.data;
}

export const fetchFriends = async (body) => {
    const { data } = await axios.post(config.urls.request.getFriends(), body, {

    });
    return data.data;
}
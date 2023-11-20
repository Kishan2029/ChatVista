import { config } from "../config";
import axios from "axios";

export const fetchExploreUsers = async (id) => {
    const { data } = await axios.get(config.urls.user.getExploreUsers(id));
    return data.data;
}

export const fetchFriends = async (id) => {
    const { data } = await axios.get(config.urls.user.getFriends(id));
    return data.data;
}

export const fetchRequests = async (id) => {
    const { data } = await axios.get(config.urls.request.getRequests(id));
    return data.data;
}
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

export const fetchAllChats = async (id) => {
    const { data } = await axios.get(config.urls.chat.getAllChats(id));
    return data.data;
}

export const fetchUserMessages = async (body) => {
    const { data } = await axios.post(config.urls.message.getMessages(), body);
    return data.data;
}

export const fetchProfile = async (id) => {
    const { data } = await axios.get(config.urls.profile.getProfile(id));
    return data.data;
}

export const fetchAllGroups = async (id) => {
    const { data } = await axios.get(config.urls.group.getAllGroups(id));
    return data.data;
}

export const fetchGroupMessages = async (body) => {
    const { data } = await axios.post(config.urls.groupMessage.getGroupMessages(), body);
    return data.data;
}
export const getGroupInfo = async (body) => {
    const { data } = await axios.post(config.urls.group.getGroupInfo(), body);
    return data.data;
}




export const config = {
  urls: {
    auth: {
      register: () => {
        return `${import.meta.env.VITE_BACKEND_URL}/auth/register`;
      },
      verify: () => {
        return `${import.meta.env.VITE_BACKEND_URL}/auth/verify`;
      },
      login: () => {
        return `${import.meta.env.VITE_BACKEND_URL}/auth/login`;
      },
    },
    user: {
      getExploreUsers: (id) => {
        return `${import.meta.env.VITE_BACKEND_URL}/user/exploreUsers/${id}`;
      },
      getFriends: (id) => {
        return `${import.meta.env.VITE_BACKEND_URL}/user/friends/${id}`;
      },

    },
    request: {
      getRequests: (id) => {
        return `${import.meta.env.VITE_BACKEND_URL}/request/${id}`;
      },
      sendRequest: () => {
        return `${import.meta.env.VITE_BACKEND_URL}/request/sent`;
      },

    },
    chat: {
      getAllChats: (id) => {
        return `${import.meta.env.VITE_BACKEND_URL}/chat/${id}`;
      },
    },
    message: {
      getMessages: () => {
        return `${import.meta.env.VITE_BACKEND_URL}/message/get`;
      },
      createMessage: () => {
        return `${import.meta.env.VITE_BACKEND_URL}/message/create`;
      },
    },
    profile: {
      getProfile: (id) => {
        console.log("id", id)
        return `${import.meta.env.VITE_BACKEND_URL}/profile/${id}`;
      },
      updateProfile: () => {
        return `${import.meta.env.VITE_BACKEND_URL}/profile/update`;
      },
    },
    group: {
      getAllGroups: (id) => {
        return `${import.meta.env.VITE_BACKEND_URL}/group/get/${id}`;
      },
      createGroup: () => {
        return `${import.meta.env.VITE_BACKEND_URL}/group/create`;
      },
      getGroupInfo: () => {
        return `${import.meta.env.VITE_BACKEND_URL}/group/getGroupInfo`;
      },
      addMember: () => {
        return `${import.meta.env.VITE_BACKEND_URL}/group/addMember`;
      },
      leftGroup: () => {
        return `${import.meta.env.VITE_BACKEND_URL}/group/leftGroup`;
      }
    },
    groupMessage: {
      getGroupMessages: () => {
        return `${import.meta.env.VITE_BACKEND_URL}/groupMessage/get`;
      },
      createGroupMessage: () => {
        return `${import.meta.env.VITE_BACKEND_URL}/groupMessage/create`;
      }
    }

  },
};

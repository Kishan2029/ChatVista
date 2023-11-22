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
    }

  },
};

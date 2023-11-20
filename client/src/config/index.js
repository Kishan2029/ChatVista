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
        return `${import.meta.env.VITE_BACKEND_URL}/user/exploreUsers/${id}`;
      },

    }

  },
};

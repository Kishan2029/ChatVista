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
      getUserInfo: (email) => {
        return `${import.meta.env.VITE_BACKEND_URL}/user/${email}`;
      },
      getFriends: (email) => {
        return `${import.meta.env.VITE_BACKEND_URL}/user/getFriends/${email}`;
      },
      getPhotos: (email) => {
        return `${import.meta.env.VITE_BACKEND_URL}/user/getPhotos/${email}`;
      },
      updateProfileText: () => {
        return `${import.meta.env.VITE_BACKEND_URL}/user/profile/updateText`;
      },
      updateProfileImage: () => {
        return `${import.meta.env.VITE_BACKEND_URL}/user/profile/updateImage`;
      },
      addFriend: () => {
        return `${import.meta.env.VITE_BACKEND_URL}/user/addFriend`;
      },
      updateDescription: () => {
        return `${import.meta.env.VITE_BACKEND_URL}/user/updateDescription`;
      },
    },

  },
};

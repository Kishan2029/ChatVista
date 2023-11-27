// export const getAccessToken = () => {
//     return localStorage.getItem("accessToken");
// }

// export const removeAccessToken = () => {
//     localStorage.removeItem("accessToken");
// }


export const isUserLoggedIn = () => {
    return localStorage.getItem("login");
}

export const setUserLogin = (userId) => {
    localStorage.setItem("login", true)
    localStorage.setItem("userId", userId)
}

export const truncateString = (string, length) => {
    if (string === undefined) return undefined;
    return string?.length > length ? string?.substring(0, length) + "..." : string?.substring(0, length);
};

export const stringToColor = (string) => {
    let hash = 0;
    let i;


    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.substr(-2);
    }


    return color;
}




// export const logoutUser = () => {
//     localStorage.removeItem("accessToken");
// }
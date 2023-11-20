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




// export const logoutUser = () => {
//     localStorage.removeItem("accessToken");
// }
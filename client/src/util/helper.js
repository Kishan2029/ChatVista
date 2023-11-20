// export const getAccessToken = () => {
//     return localStorage.getItem("accessToken");
// }

// export const removeAccessToken = () => {
//     localStorage.removeItem("accessToken");
// }


export const isUserLoggedIn = () => {
    return localStorage.getItem("login");
}

export const setUserLogin = () => {
    return localStorage.setItem("login", true)
}




// export const logoutUser = () => {
//     localStorage.removeItem("accessToken");
// }
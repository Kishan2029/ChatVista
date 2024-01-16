// export const getAccessToken = () => {
//     return localStorage.getItem("accessToken");
// }

// export const removeAccessToken = () => {
//     localStorage.removeItem("accessToken");
// }
const dateDiffInDays = (a, b) => {
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    // Discard the time and time-zone information.
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}

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
export const getFormattedTime = (date) => {

    const today = new Date();
    const diff = dateDiffInDays(date, today);

    if (diff === 0) {
        let hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        const formattedTime = `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes} ${ampm}`;
        return formattedTime;
    }
    else if (diff === 1) {
        return "Yesterday";
    } else {
        return date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
    }

}

export const playSound = () => {
    let src =
        "https://commondatastorage.googleapis.com/codeskulptor-assets/jump.ogg";
    let src1 = "src/assets/sound/Anya Notification ! Notification.mp3";
    let audio = new Audio(src1);
    audio.play();
};


// export const logoutUser = () => {
//     localStorage.removeItem("accessToken");
// }
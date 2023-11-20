import axios from "axios";
// import { notify } from "../util/notify";



export const axiosRequestInterceptor = () => axios.interceptors.request.use(
    function (config) {
        // Do something before request is sent
        console.log("Before request")
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

export const axiosResponseInterceptor = () => axios.interceptors.response.use(
    // consoe.log("After response");

    function (response) {
        // console.log("res", response)
        // if (response.data.notification.value) {
        //     notify("success", response.data.notification.message)
        // }

        return response;
    },
    function (error) {
        console.log("App error", error.response.data);
        return Promise.reject(error.response.data);
    }
);
import { message } from "antd";
import axios from "axios";

const BASE_URL = "https://api.ze-connect.com/esform/lake";
// const BASE_URL = "http://localhost:3447/lake";

export const request = (
    method,
    endpoint,
    body = {},
    params = {},
) => {
    var options = {
        baseURL: BASE_URL,
        endpoint: `${endpoint}`,
        method: method,
        headers: {
            "Content-Type": "application/json",
        },
    };
    
    return axios({
        baseURL: options.baseURL,
        headers: options.headers,
        timeout: 30000,

        method: options.method,
        url: options.endpoint,
        data: method === "GET" ? undefined : body,
        params,
    })
        .then((response) => {
            if (response?.status !== 200 && response?.status !== 201) {
                throw response;
            }

            if (method !== "GET" && response?.status === 200) {
                message.success("Thành công");
            }

            return response?.data?.data || {};
        })
        .catch((err) => {
            if (err?.response?.status === 403) {
                message.error("Not have permission");
                throw err;
            }
            message.error("Something went wrong")
            throw err;
        });
};

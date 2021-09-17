import axios from 'axios';
import { IAuthResponse } from '@/models';

export const API_URL = `http://localhost:3000/api/v1`;

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL,
});

// config - default config what i create
$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem(
        'accessToken'
    )}`;

    return config;
});

$api.interceptors.response.use(
    (config) => config,
    async (error) => {
        // make original request again
        const originalRequest = error.config;

        if (
            error.response.status === 401 &&
            error.config &&
            !error.config._isRetry
        ) {
            console.log('refresh');
            // set data about retry attempt to prevent infinity loop
            originalRequest._isRetry = true;

            try {
                // console.log('refresh');
                const response = await axios.get<IAuthResponse>(
                    `${API_URL}/refresh`,
                    {
                        withCredentials: true,
                    }
                );

                localStorage.setItem('accessToken', response.data.accessToken);

                return await $api.request(originalRequest);
            } catch (e) {
                console.log('unauthorized');
            }
        }

        throw error;
    }
);

export default $api;

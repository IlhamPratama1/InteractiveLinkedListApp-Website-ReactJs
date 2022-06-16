import axios from 'axios';

const baseURL = 'https://api.ilhampratama-interactive-linked-list.xyz/api/';

const axiosInstance = axios.create({
	baseURL: baseURL,
	timeout: 100000,
	headers: {
		'Content-Type': 'application/json',
		accept: 'application/json',
	},
});
axiosInstance.defaults.headers.common['x-access-token'] = GetAccessToken();

export function GetAccessToken() {
    const accessToken : string | null = localStorage.getItem('access_token');
    if (accessToken)
        return accessToken;
    else 
        return false;
}

export default axiosInstance;
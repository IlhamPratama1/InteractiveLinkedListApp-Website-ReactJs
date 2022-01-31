import axios from 'axios';

const baseURL = 'http://localhost:8000/api/';

const axiosInstance = axios.create({
	baseURL: baseURL,
	timeout: 100000,
	headers: {
		'x-access-token': GetAccessToken(),
		'Content-Type': 'application/json',
		accept: 'application/json',
	},
});

function GetAccessToken() {
    const accessToken : string | null = localStorage.getItem('access_token');
    if (accessToken)
        return accessToken;
    else 
        return false;
}

export default axiosInstance;
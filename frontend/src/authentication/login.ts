import axiosInstance, { GetAccessToken } from '../axios';
import { FormInterface, ErrorMessageInterface } from '../interface';

// Login User Function :
// Create login request to api using paramater:
// form data, success callback, error callbak
// invoke success if request is valid
// invoke error if request invalid
export function LoginUserAuth(formData: FormInterface, successCallback: Function, errorCallback: Function) {
    axiosInstance
    .post(`auth/signin`, {
        email: formData.email,
		password: formData.password,
    })
    .then((res) => {				
        localStorage.setItem('access_token', res.data.accessToken);
		axiosInstance.defaults.headers.common['x-access-token'] = GetAccessToken();
        successCallback(res.data.accessToken);
    })
    .catch(error => {
        let errors: ErrorMessageInterface = {};
        errors["404"] = error.response.data.message;
        errorCallback(errors);
    });
}
import axiosInstance from '../axios';
import { FormInterface, ErrorMessageInterface } from '../interface';

// Register User Function :
// Create Register request to api using paramater:
// form data, success callback, error callbak, redirect to...
// invoke success if request is valid
// invoke error if request invalid
export function RegisterUserAuth(formData: FormInterface, successCallback: Function, errorCallback: Function, redirect: Function) {
    axiosInstance
    .post(`auth/signup`, {
        username: formData.username,
		email: formData.email,
		password: formData.password,
        confirmPassword: formData.confirmPassword,
        roles: ["user"]
    })
    .then(() => {
        successCallback(formData, redirect, errorCallback);
    })
    .catch(error => {
        let errors: ErrorMessageInterface = {};
        errors["404"] = error.response.data.message;
        errorCallback(errors);
    });
}
import { ErrorMessageInterface, FormInterface, } from "../interface";
import { CheckRegexValidation } from "../regex";

// Login Validation
// Check if username or password is exist
// Use parameter form data and error callback
// return boolean if form is valid or not
export function LoginValidation(formData: FormInterface, errorCallback: Function): boolean {
    let formIsValid: boolean = true;
    let errorData: ErrorMessageInterface = {};

    if (formData.email === "") {
        formIsValid = false;
        errorData["email"] = "email can't be empty";
    }
    if (!formData.email.match(CheckRegexValidation('email'))){
        formIsValid = false;
        errorData["email"] = "must be valid email";
    }
    if (formData.password === "") {
        formIsValid = false;
        errorData["password"] = "password can't be empty";
    }
    if (!formIsValid) {
        errorCallback(errorData);
    }

    return formIsValid;
};
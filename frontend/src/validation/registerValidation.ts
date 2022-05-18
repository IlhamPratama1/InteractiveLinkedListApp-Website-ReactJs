import { ErrorMessageInterface, FormInterface, } from "../interface";

// Register Validation
// Check if username or password is exist
// Use parameter form data and error callback
// return boolean if form is valid or not
export function RegisterValidation(formData: FormInterface, callback: Function): boolean {
    let formIsValid: boolean = true;
    let errors: ErrorMessageInterface = {};
    if (formData.username === "") {
        formIsValid = false;
        errors["username"] = "Username can't be empty";
    }
    if (formData.email === "") {
        formIsValid = false;
        errors["email"] = "email can't be empty";
    }
    if (formData.password === "") {
        formIsValid = false;
        errors["password"] = "password can't be empty";
    }
    if (formData.confirmPassword === "") {
        formIsValid = false;
        errors["confirmPassword"] = "password2 can't be empty";
    }
    if (formData.password !== formData.confirmPassword) {
        formIsValid = false;
        errors["match"] = "Password not match";
    }

    if (!formIsValid) {
        callback(errors);
    }

    return formIsValid
};
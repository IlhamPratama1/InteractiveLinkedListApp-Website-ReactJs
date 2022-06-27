import { StructFormType } from "../type";

// Struct Form Validation
// Check if all input is filled
// Use parameter struct name, form data and error callback
// return boolean if form is valid or not
export function StructFormValidation(structName: string, formData: Array<StructFormType>, callback: Function): boolean {
    let formIsValid: boolean = true;
    let errors: any = {};
    let valuesSoFar = [];

    if (structName === '') {
        formIsValid = false;
        errors["name"] = "Struct name can't be empty";
    }

    for (let i = 0; i < formData.length; i++) {
        if (formData[i].value === '') {
            formIsValid = false;
            errors["value" + i] = "Struct name can't be empty";
        }
        if (formData[i].value === structName) {
            formIsValid = false;
            errors["value" + i] = "Struct data name can't same with struct name";
        }
        if (valuesSoFar.indexOf(formData[i].value) !== -1) {
            formIsValid = false;
            errors["value" + i] = "duplicate struct data name";
        }
        valuesSoFar.push(formData[i].value);
    }

    if (!formIsValid) {
        callback(errors);
    }

    return formIsValid;
}
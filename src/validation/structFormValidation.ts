import { StructFormType } from "../type";

export function StructFormValidation(structName: string, formData: Array<StructFormType>, callback: Function): boolean {
    let formIsValid: boolean = true;
    let errors: any = {};

    if (structName === '') {
        formIsValid = false;
        errors["name"] = "Struct name can't be empty";
    }
    for (let i = 0; i < formData.length; i++) {
        if (formData[i].value === '') {
            formIsValid = false;
            errors["value" + i] = "Struct name can't be empty";
        }
    }

    if (!formIsValid) {
        callback(errors);
    }

    return formIsValid;
}
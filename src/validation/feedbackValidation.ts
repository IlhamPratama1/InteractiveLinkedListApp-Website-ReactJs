import { UserFeedbackType } from "../type";

export default function FeedbackValidation(formData: UserFeedbackType[], totalFeedback: number, callback: Function) {
    let formIsValid: boolean = true;
    let errors: any = {};
    
    for (let i = 0; i < totalFeedback; i++) {
        if (formData[i] === undefined || formData[i].answer === '') {
            formIsValid = false;
            errors["value" + i] = "Answer can't be empty";
        }
    };

    if (!formIsValid) {
        callback(errors);
    }

    return formIsValid;
}
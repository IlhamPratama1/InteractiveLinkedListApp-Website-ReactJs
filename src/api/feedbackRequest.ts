import axiosInstance from "../axios";
import { UserFeedbackType } from "../type";

export async function GetAllFedbackQuestion(): Promise<any> {
    try {
        const feedback = await axiosInstance.get('/feedback/all');
        return feedback.data;
    } catch (err) {
        console.log(err);
    }
}

export async function GetAllFedbackResponse(): Promise<any> {
    try {
        const feedbackResponse = await axiosInstance.get('/feedback/response');
        return feedbackResponse.data;
    } catch (err) {
        console.log(err);
    }
}

export async function GetUserFeedback(): Promise<any> {
    try {
        const userFeedback = await axiosInstance.get('/user-feedback/all');
        return userFeedback.data;
    } catch (err) {
        console.log(err);
    }
}

export async function PostUserFeedback(data: UserFeedbackType[]): Promise<any> {
    try {
        const userFeedback = await axiosInstance.post('/user-feedback/create-update', {
            data: data
        });
        return userFeedback.data;
    } catch (err) {
        console.log(err);
    }
}
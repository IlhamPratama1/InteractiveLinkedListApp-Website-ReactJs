import axiosInstance from "../axios";

export async function GetMyUserQuiz(): Promise<any> {
    try {
        const userQuiz = await axiosInstance.get('/quiz/all');
        return userQuiz.data;
    } catch (err) {
        console.log(err);
    }
}

export async function SubmitUserQuiz(answersId: number[]): Promise<any> {
    try {
        const userQuiz = await axiosInstance.post('/quiz/create', {
            answersId: answersId
        });
        return userQuiz.data;
    } catch (err) {
        console.log(err);
    }
}

export async function GetAllQuestion(): Promise<any> {
    try {
        const questions = await axiosInstance.get('/quiz/question/all');
        return questions.data;
    } catch (err) {
        console.log(err);
    }
}
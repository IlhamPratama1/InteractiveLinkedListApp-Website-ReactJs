// Lib
import { useCallback, useEffect, useState } from "react";

// Type
import { FeedbackType, StateDataType, UserFeedbackType } from "../../type";

// External Functuin
import { GetAllFedbackQuestion, GetUserFeedback, PostUserFeedback } from "../../api/feedbackRequest";
import { GetMyProfile } from "../../api/userRequest";
import FeedbackValidation from "../../validation/feedbackValidation";


export default function FeedbackView() {
    // --- React State
    const [ userId, setUserId ] = useState<number>(0);
    const [ feedback, setFeedback ] = useState<StateDataType<FeedbackType>>({ isLoading: true, data:[] });
    const [ error, setError ] = useState<any>({});
    const [ userFeedback, setUserFeedback ] = useState<UserFeedbackType[]>([]);
    const [ complete, setComplete ] = useState<boolean>(false);

    function HandleUserFeedback(event: React.ChangeEvent<HTMLSelectElement>| React.ChangeEvent<HTMLInputElement>, index: number, feedbackId: number) {
        const feedbackAnswer: UserFeedbackType[] = [...userFeedback];
        const answerData = { userId, feedbackId: feedbackId, answer: event.target.value };
        feedbackAnswer[index] = answerData;
        setUserFeedback(feedbackAnswer);
    }

    async function SubmitUserFeedback(event: React.MouseEvent) {
        event.preventDefault();
        const isValid = FeedbackValidation(userFeedback, feedback.data.length, setError);
        console.log(isValid);
        if (isValid) { 
            setError({});
            const result = await PostUserFeedback(userFeedback);
            console.log(result);
            setComplete(true);
        }
    }

    const CheckFeedbackStatus = useCallback( async() => {
        const feedbackData = await GetAllFedbackQuestion();
        const profileData = await GetMyProfile();
        const userFeedback: UserFeedbackType[] = await GetUserFeedback();

        if (userFeedback.length > 0) {
            setUserFeedback(userFeedback)
            setComplete(true);
        }
        else setComplete(false);
        
        setFeedback({ isLoading: false, data: feedbackData });
        setUserId(profileData.id);
    }, []);

    useEffect(() => {
        CheckFeedbackStatus();        
    }, [CheckFeedbackStatus]);

    return (
        <div className="font-roboto h-full space-y-3">
            <div className="flex items-center">
                <img className='w-96' src='/static/illustrations/quest.svg' alt='quest' />
                <div className="space-y-2">
                    <h1 className='font-bold text-3xl'>Feedback</h1>
                    <p className='w-[32rem] text-md opacity-60'>Follow quest's instruction to complete all quest below. Complete quest by type of Linked List: Single Linked List, Double Linked List, Circular Linked List and play on editor.</p>
                </div>
            </div>
            {feedback.isLoading
                ? <div className="space-y-4">
                    <div className='animate-pulse h-36 lg:w-[64rem] radius-md bg-slate-gray'></div>
                    <div className='animate-pulse h-36 lg:w-[64rem] radius-md bg-slate-gray'></div>
                    <div className='animate-pulse h-36 lg:w-[64rem] radius-md bg-slate-gray'></div>
                    <div className='animate-pulse h-36 lg:w-[64rem] radius-md bg-slate-gray'></div>
                  </div>
                : <form className="space-y-4">
                    {feedback.data.map((data, i) => {
                            return (
                                <div className="space-y-1" key={i}>
                                    <label className="font-roboto text-sm opacity-60">{`question ${data.id}`}</label>
                                    <h1 className="font-roboto text-lg">{data.question}</h1>
                                    {complete
                                        ? <input disabled defaultValue={userFeedback[i].answer} className="focus:outline-none focus:border-cyan-dark p-4 w-full lg:w-[64rem] h-13 border rounded-md"></input>
                                        : <input onChange={e => HandleUserFeedback(e, i, data.id)} required className="focus:outline-none focus:border-cyan-dark p-4 w-full lg:w-[64rem] h-13 border rounded-md"></input>
                                    }
                                    <br />
                                    <span style={{ color: "red" }}>{error["value" + i]}</span>
                                </div>
                            );
                        })
                    }
                    {complete
                        ? <button disabled className="text-md font-bold py-3 px-7 bg-blue-dark text-cyan-light rounded-md">Submit</button>
                        : <button onClick={SubmitUserFeedback} className="text-md font-bold py-3 px-7 bg-blue-dark text-cyan-light rounded-md">Submit</button>
                    }
                </form>
            }
        </div>
    );
}
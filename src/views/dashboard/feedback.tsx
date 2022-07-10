// Lib
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";

// Type
import { FeedbackType, StateDataType, UserFeedbackType } from "../../type";
import { UserStateInterface } from "../../interface";
import { State } from "../../state";

// External Functuin
import { GetAllFedbackQuestion, GetUserFeedback, PostUserFeedback } from "../../api/feedbackRequest";
import { GetMyProfile } from "../../api/userRequest";
import FeedbackValidation from "../../validation/feedbackValidation";
import { Link } from "react-router-dom";


export default function FeedbackView() {
    const initialData = [
        { value: 1, text: "Bad" },
        { value: 2, text: "" },
        { value: 3, text: "" },
        { value: 4, text: "" },
        { value: 5, text: "Good" },
    ];

    const auth: UserStateInterface = useSelector((state: State) => state.auth);

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

    function HandleLikertFeedback(event: React.MouseEvent, scale: string, index: number, feedbackId: number) {
        event.preventDefault();
        const feedbackAnswer: UserFeedbackType[] = [...userFeedback];
        const answerData = { userId, feedbackId: feedbackId, answer: scale};
        feedbackAnswer[index] = answerData;
        setUserFeedback(feedbackAnswer);
    }

    async function SubmitUserFeedback(event: React.MouseEvent) {
        event.preventDefault();
        const isValid = FeedbackValidation(userFeedback, feedback.data.length, setError);
        if (isValid) { 
            setError({});
            await PostUserFeedback(userFeedback);
            setComplete(true);
        }
    }

    const CheckFeedbackStatus = useCallback( async() => {
        const feedbackData = await GetAllFedbackQuestion();
        const profileData = await GetMyProfile();
        const userFeedback: UserFeedbackType[] = await GetUserFeedback();
        
        if (userFeedback.length > 0) {
            setUserFeedback(userFeedback);
            setComplete(true);
        }
        else setComplete(false);
        
        setFeedback({ isLoading: false, data: feedbackData });
        setUserId(profileData.id);
    }, []);

    useEffect(() => {
        if (feedback.isLoading && auth.token) CheckFeedbackStatus();       
    }, [feedback, auth.token, CheckFeedbackStatus]);

    return (
        <div className="font-roboto h-full space-y-3">
            <div className="flex items-center">
                <img className='w-96' src='/static/illustrations/feedback.svg' alt='feedback' />
                <div className="space-y-2">
                    <h1 className='font-bold text-3xl'>Feedback</h1>
                    <p className='w-[32rem] text-md opacity-60'>Follow quest's instruction to complete all quest below. Complete quest by type of Linked List: Single Linked List, Double Linked List, Circular Linked List and play on editor.</p>
                </div>
            </div>
            {auth.token && feedback.isLoading
                ? <div className="space-y-4">
                    <div className='animate-pulse h-36 lg:w-[64rem] radius-md bg-slate-gray'></div>
                    <div className='animate-pulse h-36 lg:w-[64rem] radius-md bg-slate-gray'></div>
                    <div className='animate-pulse h-36 lg:w-[64rem] radius-md bg-slate-gray'></div>
                    <div className='animate-pulse h-36 lg:w-[64rem] radius-md bg-slate-gray'></div>
                  </div>
                : <form className="space-y-4">
                    {feedback.data.map((data, i) => {
                            return (
                                <div className="space-y-1  w-full lg:w-[64rem]" key={i}>
                                    <label className="font-roboto text-sm opacity-60">{`question ${data.id}`}</label>
                                    <h1 className="font-roboto text-lg">{data.question}</h1>
                                    {data.type === 'scale'
                                        ? <div className="flex space-x-4">
                                            {complete
                                                ? initialData.map(({value, text}) => {
                                                    return (
                                                        <div key={value} className="text-center space-y-2">
                                                            <button disabled className={`text-md font-bold w-12 h-12 rounded-full ${userFeedback[i] !== undefined && Number(userFeedback[i].answer) === value ? 'bg-blue-dark text-cyan-light' : 'bg-cyan-light text-blue-dark'}`}>
                                                                {value}
                                                            </button>
                                                            <h1 className="font-roboto text-sm opacity-80">{text}</h1>
                                                        </div>
                                                    );
                                                })
                                                : initialData.map(({value, text}) => {
                                                    return (
                                                        <div key={value} className="text-center space-y-2">
                                                            <button onClick={e => HandleLikertFeedback(e, String(value), i, data.id)} 
                                                                className={`text-md font-bold w-12 h-12 rounded-full ${userFeedback[i] !== undefined && Number(userFeedback[i].answer) === value ? 'bg-blue-dark text-cyan-light' : 'bg-cyan-light text-blue-dark'}`}>
                                                                {value}
                                                            </button>
                                                            <h1 className="font-roboto text-sm opacity-80">{text}</h1>
                                                        </div>
                                                    );
                                                })
                                            }
                                          </div>
                                        : complete
                                            ? <input disabled defaultValue={userFeedback[i] !== undefined ? userFeedback[i].answer : ''} className="focus:outline-none focus:border-cyan-dark p-4 w-full h-13 border rounded-md"></input>
                                            : <input onChange={e => HandleUserFeedback(e, i, data.id)} required className="focus:outline-none focus:border-cyan-dark p-4 w-full h-13 border rounded-md"></input>
                                    }
                                    <br />
                                    <span style={{ color: "red" }}>{error["value" + i]}</span>
                                </div>
                            );
                        })
                    }
                    { auth.token ? complete 
                        ? <h1 className='font-bold text-xl'>Feedback berhasil</h1>
                        : <div>
                            <span style={{ color: "red" }}>{error["404"]}</span>
                            <br />
                            <button onClick={SubmitUserFeedback} className="text-md font-bold py-3 px-7 bg-blue-dark text-cyan-light rounded-md">Submit</button>
                          </div>
                      : <h1 className='font-roboto text-lg'><Link to={`/login`} className="underline text-cyan-dark" >Sign in</Link> to give feedback</h1>
                    }
                </form>
            }
        </div>
    );
}
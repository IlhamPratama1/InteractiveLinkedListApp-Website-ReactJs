// Lib
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { GetMyUserQuiz } from "../../api/quizRequest";

// Type
import { UserStateInterface } from "../../interface";
import { State } from "../../state";
import { StateDataType, UserQuizType } from "../../type";


export default function QuizView() {
    // --- Redux state
    const auth: UserStateInterface = useSelector((state: State) => state.auth);

    // --- React state
    const [ userQuiz, setUserQuiz ] = useState<StateDataType<UserQuizType>>({ isLoading: true, data: []});

    const FetchUserQuiz = useCallback(async () => {
        const userQuizData = await GetMyUserQuiz();
        setUserQuiz({ isLoading: false, data: userQuizData });
    }, [])

    useEffect(() => {
        if (userQuiz.isLoading && auth.token) FetchUserQuiz();
    }, [auth.token, userQuiz, FetchUserQuiz]);

    return (
        <div className="font-roboto h-full space-y-3">
            <div className="flex items-center">
                <img className='w-96' src='/static/illustrations/lesson.svg' alt='lesson' />
                <div className="space-y-2">
                    <h1 className='font-bold text-3xl'>Lesson</h1>
                    <p className='w-[32rem] text-md opacity-60'>Follow quest's instruction to complete all quest below. Complete quest by type of Linked List: Single Linked List, Double Linked List.</p>
                    <br />
                    {auth.token 
                     ? <Link to={`/dashboard/quiz/start`} className="text-md font-bold py-3 px-7 bg-blue-dark text-cyan-light rounded-md">Attempt Test</Link>
                     : <h1 className='font-roboto text-lg'><Link to={`/login`} className="underline text-cyan-dark" >Sign in</Link> to attempt Test</h1>
                    }
                </div>
            </div>
            {auth.token ?
                userQuiz.isLoading 
                    ? <>
                        <div className='animate-pulse h-12 radius-md bg-slate-gray'></div>
                        <div className='animate-pulse h-12 radius-md bg-slate-gray'></div>
                      </>
                    : <table className="border-separate border-spacing-16 border border-slate-400"> 
                        <thead> 
                            <tr>
                                <th className="p-3 border border-slate-300">id</th>
                                <th className="p-3 border border-slate-300">Result</th>
                                <th className="p-3 border border-slate-300">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userQuiz.data.map((quizData, i) => {
                                return (
                                    <tr key={i}>
                                        <td className="p-3 border border-slate-300">{quizData.id}</td>
                                        <td className="p-3 border border-slate-300">{quizData.result}</td>
                                        <td className="p-3 border border-slate-300">{quizData.createdAt}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                      </table>
            :
            <div className='grid grid-cols-4 gap-4 text-center py-11'>
                <h1 className='font-roboto text-lg'><Link to={`/login`} className="underline text-cyan-dark" >Sign in</Link> see test record</h1>
            </div>
            }
        </div>
    );
}
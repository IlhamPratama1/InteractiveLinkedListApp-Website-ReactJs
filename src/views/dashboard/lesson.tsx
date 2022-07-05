// Lib
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { GetMyUserQuiz } from "../../api/quizRequest";

// Type
import { UserStateInterface } from "../../interface";
import { State } from "../../state";
import { StateDataType, UserQuizType } from "../../type";
import Lesson from "./components/lesson";


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
                </div>
            </div>
            <div className="grid lg:grid-cols-5 gap-10">
                <div className="col-span-3 space-y-4">
                    <div className="space-y-3">
                        <h1 className='font-bold text-xl'>Materi</h1>
                        <p className='w-[40rem] text-md opacity-60'>Follow quest's instruction to complete all quest below. Complete quest by type of Linked List: Single Linked List, Double Linked List.</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <Lesson path='/dashboard/lesson/struct' name="Materi Struct" subName="struct data" type="struct" />
                        <Lesson path='/dashboard/lesson/single-link' name="Materi Single Linked List" subName="single linked list" type="single" />
                        <Lesson path='/dashboard/lesson/double-link' name="Materi Double Linked List" subName="double linked list" type="double" />
                        <Lesson path='/dashboard/lesson/circular-link' name="Materi Circular Linked List" subName="circular linked list" type="circular" />
                    </div>
                </div>
                <div className="col-span-2 space-y-4">
                    <div className="space-y-2">
                        <h1 className='font-bold text-xl'>Test Records</h1>
                        <p className='w-[32rem] text-md opacity-60'>Follow quest's instruction to complete all quest below. Complete quest by type of Linked List: Single Linked List, Double Linked List.</p>
                        <br />
                        {auth.token 
                        ? <Link to={`/dashboard/lesson/test`} className="text-md font-bold py-3 px-7 bg-blue-dark text-cyan-light rounded-md">Attempt Test</Link>
                        : <h1 className='font-roboto text-lg'><Link to={`/login`} className="underline text-cyan-dark" >Sign in</Link> to attempt Test</h1>
                        }
                    </div>
                    <br />
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
                                        <th className="px-16 py-3 border border-slate-300">Result</th>
                                        <th className="px-16 py-3 border border-slate-300">Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {userQuiz.data.map((quizData, i) => {
                                        return (
                                            <tr key={i}>
                                                <td className="p-3 border border-slate-300">{i + 1}</td>
                                                <td className="px-16 py-3 border border-slate-300">{quizData.result}</td>
                                                <td className="px-16 py-3 border border-slate-300">{`${new Date(quizData.createdAt).getDate()}-${new Date(quizData.createdAt).getMonth()}-${new Date(quizData.createdAt).getFullYear()}`}</td>
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
            </div>
        </div>
    );
}
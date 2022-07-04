// Lib
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// Type
import { UserStateInterface } from "../../interface";
import { State } from "../../state";
import { QuestionType, StateDataType } from "../../type";

// External Function
import { GetAllQuestion, SubmitUserQuiz } from "../../api/quizRequest";


export default function StartQuizView() {
    let navigate = useNavigate();

    // --- Redux State
    const auth: UserStateInterface = useSelector((state: State) => state.auth);

    // --- State
    const [ questionIndex, setQuestionIndex ] = useState<number>(0);
    const [ question, setQuestion ] = useState<StateDataType<QuestionType>>({ isLoading: true, data: [] });
    const [ userAnswer, setUserAnswer ] = useState<{id: number, index: number}[]>([{id: -1, index: -1}]);

    function HandleQuestionIndex(index: number) { setQuestionIndex(index); }
    
    async function HandleSubmit() {
        let answersId: number[] = userAnswer.map((answer) => { return answer.id });
        await SubmitUserQuiz(answersId);
        navigate('/dashboard/quiz');
    }

    function HandleNavigationButton(index: number) {
        if (index >= 0 && index < question.data.length) {
            setQuestionIndex(index);
        }
    }

    function HandleAnswerData(index: number, answerId: number) {
        let answerData = {id: answerId, index: index};
        const answerClone = [...userAnswer];
        answerClone[questionIndex] = answerData;
        setUserAnswer(answerClone);
    }

    const FetchQuestionData = useCallback( async() => {
        const questionData = await GetAllQuestion();
        setQuestion({ isLoading: false, data: questionData });
        let initialAnswer = questionData.map(() =>  { return {id: -1, index: -1}});
        setUserAnswer(initialAnswer);
    }, [])

    useEffect(() => {
        if (question.isLoading && auth.token) FetchQuestionData();
    }, [question, auth.token, FetchQuestionData]);

    return (
        <div className="grid grid-cols-5 gap-8 font-roboto">
            <div className="col-span-5 lg:col-span-2 space-y-4">
                <h1 className='font-bold text-xl'>Total Question</h1>
                <div className="p-4 border rounded-md">
                    {auth.token && question.isLoading
                        ? <div className="">loading</div>
                        : question.data.map((data, i) => {
                            return (
                                <button key={i} onClick={() => HandleQuestionIndex(i)} className={`mr-4 mb-4 text-md font-bold w-12 h-12 rounded-full ${questionIndex === i ? 'bg-blue-dark text-cyan-light' : 'bg-cyan-light text-blue-dark'}`}>
                                    {i + 1}
                                </button>
                            );
                        })
                    }
                </div>
            </div>
            {auth.token && question.isLoading
            ? <div className="">loading</div>
            : <div className="col-span-5 lg:col-span-3 grid-cols-3 space-y-4">
                <h1 className='font-bold text-xl'>{`Question number ${questionIndex  + 1}`}</h1>
                <div className="p-4 border rounded-md">
                    <div className="space-y-4">
                        <p className='text-md'>{question.data[questionIndex].question}</p>
                        <div className="space-y-4">
                            {question.data[questionIndex].answers.map((answer, i) => {
                                return (
                                    <div key={i} className="flex space-x-3 items-center">
                                        <button key={i} onClick={() => HandleAnswerData(i, answer.id)} className={`text-md font-bold w-10 h-10 rounded-full ${userAnswer[questionIndex].index === i ? 'bg-blue-dark text-cyan-light' : 'bg-cyan-dark text-white'}`}>
                                            {i + 1}
                                        </button>
                                        <p className='text-md opacity-80'>{answer.answer}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
                <div className="flex justify-between">
                    <div className="flex space-x-3">
                        <button onClick={() => HandleNavigationButton(questionIndex - 1)} className="text-md font-bold py-3 px-7 bg-cyan-light text-blue-dark rounded-md">Prev</button>
                        <button onClick={() => HandleNavigationButton(questionIndex + 1)} className="text-md font-bold py-3 px-7 bg-cyan-dark text-blue-dark rounded-md">Next</button>
                    </div>
                    <button onClick={HandleSubmit} className="text-md font-bold py-3 px-7 bg-blue-dark text-cyan-light rounded-md">Submit</button>
                </div>
              </div>
            }
        </div>
    );
}
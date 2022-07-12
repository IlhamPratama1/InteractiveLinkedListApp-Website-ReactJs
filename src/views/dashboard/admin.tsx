// Lib
import 'chart.js/auto';
import { ChartData } from 'chart.js/auto';
import { useCallback, useEffect, useState } from "react";
import { Doughnut, Bar } from 'react-chartjs-2';

// External Function
import { GetAllFedbackResponse } from "../../api/feedbackRequest";
import { GetFilterQuest } from '../../api/questRequest';
import { GetAllUserQuiz } from '../../api/quizRequest';
import { FeedbackResponse, StateDataType, UserQuizType, UserResponse } from "../../type";


export default function AdminView() {
    const CHART_SCALE_FEEDBACK: number[] = [1, 2, 3, 4, 5];
    const [feedbacks, setFeedback] = useState<StateDataType<FeedbackResponse>>({ isLoading: true, data: []});
    const [userQuest, setUserQuest] = useState<StateDataType<{type: string, true: number, false: number}>>({ isLoading: true, data: [] });
    const [userQuiz, setUserQuiz] = useState<StateDataType<UserQuizType>>({ isLoading: true, data: [] });

    function mapBarData(userQuestData: {type: string, true: number, false: number}): ChartData<"bar", number[], string> {
        const labels = ['Total User']
        const data = {
            labels,
            datasets: [
              {
                label: 'Complete',
                data: [userQuestData.true],
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
              },
              {
                label: 'Incomplete',
                data: [userQuestData.false],
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
              },
            ],
          };
        return data;
    }
    function mapChartData(userFeedback: UserResponse[]): ChartData<"doughnut", number[], unknown> {
        let numData: number[] = [0, 0, 0, 0, 0];
        userFeedback.forEach(num => {
            switch(num.answer) {
                case '1': {
                    numData[0] += 1;
                    break;
                }
                case '2': {
                    numData[1] += 1;
                    break;
                }
                case '3': {
                    numData[2] += 1;
                    break;
                }
                case '4': {
                    numData[3] += 1;
                    break;
                }
                case '5': {
                    numData[4] += 1;
                    break;
                }
                default: {
                    break;
                }
            }
        });
        const data = {
            labels: CHART_SCALE_FEEDBACK,
            datasets: [
              {
                label: '# of Votes',
                data: numData,
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)'
                ],
                borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)'
                ],
                borderWidth: 1,
              },
            ],
          };
          return data;
    }
    function mapBarQuizData() {
        const lowest = userQuiz.data.reduce((quiz, loc) => quiz.result < loc.result ? quiz : loc);
        const highest = userQuiz.data.reduce((quiz, loc) => quiz.result > loc.result ? quiz : loc);
        const average: number = userQuiz.data.reduce((quiz, loc) => quiz + loc.result, 0) / userQuiz.data.length;
        const labels = ['Nilai Tes'];
        const data = {
            labels,
            datasets: [
                {
                    label: 'Terendah',
                    data: [lowest.result],
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                },
                {
                    label: 'Rata-rata',
                    data: [average],
                    backgroundColor: 'rgba(53, 162, 235, 0.5)',
                },
                {
                    label: 'Tertinggi',
                    data: [highest.result],
                    backgroundColor: 'rgba(53, 162, 235, 0.5)',
                },
            ],
        };
        return data;
    }

    const fetchFeedbackData = useCallback( async () => {
        const feedbackData = await GetAllFedbackResponse();
        setFeedback({ isLoading: false, data: feedbackData });
    }, []);

    const fetchUserQuestData = useCallback( async () => {
        const userQuestData = await GetFilterQuest();
        setUserQuest({isLoading: false, data: userQuestData});
    }, []);

    const fetchUserQuizData = useCallback (async () => {
        const userQuizData = await GetAllUserQuiz();
        setUserQuiz({isLoading: false, data: userQuizData});
    }, []);

    useEffect(() => {
        fetchFeedbackData();
        fetchUserQuestData();
        fetchUserQuizData();
    }, [fetchFeedbackData, fetchUserQuestData, fetchUserQuizData]);
    return (
        <div className='space-y-4 font-roboto '>
            <h1 className='text-2xl font-bold'>User Feedback</h1>
            <div className='flex flex-wrap'>
                {feedbacks.isLoading 
                    ? <div>loading..</div>
                    : userQuest.data.map((quest, i) => {
                        return (
                            <div key={i} className='space-y-5 m-4 w-[20.5rem]'>
                                <h1 className="text-lg font-bold capitalize">{quest.type} Linked List</h1>
                                <Bar data={mapBarData(quest)} />
                            </div>
                        );
                    })
                }
            </div>
            <div className='w-8/12'>
                {userQuiz.isLoading 
                    ? <div>loading..</div>
                    : <Bar data={mapBarQuizData()} />
                }
            </div>
            <div className="flex flex-wrap">
                {feedbacks.isLoading 
                    ? <div>loading..</div>
                    : feedbacks.data.map((feedback, i) => {
                        return (
                            <div key={i} className="w-[28rem] h-full m-4 space-y-5 p-4 border rounded-md">
                                <div className='space-y-1'>
                                    <p className="text-sm opacity-60">{`Feedback ${i + 1}`}</p>
                                    <h1 className="text-lg font-bold">{feedback.question}</h1>
                                    <h1 className="text-md text-cyan-dark">{feedback.user_feedbacks.length} Response</h1>
                                </div>
                                {feedback.type === 'scale'
                                    ? <div className="lg:w-10/12">
                                        <Doughnut
                                            data={mapChartData(feedback.user_feedbacks)}
                                        />
                                    </div>
                                    : <div className='overflow-auto h-64'>
                                        {feedback.user_feedbacks.map((userResponse, index) => {
                                            return (
                                                <p className='p-3 bg-slate-gray mb-3 rounded-md' key={index}>{userResponse.answer}</p>
                                            );
                                        })}
                                    </div>
                                }
                            </div>
                        );
                    })
                }
            </div>
        </div>
       
    );
}
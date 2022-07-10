// Lib
import 'chart.js/auto';
import { ChartData } from 'chart.js/auto';
import { useCallback, useEffect, useState } from "react";
import { Doughnut } from 'react-chartjs-2';

// External Function
import { GetAllFedbackResponse } from "../../api/feedbackRequest";
import { FeedbackResponse, StateDataType, UserResponse } from "../../type";


export default function AdminView() {
    const CHART_SCALE_FEEDBACK: number[] = [1, 2, 3, 4, 5];
    const [feedbacks, setFeedback] = useState<StateDataType<FeedbackResponse>>({ isLoading: true, data: []});

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

    const fetchFeedbackData = useCallback( async () => {
        const feedbackData = await GetAllFedbackResponse();
        setFeedback({ isLoading: false, data: feedbackData });
    }, []);

    useEffect(() => {
        fetchFeedbackData();
    }, [fetchFeedbackData]);
    return (
        <div className='space-y-4 font-roboto '>
            <h1 className='text-2xl font-bold'>User Feedback</h1>
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
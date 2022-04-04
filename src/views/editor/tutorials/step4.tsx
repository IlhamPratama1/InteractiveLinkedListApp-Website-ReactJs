import { MouseEventHandler } from "react";

type StepType = {
    NextFunction: MouseEventHandler,
    SkipFunction: MouseEventHandler
}

export default function Step4({ NextFunction, SkipFunction }: StepType) {

    return (
        <div className="tutorial flex">
            <div className="absolute z-30 bg-transparent w-[36rem] h-32 top-[30rem] left-[42rem] rounded-md hole"></div>
            <div className="absolute z-40 top-[30rem] right-52">
                <div className="p-4 space-y-2 w-100 bg-white rounded-md">
                    <div className="flex items-center space-x-2">
                        <div className='font-roboto'>
                            <h1 className='text-sm font-bold'>dasda</h1>
                            <p className='text-xs opacity-40'>asdasd</p>
                        </div>
                    </div>
                    <img alt="tutorial" src="/static/images/tutorials/1.PNG" />
                    <div className='font-roboto text-sm'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</div>
                    <div className="flex space-x-2">
                        <button onClick={NextFunction} className='focus:outline-none bg-cyan-light text-black rounded-md px-5 py-2 font-bold text-sm'>Next</button>
                        <button onClick={SkipFunction} className='focus:outline-none bg-transparent underline text-black rounded-md px-5 py-2 font-bold text-sm'>Skip</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
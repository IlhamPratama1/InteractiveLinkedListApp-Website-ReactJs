import { MouseEventHandler } from "react";

type StepType = {
    NextFunction: MouseEventHandler,
    SkipFunction: MouseEventHandler
}

export default function Step4({ NextFunction, SkipFunction }: StepType) {

    return (
        <div className="tutorial flex">
            <div className="absolute z-30 bg-transparent w-[42rem] h-48 top-[10rem] left-[22rem] rounded-md hole"></div>
            <div className="absolute z-40 top-[10rem] left-[66rem]">
                <div className="p-4 space-y-2 w-100 bg-white rounded-md">
                    <div className="flex items-center space-x-2">
                        <div className='font-roboto'>
                            <h1 className='text-sm font-bold'>Node Spawned</h1>
                            <p className='text-xs opacity-40'>step 4</p>
                        </div>
                    </div>
                    <img alt="tutorial" src="/static/images/tutorials/1.PNG" />
                    <div className='font-roboto text-sm'>After operation you've been created, node will be spawned in editor. Then you can fill form data by struct data you've been created in struct page before.</div>
                    <div className="flex space-x-2">
                        <button onClick={NextFunction} className='focus:outline-none bg-cyan-light text-black rounded-md px-5 py-2 font-bold text-sm'>Next</button>
                        <button onClick={SkipFunction} className='focus:outline-none bg-transparent underline text-black rounded-md px-5 py-2 font-bold text-sm'>Skip</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
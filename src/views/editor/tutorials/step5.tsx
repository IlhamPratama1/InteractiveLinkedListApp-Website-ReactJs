import { MouseEventHandler } from "react";

type StepType = {
    NextFunction: MouseEventHandler,
    SkipFunction: MouseEventHandler
}

export default function Step5({ NextFunction, SkipFunction }: StepType) {

    return (
        <div className="tutorial flex">
            <div className="absolute z-30 bg-transparent w-[28rem] h-40 bottom-6 right-6 rounded-md hole"></div>
            <div className="absolute z-40 bottom-6 right-[31rem]">
                <div className="p-4 space-y-2 w-100 bg-white rounded-md">
                    <div className="flex items-center space-x-2">
                        <div className='font-roboto'>
                            <h1 className='text-sm font-bold'>Source Code Generator</h1>
                            <p className='text-xs opacity-40'>step 5</p>
                        </div>
                    </div>
                    <img alt="tutorial" src="/static/images/tutorials/2.PNG" />
                    <div className='font-roboto text-sm'>Foreach operation we've been created, source code generator will generate c++ code based on node and operation before, and if you try to compile it. The data will be same as operation data you've been created before.</div>
                    <div className="flex space-x-2">
                        <button onClick={NextFunction} className='focus:outline-none bg-cyan-light text-black rounded-md px-5 py-2 font-bold text-sm'>Next</button>
                        <button onClick={SkipFunction} className='focus:outline-none bg-transparent underline text-black rounded-md px-5 py-2 font-bold text-sm'>Skip</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
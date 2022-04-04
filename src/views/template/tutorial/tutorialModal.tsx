import { MouseEventHandler } from "react";

type TutorialModalType = {
    title: string,
    subtitle: string,
    about: string,
    nextEvent: MouseEventHandler,
    skipEvent: MouseEventHandler
}

export default function TutorialModal({ title, subtitle, about, nextEvent, skipEvent }: TutorialModalType) {
    return (
        <div className="p-4 space-y-2 w-100 bg-white rounded-md">
            <div className="flex items-center space-x-2">
                <div className='font-roboto'>
                    <h1 className='text-sm font-bold'>{title}</h1>
                    <p className='text-xs opacity-40'>{subtitle}</p>
                </div>
            </div>
            <div className='font-roboto text-sm'>{about}</div>
            <div className="flex space-x-2">
                <button onClick={nextEvent} className='focus:outline-none bg-cyan-light text-black rounded-md px-5 py-2 font-bold text-sm'>Next</button>
                <button onClick={skipEvent} className='focus:outline-none bg-transparent underline text-black rounded-md px-5 py-2 font-bold text-sm'>Skip</button>
            </div>
        </div>
    );
}
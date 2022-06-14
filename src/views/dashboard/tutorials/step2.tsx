import { MouseEventHandler } from "react";
import TutorialModal from "../../template/tutorial/tutorialModal";

type StepType = {
    NextFunction: MouseEventHandler,
    SkipFunction: MouseEventHandler
}

export default function Step1({ NextFunction, SkipFunction }: StepType) {
    return (
        <div className="tutorial flex">
            <div className="absolute z-30 bg-transparent w-96 h-24 bottom-32 left-96 rounded-md hole"></div>
            <div className="absolute z-40 bottom-32 left-[50rem]">
                <TutorialModal 
                    title="Create New Project"
                    subtitle="step 2"
                    about="Click create to start creating new struct by linked list type you've been choose before."
                    nextEvent={NextFunction}
                    skipEvent={SkipFunction}
                />
            </div>
        </div>
    );
}
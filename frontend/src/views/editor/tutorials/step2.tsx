import { MouseEventHandler } from "react";
import TutorialModal from "../../template/tutorial/tutorialModal";

type StepType = {
    NextFunction: MouseEventHandler,
    SkipFunction: MouseEventHandler
}

export default function Step1({ NextFunction, SkipFunction }: StepType) {
    return (
        <div className="tutorial flex">
            <div className="absolute z-30 bg-transparent w-20 h-32 top-[17rem] left-6 rounded-md hole"></div>
            <div className="absolute z-40 top-[17rem] left-32">
                <TutorialModal 
                    title="Search or Delete Node"
                    subtitle="step 2"
                    about="To make Search or Delete operation. then fill form and submit to perform the operation."
                    nextEvent={NextFunction}
                    skipEvent={SkipFunction}
                />
            </div>
        </div>
    );
}
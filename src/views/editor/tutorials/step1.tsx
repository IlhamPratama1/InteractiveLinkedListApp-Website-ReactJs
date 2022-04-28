import { MouseEventHandler } from "react";
import TutorialModal from "../../template/tutorial/tutorialModal";

type StepType = {
    NextFunction: MouseEventHandler,
    SkipFunction: MouseEventHandler
}

export default function Step1({ NextFunction, SkipFunction }: StepType) {
    return (
        <div className="tutorial flex">
            <div className="absolute z-30 bg-transparent w-20 h-32 top-40 left-6 rounded-md hole"></div>
            <div className="absolute z-40 top-40 left-32">
                <TutorialModal 
                    title="Create New Operation"
                    subtitle="step 1"
                    about="This is editor page. in thi page you can make linked list operation. to add or insert node click add or insert node button"
                    nextEvent={NextFunction}
                    skipEvent={SkipFunction}
                />
            </div>
        </div>
    );
}
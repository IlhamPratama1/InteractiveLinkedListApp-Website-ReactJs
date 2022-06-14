import { MouseEventHandler } from "react";
import TutorialModal from "../../template/tutorial/tutorialModal";

type StepType = {
    NextFunction: MouseEventHandler,
    SkipFunction: MouseEventHandler
}

export default function Step3({ NextFunction, SkipFunction }: StepType) {
    return (
        <div className="tutorial flex">
            <div className="absolute z-30 bg-transparent w-100 h-96 bottom-16 right-[39.5rem] rounded-md hole"></div>
            <div className="absolute z-40 bottom-48 right-[10rem]">
                <TutorialModal 
                    title="Open New Project"
                    subtitle="Step 3"
                    about="Or if want to open your saved project before, click list of project below"
                    nextEvent={NextFunction}
                    skipEvent={SkipFunction}
                />
            </div>
        </div>
    );
}
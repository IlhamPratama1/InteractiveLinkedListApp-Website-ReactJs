import { MouseEventHandler } from "react";
import TutorialModal from "../../template/tutorial/tutorialModal";

type StepType = {
    NextFunction: MouseEventHandler,
    SkipFunction: MouseEventHandler
}

export default function Step1({ NextFunction, SkipFunction }: StepType) {
    return (
        <div className="tutorial flex">
            <div className="absolute z-30 bg-transparent w-[48rem] h-32 top-40 left-72 rounded-md hole"></div>
            <div className="absolute z-40 top-40 right-[25rem]">
                <TutorialModal 
                    title="Create New Struct"
                    subtitle="step 1"
                    about="In Struct Page, fill name of struct you want to create"
                    nextEvent={NextFunction}
                    skipEvent={SkipFunction}
                />
            </div>
        </div>
    );
}
import { MouseEventHandler } from "react";
import TutorialModal from "../../template/tutorial/tutorialModal";

type StepType = {
    NextFunction: MouseEventHandler,
    SkipFunction: MouseEventHandler
}

export default function Step1({ NextFunction, SkipFunction }: StepType) {
    return (
        <div className="tutorial flex">
            <div className="absolute z-30 bg-transparent w-96 h-80 bottom-48 left-96 rounded-md hole"></div>
            <div className="absolute z-40 bottom-48 left-[50rem]">
                <TutorialModal 
                    title="Create New Project"
                    subtitle="step 1"
                    about="This is dashboard page. if you want to create new project, select linked list project type you want to create, there are three types: Single linked list, Double linked list, Circular linked list. click to choose."
                    nextEvent={NextFunction}
                    skipEvent={SkipFunction}
                />
            </div>
        </div>
    );
}
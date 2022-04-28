import { MouseEventHandler } from "react";
import TutorialModal from "../../template/tutorial/tutorialModal";

type StepType = {
    NextFunction: MouseEventHandler,
    SkipFunction: MouseEventHandler
}

export default function Step3({ NextFunction, SkipFunction }: StepType) {

    return (
        <div className="tutorial flex">
            <div className="absolute z-30 bg-transparent w-20 h-32 top-[24rem] left-6 rounded-md hole"></div>
            <div className="absolute z-40 top-[24rem] left-32">
                <TutorialModal 
                    title="Clear Node or Operation"
                    subtitle="step 3"
                    about="If you want to delete all node or delete all operation. click button next to."
                    nextEvent={NextFunction}
                    skipEvent={SkipFunction}
                />
            </div>
        </div>
    );
}
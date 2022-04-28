// Lib
import { MouseEventHandler } from "react";
import { useSelector } from "react-redux";

// Redux Component
import { selectProjectType } from "../../../state/dispatch";
import TutorialModal from "../../template/tutorial/tutorialModal";

type StepType = {
    NextFunction: MouseEventHandler,
    SkipFunction: MouseEventHandler
}

export default function Step1({ NextFunction, SkipFunction }: StepType) {
    const projectType = useSelector(selectProjectType);

    return (
        <div className="tutorial flex">
            <div className={`absolute z-30 bg-transparent w-[48rem] h-28 ${projectType === 'double' ? 'bottom-[26.5rem]' : 'top-[23rem]'} left-72 rounded-md hole`}></div>
            <div className={`absolute z-40 ${projectType === 'double' ? 'bottom-[26.5rem]' : 'top-[23rem]'} right-[25rem]`}>
                <TutorialModal 
                    title="Fill The Struct"
                    subtitle="step 2"
                    about="Then fill variable form, you can change variable type and variable name."
                    nextEvent={NextFunction}
                    skipEvent={SkipFunction}
                />
            </div>
        </div>
    );
}
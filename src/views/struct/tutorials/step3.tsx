import { MouseEventHandler } from "react";
import { useSelector } from "react-redux";
import { selectProjectType } from "../../../state/dispatch";
import TutorialModal from "../../template/tutorial/tutorialModal";

type StepType = {
    NextFunction: MouseEventHandler,
    SkipFunction: MouseEventHandler
}

export default function Step3({ NextFunction, SkipFunction }: StepType) {
    const projectType = useSelector(selectProjectType);

    return (
        <div className="tutorial flex">
            <div className={`absolute z-30 bg-transparent w-80 h-20 ${projectType === 'double' ? 'bottom-[23rem]' : 'bottom-[29rem]'} right-[42.7rem] rounded-md hole`}></div>
            <div className={`absolute z-40 ${projectType === 'double' ? 'bottom-[23rem]' : 'bottom-[29rem]'} right-[13rem]`}>
                <TutorialModal 
                    title="Add New Variable"
                    subtitle="step 3"
                    about="you can add more variable by click 'add new data' or finish your struct by click submit"
                    nextEvent={NextFunction}
                    skipEvent={SkipFunction}
                />
            </div>
        </div>
    );
}
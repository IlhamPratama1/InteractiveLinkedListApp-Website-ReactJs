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
                    title="ASdasdsa"
                    subtitle="c++"
                    about="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
                    nextEvent={NextFunction}
                    skipEvent={SkipFunction}
                />
            </div>
        </div>
    );
}
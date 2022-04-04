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
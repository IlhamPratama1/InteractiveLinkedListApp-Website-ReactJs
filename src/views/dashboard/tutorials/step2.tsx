import { MouseEventHandler } from "react";
import TutorialModal from "../../template/tutorial/tutorialModal";

type StepType = {
    NextFunction: MouseEventHandler,
    SkipFunction: MouseEventHandler
}

export default function Step1({ NextFunction, SkipFunction }: StepType) {
    return (
        <div className="tutorial flex">
            <div className="absolute z-30 bg-transparent w-96 h-24 bottom-32 left-96 rounded-md hole"></div>
            <div className="absolute z-40 bottom-32 left-[50rem]">
                <TutorialModal 
                    title="Josjsos"
                    subtitle="c++"
                    about="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
                    nextEvent={NextFunction}
                    skipEvent={SkipFunction}
                />
            </div>
        </div>
    );
}
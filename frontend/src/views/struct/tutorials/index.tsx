// Lib
import { useState } from "react";
import Cookies from "universal-cookie";

// React Component
import Step1 from "./step1";
import Step2 from "./step2";
import Step3 from "./step3";

type TutorialType = {
    setFirstTime: Function
}

export default function TutorialView({ setFirstTime }: TutorialType) {

    // --- React state
    const [ index, setIndex ] = useState<number>(0);
    const TutorialComponent = [
        <Step1 NextFunction={NextStep} SkipFunction={SkipStep} />,
        <Step2 NextFunction={NextStep} SkipFunction={SkipStep} />,
        <Step3 NextFunction={NextStep} SkipFunction={SkipStep} />
        
    ];

    // Function
    function NextStep() {
        if (index < TutorialComponent.length - 1)
            setIndex(index + 1);
        else {
            SkipStep();
        }
    }

    function SkipStep() {
        setFirstTime(true);
        const cookies = new Cookies();
        cookies.set('secondTutorial', true, { path: '/' });
    }

    return(
        TutorialComponent[index]
    );
}
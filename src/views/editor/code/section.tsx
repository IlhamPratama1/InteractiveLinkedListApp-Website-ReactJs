// Lib
import { useSelector } from 'react-redux';

// Redux component
import { selectCode } from '../../../state/dispatch';

// Typing
type CodeSectionType = {
    setModalOpen: Function
}

export default function Section({ setModalOpen }: CodeSectionType) {
    // --- Redux State
    const { code } = useSelector(selectCode);

    // --- Func
    function OpenModal() { setModalOpen(true); }

    return(
        <div className="bg-yellow-main w-84 rounded-xl">
            <div onClick={OpenModal} className="cursor-pointer bg-orange-main flex items-center p-4 space-x-4 rounded-xl">
                <img className="w-8" alt="insert" src="/static/icons/coding.png" />
                <p className="font-bold text-xl font-source text-black">Source Code</p>
            </div>
            <div>
                {code.substring(0, 234)}
            </div>
        </div>
    );
}
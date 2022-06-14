// Lib
import { useSelector } from 'react-redux';
import { TerminalIcon } from '@heroicons/react/outline';
import SyntaxHighlighter from 'react-syntax-highlighter';

// Redux component
import { selectCode, selectProjectType } from '../../../state/dispatch';
import { CodeStateInterface } from '../../../interface';


// Typing
type CodeSectionType = {
    setModalOpen: Function
}

export default function Section({ setModalOpen }: CodeSectionType) {
    // --- Redux State
    const { code }: CodeStateInterface = useSelector(selectCode);
    const projectType: string = useSelector(selectProjectType);

    // --- Func
    function OpenModal() { setModalOpen(true); }
    
    function CheckProjectType() {
        switch (projectType) {
            case 'single':
                return 266;
            case 'double':
                return 293;
            case 'circular':
                return 289;
            default:
                return 250;
        }
    }

    return(
        <div className="bg-white drop-shadow-6xl rounded-md w-100 p-4 space-y-2">
            <div className="flex items-center space-x-2">
                <TerminalIcon className='w-10 h-10' />
                <div className='font-roboto'>
                    <h1 className='text-sm font-bold'>Source Code</h1>
                    <p className='text-xs opacity-40'>c++</p>
                </div>
            </div>
            <div className='font-roboto text-sm'>
                <SyntaxHighlighter language="cpp" customStyle={{ backgroundColor: "#FCFCFC" }}>
                    {code.substring(code.length - CheckProjectType(), code.length - 16)}
                </SyntaxHighlighter>
            </div>
            <button onClick={OpenModal} className='focus:outline-none bg-cyan-light text-black rounded-md px-5 py-2 font-bold text-sm'>Detail</button>
        </div>
    );
}
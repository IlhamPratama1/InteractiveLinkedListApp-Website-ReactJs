// Lib
import { useSelector } from 'react-redux';
import { TerminalIcon } from '@heroicons/react/outline';

// Redux component
import { selectCode } from '../../../state/dispatch';
import { CodeStateInterface } from '../../../interface';


// Typing
type CodeSectionType = {
    setModalOpen: Function
}

export default function Modal({ setModalOpen }: CodeSectionType) {
    // --- Redux state
    const { code }: CodeStateInterface = useSelector(selectCode);

    // --- Func
    function CloseModal() { setModalOpen(false); }
    function CopyCode() { navigator.clipboard.writeText(code); }

    return(
        <div className='font-roboto'>
            <div className="justify-center items-center flex overflow-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-173 h-138 mx-auto ">
                    <div className="relative flex flex-col w-full bg-white outline-none focus:outline-none p-6 rounded-md space-y-6">
                        <div className="flex items-center space-x-2">
                            <TerminalIcon className='w-14 h-14' />
                            <div className='font-roboto'>
                                <h1 className='text-lg font-bold'>Source Code</h1>
                                <p className='text-sm opacity-40'>c++</p>
                            </div>
                        </div>
                        <div className="overflow-auto h-96 text-sm pr-2">
                            {code}
                        </div>
                        <div className="flex items-center space-x-4">
                            <button className="bg-cyan-light text-blue-dark font-bold rounded-md text-sm px-5 py-2 focus:outline-none transition duration-300" onClick={CopyCode}>Copy</button>
                            <button className="bg-blue-dark text-cyan-light font-bold rounded-md text-sm px-5 py-2 focus:outline-none transition duration-300" onClick={CloseModal} >Close</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="opacity-20 fixed inset-0 z-40 bg-black"></div>
        </div>
    );
}
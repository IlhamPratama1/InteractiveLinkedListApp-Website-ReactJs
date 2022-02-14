// Lib
import { useSelector } from 'react-redux';

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
        <div>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        <div className="flex items-center p-6 rounded-t bg-orange-main space-x-4">
                            <img className="w-10" alt="insert" src="/static/icons/coding.png" />
                            <h3 className="text-2xl font-source font-bold">Source Code</h3>
                        </div>
                        <div className="overflow-auto h-96">
                            {code}
                        </div>
                        <div className="flex items-center justify-end p-4 bg-yellow-second rounded-b">
                            <button
                                className="text-blue-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={CopyCode} >
                                Copy
                            </button>
                            <button
                                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={CloseModal} >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </div>
    );
}
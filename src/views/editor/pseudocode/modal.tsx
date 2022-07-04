import { BookOpenIcon } from "@heroicons/react/outline";

// Typing
type PseudocodeSectionType = {
    setModalOpen: Function
}

export default function PseudocodeModal({ setModalOpen }: PseudocodeSectionType) {
    // --- Func
    function CloseModal() { setModalOpen(false); }

    return (
        <div className='font-roboto'>
            <div className="justify-center items-center flex overflow-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-[96rem] h-[60rem] mx-auto ">
                    <div className="relative flex flex-col w-full bg-white outline-none focus:outline-none p-6 rounded-md space-y-6">
                        <div className="flex items-center space-x-2">
                            <BookOpenIcon className='w-10 h-10' />
                            <div className='font-roboto'>
                                <h1 className='text-lg font-bold'>Penjelasan</h1>
                            </div>
                        </div>
                        <div className="overflow-auto h-[48.7rem] text-sm">
                            <h1 className="text-lg">
                                
                            </h1>
                        </div>
                        <div className="flex items-center justify-end space-x-4">
                            <button className="bg-blue-dark text-cyan-light font-bold rounded-md text-sm px-5 py-2 focus:outline-none transition duration-300" onClick={CloseModal} >Close</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="opacity-20 fixed inset-0 z-40 bg-black"></div>
        </div>
    );
}
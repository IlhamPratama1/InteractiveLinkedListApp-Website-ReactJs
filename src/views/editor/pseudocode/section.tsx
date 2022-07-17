// Lib
import { CodeIcon } from '@heroicons/react/outline';
import { useEffect, useRef, useState } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { useSelector } from 'react-redux';
import gsap from "gsap";

// Type
import { selectCode, selectProjectType } from '../../../state/dispatch';
import { addNewNode, deleteIndex, insertAfter, insertBefore, searchData } from '../../../code/codeOperation';

// Typing
type PseudocodeSectionType = {
    setModalOpen: Function
}

export default function PseudocodeSection({ setModalOpen }: PseudocodeSectionType) {
    // --- State
    const codeRef = useRef<HTMLDivElement>(null);
    const { lastOperation } = useSelector(selectCode);
    const [ codeOperation, setCodeOperation ] = useState<string>('');

    const projectType: string = useSelector(selectProjectType);

    // --- Func
    function OpenModal() { setModalOpen(true); }

    useEffect(() => {
        gsap.timeline()
        .from(codeRef.current, {
            startAt: {
                opacity: 0,
            },
            duration: 0
        })
        .to(codeRef.current, {
            delay: 0.25,
            opacity: 1,
            scale: 1,
            duration: 0.75,
            ease: "power1.inOut",
        });
    }, [codeOperation]);

    useEffect(() => {
        if (lastOperation === 'add') setCodeOperation(addNewNode(projectType));
        else if (lastOperation === 'before') setCodeOperation(insertBefore(projectType));
        else if (lastOperation === 'after') setCodeOperation(insertAfter(projectType));
        else if (lastOperation === 'delete') setCodeOperation(deleteIndex(projectType));
        else if (lastOperation.includes('search'))setCodeOperation(searchData(projectType));
    }, [lastOperation, projectType]);

    return (
        <div className="bg-white drop-shadow-6xl rounded-md w-[32rem] p-4 space-y-2">
            <div className="flex items-center space-x-2">
                <CodeIcon className='w-8 h-8' />
                <div className='font-roboto'>
                    <h1 className='text-sm font-bold'>Pseudocode</h1>
                </div>
            </div>
            <div ref={codeRef} className='font-roboto text-sm'>
                <SyntaxHighlighter language="javascript" customStyle={{ backgroundColor: "#FCFCFC" }}>
                    {codeOperation}
                </SyntaxHighlighter>
            </div>
            <button onClick={OpenModal} className='focus:outline-none bg-cyan-light text-black rounded-md px-5 py-2 font-bold text-sm'>Penjelasan</button>
        </div>
    );
}
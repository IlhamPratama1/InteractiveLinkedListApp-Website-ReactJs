// Lib
import { useState } from 'react';

// React component
import Section from './section';
import Modal from './modal';


export default function CodeEditor() {
    // --- State
    const [ modalOpen, setModalOpen ] = useState<boolean>(false);
    
    return(
        <div className="absolute z-20 right-8 bottom-8">
            <Section setModalOpen={setModalOpen} />
            {modalOpen ?
                <Modal setModalOpen={setModalOpen} /> 
                : null
            }
        </div>
    );
}
// Lib
import { useState } from 'react';

// React component
import Section from './section';
import Modal from './modal';

export default function CodeEditor() {
    // State
    const [ modalOpen, setModalOpen ] = useState<boolean>(false);
    
    return(
        <div className="absolute right-10 bottom-10">
            <Section setModalOpen={setModalOpen} />
            {modalOpen ?
                <Modal setModalOpen={setModalOpen} /> 
                : null
            }
        </div>
    );
}
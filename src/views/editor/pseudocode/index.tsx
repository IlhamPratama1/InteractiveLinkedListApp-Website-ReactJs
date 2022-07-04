// Lib
import { useState } from 'react';

// React component
import Section from './section';
import Modal from './modal';

export default function PseudocodeEditor() {
    const [ modalOpen, setModalOpen ] = useState<boolean>(false);

    return (
        <div className="absolute z-10 right-[31rem] bottom-8">
            <Section setModalOpen={setModalOpen} />
            {modalOpen ?
                <Modal setModalOpen={setModalOpen} /> 
                : null
            }
        </div>
    );
}
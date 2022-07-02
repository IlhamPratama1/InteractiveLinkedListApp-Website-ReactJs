// Lib
import { useState } from 'react';
import { ClipboardListIcon, BellIcon } from '@heroicons/react/outline';
import { PencilIcon, BadgeCheckIcon, InformationCircleIcon } from '@heroicons/react/solid';
import { useSelector } from 'react-redux';

// Redux Component
import { selectQuest, selectStruct } from '../../../state/dispatch';
import ProfileModal from './components/profileModal';
import QuestList from './components/questList';
import { QuestStateInterface } from '../../../interface';


export default function EditorNavbar() {
    // --- React State
    const [ modalOpen, setModalOpen ] = useState<number>(0);

    // --- Redux State
    const { structName } = useSelector(selectStruct);
    const quests: QuestStateInterface[] = useSelector(selectQuest);

    function SetModalOpen(index: number) {
        if (index === modalOpen) 
            setModalOpen(0);
        else setModalOpen(index);
    }
    
    return(
        <nav className='space-y-4 w-full mx-auto'>
            <div className="h-18 bg-white drop-shadow-3xl px-8 flex items-center justify-between">
                <div className='font-roboto'>
                    <div className='flex space-x-1'>
                        <h1 className='text-lg'>{structName}</h1>
                        <PencilIcon className='w-5 opacity-60' />
                    </div>
                    <div className='flex space-x-1'>
                        <BadgeCheckIcon className='w-4 text-cyan-dark' />
                        <p className='text-xs'>all changes saved</p>
                    </div>
                </div>
                <div className='flex space-x-5'>
                    <button onClick={() => SetModalOpen(3)} className='focus:outline-none w-8'><BellIcon className='hover:text-cyan-dark transition duration-200' /></button>
                    <button onClick={() => SetModalOpen(2)} className='focus:outline-none w-8'><ClipboardListIcon className='hover:text-cyan-dark transition duration-200' /></button>
                    <button onClick={() => SetModalOpen(1)} className='focus:outline-none w-10 h-10 bg-cyan-dark rounded-full'></button>
                </div>
            </div>
            {modalOpen === 1 && 
                <ProfileModal />                
            }
            {modalOpen === 2 && 
                /* --- User Modal --- */
                <div className='absolute z-10 w-82 h-96 bg-white drop-shadow-4xl absolute right-8 rounded-md font-roboto p-5 space-y-3'>
                    <h1 className='font-bold text-lg'>Quest</h1>
                    <div className='space-y-4 h-83 overflow-auto pr-3'>
                        {quests.map((quest, i) => {
                            return (
                                <QuestList 
                                    key={i}
                                    isComplete={quest.isComplete}
                                    detail={quest.quest.detail}
                                    type={quest.quest.type}
                                />
                            );
                        })}
                    </div>
                </div>
            }
            {modalOpen === 3 && 
                /* --- User Modal --- */
                <div className='absolute z-10 w-82 h-96 bg-white drop-shadow-4xl absolute right-8 rounded-md font-roboto p-5 space-y-3'>
                    <h1 className='font-bold text-lg'>Notification</h1>
                    <div className='h-82 overflow-auto space-y-3 pr-3'>
                        <div className='flex space-x-2'>
                            <div className='notif-icon'>
                                <InformationCircleIcon className='w-12 h-12 text-cyan-dark' />
                            </div>
                            <div className='notif-text'>
                                <h1 className='text-sm'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</h1>
                                <h1 className='text-xs opacity-40'>1 hour ago</h1>
                            </div>
                        </div>
                        <div className='flex space-x-2'>
                            <div className='notif-icon'>
                                <InformationCircleIcon className='w-12 h-12 text-cyan-dark' />
                            </div>
                            <div className='notif-text'>
                                <h1 className='text-sm'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</h1>
                                <h1 className='text-xs opacity-40'>1 hour ago</h1>
                            </div>
                        </div>
                        <div className='flex space-x-2'>
                            <div className='notif-icon'>
                                <InformationCircleIcon className='w-12 h-12 text-cyan-dark' />
                            </div>
                            <div className='notif-text'>
                                <h1 className='text-sm'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</h1>
                                <h1 className='text-xs opacity-40'>1 hour ago</h1>
                            </div>
                        </div>
                        <div className='flex space-x-2'>
                            <div className='notif-icon'>
                                <InformationCircleIcon className='w-12 h-12 text-cyan-dark' />
                            </div>
                            <div className='notif-text'>
                                <h1 className='text-sm'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</h1>
                                <h1 className='text-xs opacity-40'>1 hour ago</h1>
                            </div>
                        </div>
                        <div className='flex space-x-2'>
                            <div className='notif-icon'>
                                <InformationCircleIcon className='w-12 h-12 text-cyan-dark' />
                            </div>
                            <div className='notif-text'>
                                <h1 className='text-sm'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</h1>
                                <h1 className='text-xs opacity-40'>1 hour ago</h1>
                            </div>
                        </div>
                    </div>
                    <h1 className='text-sm text-cyan-dark underline'>Clear all notifications</h1>
                </div>
            }
        </nav>
    );
}
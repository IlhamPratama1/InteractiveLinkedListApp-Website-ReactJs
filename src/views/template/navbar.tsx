// Lib
import { useState } from 'react';
import { ClipboardListIcon, BellIcon } from '@heroicons/react/outline';
import { PencilIcon, BadgeCheckIcon, CheckCircleIcon, XCircleIcon, InformationCircleIcon } from '@heroicons/react/solid';

// Redux Component

// External Component


export default function Navbar() {
    // --- React State
    const [ modalOpen, setModalOpen ] = useState<number>(0);

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
                        <h1 className='text-lg'>StructName</h1>
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
                /* --- User Modal --- */
                <div className='absolute z-10 w-56 h-72 bg-white drop-shadow-4xl absolute right-8 rounded-md pt-5 space-y-3 text-center font-roboto'>
                    <div className='flex justify-center'><div className='bg-cyan-dark w-20 h-20 rounded-full'></div></div>
                    <h1 className='font-bold text-lg'>Ilham Pratama</h1>
                    <div className='space-y-1 text-xs'>
                        <h1 className='opacity-60'>pratamailham206@gmail.com</h1>
                        <h1 className='opacity-80 font-bold'>User</h1>
                    </div>
                    <div className='space-y-3'>
                        <div className='h-px w-full bg-blue-dark opacity-20'></div>
                        <h1 className='text-sm'>Profile</h1>
                        <div className='h-px w-full bg-blue-dark opacity-20'></div>
                        <h1 className='text-sm'>Sign Out</h1>
                    </div>
                </div>
            }
            {modalOpen === 2 && 
                /* --- User Modal --- */
                <div className='absolute z-10 w-82 h-96 bg-white drop-shadow-4xl absolute right-8 rounded-md font-roboto p-5 space-y-3'>
                    <h1 className='font-bold text-lg'>Quest</h1>
                    <div className='space-y-4 h-83 overflow-auto pr-3'>
                        <div className='flex items-center space-x-2'>
                            <CheckCircleIcon className='w-11 h-11 text-cyan-dark' />
                            <div className=''>
                                <h1 className='text-sm'>Add New Node in Single Linked List</h1>
                                <h1 className='text-xs opacity-40'>Single Linked List</h1>
                            </div>
                        </div>
                        <div className='flex items-center space-x-2'>
                            <XCircleIcon className='w-11 h-11 text-red' />
                            <div className=''>
                                <h1 className='text-sm'>Add New Node in Single Linked List</h1>
                                <h1 className='text-xs opacity-40'>Single Linked List</h1>
                            </div>
                        </div>
                        <div className='flex items-center space-x-2'>
                            <CheckCircleIcon className='w-11 h-11 text-cyan-dark' />
                            <div className=''>
                                <h1 className='text-sm'>Add New Node in Single Linked List</h1>
                                <h1 className='text-xs opacity-40'>Single Linked List</h1>
                            </div>
                        </div>
                        <div className='flex items-center space-x-2'>
                            <XCircleIcon className='w-11 h-11 text-red' />
                            <div className=''>
                                <h1 className='text-sm'>Add New Node in Single Linked List</h1>
                                <h1 className='text-xs opacity-40'>Single Linked List</h1>
                            </div>
                        </div>
                        <div className='flex items-center space-x-2'>
                            <CheckCircleIcon className='w-11 h-11 text-cyan-dark' />
                            <div className=''>
                                <h1 className='text-sm'>Add New Node in Single Linked List</h1>
                                <h1 className='text-xs opacity-40'>Single Linked List</h1>
                            </div>
                        </div>
                        <div className='flex items-center space-x-2'>
                            <XCircleIcon className='w-11 h-11 text-red' />
                            <div className=''>
                                <h1 className='text-sm'>Add New Node in Single Linked List</h1>
                                <h1 className='text-xs opacity-40'>Single Linked List</h1>
                            </div>
                        </div>
                        <div className='flex items-center space-x-2'>
                            <XCircleIcon className='w-11 h-11 text-red' />
                            <div className=''>
                                <h1 className='text-sm'>Add New Node in Single Linked List</h1>
                                <h1 className='text-xs opacity-40'>Single Linked List</h1>
                            </div>
                        </div>
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
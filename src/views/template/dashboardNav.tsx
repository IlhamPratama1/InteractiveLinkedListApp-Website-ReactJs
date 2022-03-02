// Lib
import { ReactNode } from 'react';
import { OfficeBuildingIcon, TemplateIcon, SaveIcon, ClipboardListIcon, UserCircleIcon } from '@heroicons/react/outline';

type DashboardNavType = {
    children: ReactNode
}

export default function DashboardNav({ children }: DashboardNavType) {
    return(
        <div className='h-screen mx-auto p-10 sm:p-12 md:p-16'>
            <div className='h-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7'>
                {/* --- Navbar --- */}
                <div className='h-full hidden md:grid grid-cols-1 gap-4 content-between'>
                    <img alt="logo" src="/static/icons/logo.svg" />
                    <div className='space-y-10 font-roboto'>
                        <div className=' cursor-pointer flex space-x-4 items-center'>
                            <OfficeBuildingIcon className='w-7' />
                            <h1 className='text-lg font-bold'>Project</h1>
                        </div>
                        <div className='cursor-pointer flex space-x-4 items-center opacity-40 hover:opacity-60'>
                            <TemplateIcon className='w-7' />
                            <h1 className='text-lg font-bold'>Example</h1>
                        </div>
                        <div className='cursor-pointer flex space-x-4 items-center opacity-40 hover:opacity-60'>
                            <SaveIcon className='w-7' />
                            <h1 className='text-lg font-bold'>Saved</h1>
                        </div>
                        <div className='cursor-pointer flex space-x-4 items-center opacity-40 hover:opacity-60'>
                            <ClipboardListIcon className='w-7' />
                            <h1 className='text-lg font-bold'>Quest</h1>
                        </div>
                        <div className='cursor-pointer flex space-x-4 items-center opacity-40 hover:opacity-60'>
                            <UserCircleIcon className='w-7' />
                            <h1 className='text-lg font-bold'>Profile</h1>
                        </div>
                    </div>
                    <div className='flex space-x-3 items-center'>
                        <div className='w-14 h-14 rounded-full bg-cyan-dark'></div>
                        <div className='font-roboto'>
                            <h1 className='font-bold text-lg'>Ilham Pratama</h1>
                            <p className='font-bold text-lg opacity-40'>User</p>
                        </div>
                    </div>
                </div>
                <div className='h-full md:overflow-auto md:col-span-2 lg:col-span-4 xl:col-span-6'>
                    {children}
                </div>
            </div>
        </div>
    );
}
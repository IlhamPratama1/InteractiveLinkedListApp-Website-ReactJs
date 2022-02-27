// Lib
import React, { ReactNode } from 'react';

type DashboardNavType = {
    children: ReactNode
}

export default function DashboardNav({ children }: DashboardNavType) {
    return(
        <div className='h-screen mx-auto p-10 sm:p-12 md:p-16'>
            <div className='h-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7'>
                {/* --- Navbar --- */}
                <div className='h-full hidden md:grid grid-cols-1 gap-4 content-between'>
                    <img alt="logo" src="/static/new_icon/logo.svg" />
                    <div className='space-y-10 font-roboto'>
                        <div className='flex space-x-4 items-center'>
                            <img className='w-7' src='/static/new_icon/project.png' alt='project' />
                            <h1 className='text-lg font-bold'>Project</h1>
                        </div>
                        <div className='flex space-x-4 items-center opacity-40'>
                            <img className='w-7' src='/static/new_icon/rocket.png' alt='rocket' />
                            <h1 className='text-lg font-bold'>Example</h1>
                        </div>
                        <div className='flex space-x-4 items-center opacity-40'>
                            <img className='w-7' src='/static/new_icon/layers.png' alt='layers' />
                            <h1 className='text-lg font-bold'>Saved</h1>
                        </div>
                        <div className='flex space-x-4 items-center opacity-40'>
                            <img className='w-7' src='/static/new_icon/quest.png' alt='quest' />
                            <h1 className='text-lg font-bold'>Quest</h1>
                        </div>
                        <div className='flex space-x-4 items-center opacity-40'>
                            <img className='w-7' src='/static/new_icon/user.png' alt='user' />
                            <h1 className='text-lg font-bold'>Profile</h1>
                        </div>
                    </div>
                    <div className='flex space-x-3'>
                        <div className='w-14 h-14 rounded-full bg-cyan-dark'></div>
                        <div className='font-roboto'>
                            <h1 className='font-bold text-lg'>Ilham Pratama</h1>
                            <p className='font-bold text-lg opacity-40'>User</p>
                        </div>
                    </div>
                </div>
                <div className='md:col-span-2 lg:col-span-4 xl:col-span-6'>
                    {children}
                </div>
            </div>
        </div>
    );
}
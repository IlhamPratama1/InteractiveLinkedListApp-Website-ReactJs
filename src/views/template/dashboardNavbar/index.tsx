// Lib
import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    OfficeBuildingIcon, SaveIcon, ClipboardListIcon, 
    UserCircleIcon, IdentificationIcon, AcademicCapIcon
} from '@heroicons/react/outline';
import { Link, useLocation } from 'react-router-dom';

// Axios
import axiosInstance from '../../../axios';

// Redux Component
import { useHookDispatch } from '../../../state/dispatch';

// Type
type DashboardNavType = {
    children: ReactNode
}

type LinkRefType = {
    pathname: string,
    children: ReactNode
}

export default function DashboardNavbar({ children }: DashboardNavType) {
    // --- Lib
    const location = useLocation();
    const navigate = useNavigate();
    const { LogoutUser } = useHookDispatch();
   
    // --- OnSubmit
    function SignOut() {
        localStorage.removeItem('access_token');
		axiosInstance.defaults.headers.common['x-access-token'] = false;
        LogoutUser();
        navigate('/login/');
    }

    // --- Render Component
    function DashboardMenu(props: LinkRefType) {
        if(location.pathname.includes(props.pathname)){
            return <Link to={`/dashboard/${props.pathname}`} className='cursor-pointer flex space-x-4 items-center'>{props.children}</Link>
        } else {
            return <Link to={`/dashboard/${props.pathname}`} className='cursor-pointer flex space-x-4 items-center opacity-40 hover:opacity-60'>{props.children}</Link>
        }
    }
    return(
        <div className='h-screen mx-auto p-10 sm:p-12 md:p-16'>
            <div className='h-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7'>
                {/* --- Navbar --- */}
                <div className='h-full hidden md:grid grid-cols-1 gap-4 content-between'>
                    <img alt="logo" src="/static/icons/logo.svg" />
                    <div className='space-y-10 font-roboto'>
                        <DashboardMenu pathname='project'>
                            <OfficeBuildingIcon className='w-7' />
                            <h1 className='text-lg font-bold'>Project</h1>
                        </DashboardMenu>
                        <DashboardMenu pathname='saved'>
                            <SaveIcon className='w-7' />
                            <h1 className='text-lg font-bold'>Saved</h1>
                        </DashboardMenu>
                        <DashboardMenu pathname='quest'>
                            <ClipboardListIcon className='w-7' />
                            <h1 className='text-lg font-bold'>Quest</h1>
                        </DashboardMenu>
                        <DashboardMenu pathname='quiz'>
                            <AcademicCapIcon className='w-7' />
                            <h1 className='text-lg font-bold'>Quiz</h1>
                        </DashboardMenu>
                        <DashboardMenu pathname='profile'>
                            <UserCircleIcon className='w-7' />
                            <h1 className='text-lg font-bold'>Profile</h1>
                        </DashboardMenu>
                        <DashboardMenu pathname='feedback'>
                            <IdentificationIcon className='w-7' />
                            <h1 className='text-lg font-bold'>Feedback</h1>
                        </DashboardMenu>
                    </div>
                    <div className='flex space-x-3 items-center'>
                        <div className='w-14 h-14 rounded-full bg-cyan-dark'></div>
                        <div className='font-roboto'>
                            <h1 className='font-bold text-lg'>User</h1>
                            <button onClick={SignOut} className='focus:outline-none font-bold text-md opacity-40 hover:underline transition duration-300'>Sign Out</button>
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
// Lib
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../../axios";

// Redux Component
import { selectProfile, useHookDispatch } from "../../../../state/dispatch";


export default function ProfileModal() {
    // --- Lib
    let navigate = useNavigate();

    // --- Redux State
    const profile = useSelector(selectProfile);
    const { LogoutUser } = useHookDispatch();

    // --- OnSubmit
    function SignOut() {
        localStorage.removeItem('access_token');
		axiosInstance.defaults.headers.common['x-access-token'] = false;
        LogoutUser();
    };

    function NavigateProfile() { navigate('/dashboard/profile'); };

    return (
        <div className='absolute z-10 w-56 h-72 bg-white drop-shadow-4xl absolute right-8 rounded-md pt-5 space-y-3 text-center font-roboto'>
            <div className='flex justify-center'><div className='bg-cyan-dark w-20 h-20 rounded-full'></div></div>
            <h1 className='font-bold text-lg'>{profile.username}</h1>
            <div className='space-y-1 text-xs'>
                <h1 className='opacity-60'>{profile.email}</h1>
                <h1 className='opacity-80 font-bold'>User</h1>
            </div>
            <div className='space-y-3'>
                <div className='h-px w-full bg-blue-dark opacity-20'></div>
                <button onClick={NavigateProfile} className='focus:outline-none text-sm'>Profile</button>
                <div className='h-px w-full bg-blue-dark opacity-20'></div>
                <button onClick={SignOut} className='focus:outline-none text-sm'>Sign Out</button>
            </div>
        </div>
    );
}
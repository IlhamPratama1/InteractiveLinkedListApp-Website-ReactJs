import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";

import { State } from '../../state';
import { useHookDispatch } from '../../state/dispatch';
import { UserStateInterface } from '../../interface';

import axiosInstance from "../../axios";


export default function Navbar() {
    // --- route
    let navigate = useNavigate();

    // --- redux
    const auth: UserStateInterface = useSelector((state: State) => state.auth);
    const { LogoutUser } = useHookDispatch();

    // --- Func
    function SignOut() {
        localStorage.removeItem('access_token');
		axiosInstance.defaults.headers.common['x-access-token'] = false;
        LogoutUser();
        navigate('/login');
    }

    return(
        <nav className="max-w-full mx-auto">
            <div className="py-8 px-8 lg:px-24">
                <div className="flex justify-between">
                    <div className="flex space-x-4">
                        <a href="/" className="font-playfair flex items-center px-2 text-gray-700 font-bold hover:text-black-main duration-300">My B Log-</a>
                    </div>
                    { auth.token ? 
                    <button onClick={SignOut} className="text-xs font-bold font-playfair py-3 px-7 bg-yellow-main hover:bg-yellow-second text-white-main hover:text-black-main transition duration-300">Sign Out</button> 
                    :
                    <div className="flex items-center space-x-4">
                        <Link to="/register" className="text-xs font-bold font-playfair py-3 px-7 bg-yellow-main hover:bg-yellow-second text-white-main hover:text-black-main transition duration-300">Register</Link>
                        <Link to="/login" className="text-xs font-bold font-playfair py-3 px-7 text-yellow-main border border-yellow hover:text-black-main transition duration-300">Login</Link>
                    </div>
                    }
                </div>
            </div>                
        </nav>
    );
}
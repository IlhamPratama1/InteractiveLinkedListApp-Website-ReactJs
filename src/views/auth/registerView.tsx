// Lib
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';

// Redux component
import { selectAuth, useHookDispatch } from '../../state/dispatch';
import { UserStateInterface, ErrorMessageInterface } from '../../interface';
import { FormDataType, ErrorMessageType } from '../../type';

// External function
import { RegisterValidation } from '../../validation/registerValidation';
import { LoginUserAuth } from '../../authentication/login';
import { RegisterUserAuth } from '../../authentication/register';
import getGoogleOAuthURL from '../../utils/getGoogleUrl';


export default function RegisterView() {
    // --- Router
    let navigate = useNavigate();

    // --- Redux State
    const auth: UserStateInterface = useSelector(selectAuth);
    const { LoginUser } = useHookDispatch();

    // --- State
    const [ error, setError ] = useState<ErrorMessageType>({});
    const [ loadingSubmit, setLoadingSubmit ] = useState<boolean>(false);
    const [ formData, setFormData ] = useState<FormDataType>({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    // --- OnChange
    const handleChange = (prop: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [prop]: event.target.value });
    };
    
    // --- Func
    function FormSuccess() {
        LoginUser(localStorage.getItem('access_token'));
        setLoadingSubmit(false);
    }

    function FormError(errors: ErrorMessageInterface) {
        setLoadingSubmit(false);
        setError(errors);
    }

    // --- OnSubmit
    async function HandleSubmit(event: React.MouseEvent) {
        event.preventDefault();
        setLoadingSubmit(true);
        let isValidate = await RegisterValidation(formData, FormError);
        if (isValidate) {
            RegisterUserAuth(formData, LoginUserAuth, FormError, FormSuccess);
        } else {
            console.log("Invalid Form Data");
        }
    };

    useEffect(() => {
        if (auth.token) navigate('/dashboard');
    }, [auth.token, navigate]);

    return(
        <div className='h-screen mx-auto'>
            <div className='h-full grid grid-cols-1 lg:grid-cols-2'>
                <div className='h-full bg-green-light hidden lg:flex justify-center items-center'>
                    <img alt="home" src="/static/illustrations/register.svg" />
                </div>
                <div className='h-full flex items-center'>
                    <div className='w-full px-14 md:px-16 lg:px-20 space-y-12'>

                        {/* --- Header --- */}
                        <div className='flex space-x-4'>
                            <h1 className='font-roboto text-4xl font-bold'>Register</h1>
                            <p className='flex items-end font-roboto text-2xl'>or</p>
                            <Link to={'/login'} className='font-roboto text-4xl' style={{
                                    'textDecoration': 'underline',
                                    'textDecorationColor': '#6FFFE9',                            
                                }}>Login</Link>
                        </div>

                        {/* --- Form --- */}
                        <div>
                            <form className="space-y-6 w-full">
                                {/* --- Username --- */}
                                <div className="space-y-3">
                                    <label className="font-roboto text-lg">Username</label>
                                    <input onChange={handleChange('username')} placeholder="Enter your username" className="focus:outline-none focus:border-cyan-dark p-4 w-full h-13 border rounded-md"></input>
                                    <br />
                                    <span style={{ color: "red" }}>{error["username"]}</span>
                                </div>

                                {/* --- Email --- */}
                                <div className="space-y-3">
                                    <label className="font-roboto text-lg">Email</label>
                                    <input onChange={handleChange('email')} placeholder="Enter your email" className="focus:outline-none focus:border-cyan-dark p-4 w-full h-13 border rounded-md"></input>
                                    <br />
                                    <span style={{ color: "red" }}>{error["email"]}</span>
                                </div>

                                {/* --- Password --- */}
                                <div className="space-y-3">
                                    <label className="font-roboto text-lg">Password</label>
                                    <input type="password" required onChange={handleChange('password')}  placeholder="Enter your password" className="focus:outline-none focus:border-cyan-dark p-4 w-full h-13 border rounded-md"></input>
                                    <br />
                                    <span style={{ color: "red" }}>{error["password"]}</span>
                                </div>

                                {/* --- Confirm --- */}
                                <div className="space-y-3">
                                    <label className="font-roboto text-lg">Confirm Password</label>
                                    <input type="password" required onChange={handleChange('confirmPassword')}  placeholder="Retype your password" className="focus:outline-none focus:border-cyan-dark p-4 w-full h-13 border rounded-md"></input>
                                    <br />
                                    <span style={{ color: "red" }}>{error["confirmPassword"]}</span>
                                    <br />
                                    <span style={{ color: "red" }}>{error["match"]}</span>
                                </div>

                                {/* --- Forget Password --- */}
                                <Link to={'/register'} className='font-roboto text-sm' style={{
                                    'textDecoration': 'underline',
                                    'textDecorationColor': '#5BC0BE',
                                }}>Forget Password</Link>
                                

                                {/* --- Submit Button --- */}
                                <div className="flex items-center space-x-3">
                                    <button onClick={event => HandleSubmit(event)} className="focus:outline-none text-md font-bold font-roboto py-3 px-10 bg-cyan-dark hover:bg-cyan-light text-white hover:text-black transition duration-300 rounded-md">Sign In</button>
                                        {loadingSubmit && <svg className="animate-spin bg-black h-5 w-5 mr-3" viewBox="0 0 24 24"></svg> }
                                </div>
                                <br />

                                {/* --- Error Message --- */}
                                <span style={{ color: "red" }}>{error["404"]}</span>
                            </form>
                            
                            <a href={getGoogleOAuthURL()} className="border-cyan-dark border rounded-md px-4 py-3 flex items-center space-x-2 w-56">
                                <img className='w-8 h-8' alt="home" src="/static/icons/google.png" />
                                <h1 className="font-roboto text-md">Sign Up with Google</h1>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
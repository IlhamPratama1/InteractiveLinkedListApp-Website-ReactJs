import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";

import { State } from '../../state';
import { useHookDispatch } from '../../state/dispatch';

import { UserStateInterface, ErrorMessageInterface } from '../../interface';
import { FormDataType, ErrorMessageType } from '../../type';

import { RegisterValidation } from '../../validation/registerValidation';
import { LoginUserAuth } from '../../authentication/login';
import { RegisterUserAuth } from '../../authentication/register';


export default function RegisterView() {
    // Router
    let navigate = useNavigate();
    
    // Redux
    const auth: UserStateInterface = useSelector((state: State) => state.auth);
    const { LoginUser } = useHookDispatch();

    // State
    const [ error, setError ] = useState<ErrorMessageType>({});
    const [ loadingSubmit, setLoadingSubmit ] = useState<boolean>(false);
    const [ formData, setFormData ] = useState<FormDataType>({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    // OnChange
    const handleChange = (prop: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [prop]: event.target.value });
    };
    
    function FormSuccess() {
        LoginUser(localStorage.getItem('access_token'));
        setLoadingSubmit(false);
    }

    function FormError(errors: ErrorMessageInterface) {
        setLoadingSubmit(false);
        setError(errors);
    }

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
        <div className="container mx-auto px-12 md:px-24">
            <div className="grid lg:grid-cols-2 md:grid-cols-1">
                <div className="text-right">
                    <img alt="hero" className="w-96" src="/static/images/auth.jpg" />
                </div>
                <div className="space-y-2 h-full flex items-center">
                    <div className="space-y-8 w-full">
                        <div className="flex space-x-4">
                            <h1 className="font-playfair text-4xl font-bold">Register</h1>
                            <p className="font-playfair text-lg self-center">or</p>
                            <h1 className="underline font-playfair text-4xl">Login</h1>
                        </div>
                        <div className="flex items-center">
                            <form className="space-y-2 w-full">
                                <div className="space-y-2">
                                    <label className="font-source text-lg">Username</label>
                                    <input onChange={handleChange('username')} className="focus:outline-none focus:border-yellow-main p-4 w-full h-12 border"></input>
                                    <br />
                                    <span style={{ color: "red" }}>{error["username"]}</span>
                                </div>
                                <div className="space-y-2">
                                    <label className="font-source text-lg">Email</label>
                                    <input onChange={handleChange('email')} className="focus:outline-none focus:border-yellow-main p-4 w-full h-12 border"></input>
                                    <br />
                                    <span style={{ color: "red" }}>{error["email"]}</span>
                                </div>
                                <div className="space-y-2">
                                    <label className="font-source text-lg">Password</label>
                                    <input type="password" required onChange={handleChange('password')}  className="focus:outline-none focus:border-yellow-main p-4 w-full h-12 border"></input>
                                    <br />
                                    <span style={{ color: "red" }}>{error["password"]}</span>
                                </div>
                                <div className="space-y-2">
                                    <label className="font-source text-lg">Retype Password</label>
                                    <input type="password" required onChange={handleChange('confirmPassword')}  className="focus:outline-none focus:border-yellow-main p-4 w-full h-12 border"></input>
                                    <br />
                                    <span style={{ color: "red" }}>{error["confirmPassword"]}</span>
                                    <br />
                                    <span style={{ color: "red" }}>{error["match"]}</span>
                                </div>
                                <span style={{ color: "red" }}>{error["404"]}</span>
                                <div className="flex items-center space-x-3">
                                    <button onClick={event => HandleSubmit(event)} className="text-xs font-bold font-playfair py-3 px-7 bg-yellow-main hover:bg-yellow-second text-white-main hover:text-black-main transition duration-300">Submit</button>
                                    {loadingSubmit && <svg className="animate-spin bg-black h-5 w-5 mr-3" viewBox="0 0 24 24"></svg> }
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
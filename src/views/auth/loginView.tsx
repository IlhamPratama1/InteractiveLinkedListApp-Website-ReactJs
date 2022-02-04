import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";

import { selectAuth, useHookDispatch } from '../../state/dispatch';

import { UserStateInterface, ErrorMessageInterface } from '../../interface';
import { FormDataType, ErrorMessageType } from '../../type';

import { LoginValidation } from '../../validation/loginValidation';
import { LoginUserAuth } from '../../authentication/login';


export default function LoginView() {
    // Router
    let navigate = useNavigate();

    // Redux
    const auth: UserStateInterface = useSelector(selectAuth);
    const { LoginUser } = useHookDispatch();

    // State
    const [ error, setError ] = useState<ErrorMessageType>({});
    const [ formData, setFormData ] = useState<FormDataType>({ email: "", password: "" });
    const [ loadingSubmit, setLoadingSubmit ] = useState<boolean>(false);

    // OnChange
    const handleChange = (prop: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [prop]: event.target.value });
    };

    function FormSuccess() {
        LoginUser(localStorage.getItem('access_token'));
        setLoadingSubmit(false);
        navigate('/dashboard');
    }

    function FormError(errors: ErrorMessageInterface) {
        setLoadingSubmit(false);
        setError(errors);
    }

    async function HandleSubmit(event: React.MouseEvent) {
        event.preventDefault();
        setLoadingSubmit(true);
        let isValidate = await LoginValidation(formData, FormError);
        if (isValidate) {
            LoginUserAuth(formData, FormSuccess, FormError);
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
                <div className="flex items-center">
                    <div className="space-y-8 w-full">
                        <div className="flex space-x-4">
                            <h1 className="font-playfair text-4xl font-bold">Login</h1>
                            <p className="font-playfair text-lg self-center">or</p>
                            <h1 className="underline font-playfair text-4xl">Register</h1>
                        </div>
                        <form className="space-y-2">
                            <div className="space-y-2">
                                <label className="font-source text-lg">Email</label>
                                <input onChange={handleChange('email')} className="focus:outline-none focus:border-yellow-main p-4 w-full h-12 border"></input>
                                <br />
                                <span style={{ color: "red" }}>{error["email"]}</span>
                            </div>
                            <div className="space-y-2">
                                <label className="font-source text-lg">Password</label>
                                <input type="password" required onChange={handleChange('password')} className="focus:outline-none focus:border-yellow-main p-4 w-full h-12 border"></input>
                                <br />
                                <span style={{ color: "red" }}>{error["password"]}</span>
                            </div>
                            <span style={{ color: "red" }}>{error["404"]}</span>
                            <br />
                            <div className="flex items-center space-x-3">
                                <button onClick={(event) => HandleSubmit(event)} className="text-xs font-bold font-playfair py-3 px-7 bg-yellow-main hover:bg-yellow-second text-white-main hover:text-black-main transition duration-300">Login</button>
                                {loadingSubmit && <svg className="animate-spin bg-black h-5 w-5 mr-3" viewBox="0 0 24 24"></svg> }
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
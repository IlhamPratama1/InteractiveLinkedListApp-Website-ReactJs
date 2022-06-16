import { Link } from "react-router-dom";


export default function HeroSection() {
    return(
        <div className="h-screen mx-auto p-10 sm:p-12 md:p-16">
            <div className="h-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-4">
                <div className="h-full">
                    <img alt="logo" src="/static/icons/logo.svg" />
                    <div className="h-full flex justify-center items-center">
                        <img alt="home" src="/static/illustrations/home.svg" />
                    </div>
                </div>
                <div className="h-full flex items-center p-8 sm:p-12 md:p-20">
                    <div className="space-y-8 lg:space-y-12 font-roboto">
                        <h1 className="font-bold text-4xl md:text-4xl lg:text-5xl xl:text-7xl">Learn Linked-List with Interactive Way</h1>
                        <p className="text-md md:text-md lg:text-lg xl:text-xl">Web-based learning media, with interesting interactions where users can explore by creating linked-list, adding, searching, deleting node through the tools contained in the application. After the user performs the operation on the linked list, the source code will generate as a reference for how the user can implement the linked list that they created in their respective programs.</p>
                        <div className="flex space-x-4 lg:space-x-8">
                            <Link to={'/login'} className="rounded-md px-10 py-3 bg-cyan-light hover:bg-cyan-dark text-blue-dark font-bold text-sm md:text-md lg:text-lg transition duration-500">Login</Link>
                            <Link to={'/dashboard'} className="rounded-md px-10 py-3 bg-blue-dark hover:text-cyan-dark text-cyan-light font-bold text-sm md:text-md lg:text-lg transition duration-500">Try Now</Link>
                        </div>
                    </div>
                </div>
            </div>
            <h1 className="text-center font-roboto text-md">Copyright © 2022 Ilham Pratama ®</h1>
        </div>
    );
}
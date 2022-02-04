import { Link } from "react-router-dom";

export default function HeroSection() {
    return(
        <div className="container mx-auto px-12 md:px-24">
            <div className="mt-10 grid gap-x-4 lg:grid-cols-2 md:grid-cols-1">
                <div className="flex items-center">
                    <div className="pl-16 space-y-6 pr-8">
                        <h1 className="font-playfair lg:text-4xl font-bold">
                        Learn Linked-List with Interactive Way
                        </h1>
                        <p className="font-source text-lg">{process.env.REACT_APP_HASH_ID}Web-based learning media, with interesting interactions where users can explore by creating linked-list, adding, searching, deleting node through the tools contained in the application. After the user performs the operation on the linked list, the source code will generate as a reference for how the user can implement the linked list that they created in their respective programs.</p>
                        <div className="flex items-center space-x-2">
                            <Link to="/register" className="text-xs font-bold font-playfair py-3 px-7 bg-orange-main hover:bg-yellow-second text-white-main hover:text-black-main transition duration-300">Sign Up</Link>
                            <Link to="/dashboard" className="text-xs font-bold font-playfair py-3 px-7 text-orange-main border border-orange-main hover:bg-yellow-second hover:text-black-main transition duration-300">Try Now</Link>
                        </div>
                    </div>                    
                </div>
                <div className="text-right">
                    <img alt="hero" className="w-120" src="/static/images/hero.jpg" />
                </div>
            </div>
        </div>
    );
}
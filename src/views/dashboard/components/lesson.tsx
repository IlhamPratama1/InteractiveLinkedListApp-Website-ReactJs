import { SwitchHorizontalIcon, LinkIcon, RefreshIcon, CollectionIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";

export default function Lesson({ path, name, subName, type }: { path:string, name: string, subName: string, type: string }) {
    // --- Render Component
    function SelectedColor() {
        switch (type) {
            case 'struct':
                return 'bg-green-dark';
            case 'single':
                return 'bg-blue-light';
            case 'double':
                return 'bg-cyan-dark';
            case 'circular':
                return 'bg-cyan-light';
        }
    }

    function SelectedImage() {
        switch (type) {
            case 'struct':
                return <CollectionIcon className="text-white" />
            case 'single':
                return <LinkIcon className="text-white" />
            case 'double':
                return <SwitchHorizontalIcon className="text-white" />
            case 'circular':
                return <RefreshIcon className="text-white" />
        }
    }

    return (
        <Link to={path} className='p-4 border hover:border-cyan-dark rounded-md transition duration-300'>
            <div className="space-x-3 flex items-center">
                <div className={`cursor-pointer w-16 h-16 rounded-md p-4 ${SelectedColor()}`}>
                    {SelectedImage()}
                </div>
                <div className='cursor-pointer space-y-2'>
                    <h1 className='font-roboto font-bold text-lg m-auto'>{name}</h1>
                    <h1 className='font-roboto text-sm capitalize'>{subName}</h1>
                </div>
            </div>
        </Link>
    );
}
// Lib
import { useNavigate } from "react-router-dom";
import Hashids from 'hashids';
import { XIcon, SwitchHorizontalIcon, LinkIcon, RefreshIcon } from "@heroicons/react/solid";

// Redux Component
import { ListType } from "../../type";
import { DeleteList, GetListDetail } from "../../api/listRequest";


type ListProjectType = {
    list: ListType,
    FetchUserList: Function
}

export default function ListProject({ list, FetchUserList }: ListProjectType) {
    // --- Lib
    const hashids = new Hashids(process.env.REACT_APP_HASH_ID, 20);
    const Navigate = useNavigate();

    // --- Func
    async function OpenListProject() {
        const listProject: ListType = await GetListDetail(list.id);
        if (listProject.struct === null)
            Navigate(`/dashboard/struct/${list.type}/${hashids.encode(list.id)}`);
        else
            Navigate(`/editor/${hashids.encode(list.id)}`);
    }
    
    async function DeleteListData() {
        await DeleteList(list.id);
        FetchUserList();
    }

    // --- Render Component
    function SelectedColor() {
        switch (list.type) {
            case 'single':
                return 'bg-blue-light';
            case 'double':
                return 'bg-cyan-dark';
            case 'circular':
                return 'bg-cyan-light';
        }
    }

    function SelectedImage() {
        switch (list.type) {
            case 'single':
                return <LinkIcon className="text-white" />
            case 'double':
                return <SwitchHorizontalIcon className="text-white" />
            case 'circular':
                return <RefreshIcon className="text-white" />
        }
    }

    return (
        <div className='p-4 border hover:border-cyan-dark rounded-md flex justify-between items-center transition duration-300'>
            <div className="space-x-3 flex items-center">
                <div onClick={OpenListProject} className={`cursor-pointer w-16 h-16 rounded-md p-4 ${SelectedColor()}`}>
                    {SelectedImage()}
                </div>
                <div onClick={OpenListProject} className='cursor-pointer space-y-2'>
                    <h1 className='font-roboto font-bold text-lg m-auto'>{list.struct === null ? 'struct not created': list.struct.name}</h1>
                    <h1 className='font-roboto text-md capitalize'>{list.type} Linked List</h1>
                </div>
            </div>
            <div className='space-y-3'>
                <button className="float-right w-5 h-5 opacity-40" onClick={DeleteListData}><XIcon /></button>
                <br />
                <h1 className='opacity-40 font-roboto text-sm'>12 Februari 2022</h1>
            </div>
        </div>
    );
}
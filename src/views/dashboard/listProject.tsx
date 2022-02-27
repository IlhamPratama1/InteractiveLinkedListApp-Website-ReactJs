// Lib
import { useNavigate } from "react-router-dom";
import Hashids from 'hashids';

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
                return '/static/new_icon/link.png';
            case 'double':
                return '/static/new_icon/double.png';
            case 'circular':
                return '/static/new_icon/circular.png';
        }
    }

    return (
        <div className='p-4 border rounded-md flex space-x-4'>
            <div onClick={OpenListProject} className={`cursor-pointer w-16 h-16 rounded-md p-4 ${SelectedColor()}`}>
                <img  src={SelectedImage()} alt='project' />
            </div>
            <div onClick={OpenListProject} className='cursor-pointer space-y-2'>
                <h1 className='font-roboto font-bold text-lg m-auto'>{list.struct === null ? 'struct not created': list.struct.name}</h1>
                <h1 className='font-roboto text-md capitalize'>{list.type} Linked List</h1>
            </div>
            <div className='space-y-4'>
                <img onClick={DeleteListData} className='cursor-pointer float-right opacity-60 scale-50' src='/static/new_icon/cancel.png' alt='project' />
                <br />
                <h1 className='opacity-40 font-roboto text-sm'>12 Februari 2022</h1>
            </div>
        </div>
    );
}
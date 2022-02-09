import { useNavigate } from "react-router-dom";
import { ListType } from "../../type";
import Hashids from 'hashids';
import { DeleteList, GetListDetail } from "../../api/listRequest";

type ListProjectType = {
    index: number,
    list: ListType,
    FetchUserList: Function
}

export default function ListProject({ index, list, FetchUserList }: ListProjectType) {
    const hashids = new Hashids(process.env.REACT_APP_HASH_ID, 20);
    const Navigate = useNavigate();

    async function OpenListProject() {
        const listProject: ListType = await GetListDetail(list.id);
        if (listProject.struct === null)
            Navigate(`/struct/${list.type}/${hashids.encode(list.id)}`);
        else
            Navigate(`/editor/${hashids.encode(list.id)}`);
    }

    async function DeleteListData() {
        await DeleteList(list.id);
        FetchUserList();
    }

    return (
        <div key={index} className="py-4 px-6 border rounded-xl hover:border-yellow-main transition duration-300">
            <button onClick={OpenListProject}>
                <div className="flex justify-end w-auto">
                    <img className="w-4" src="/static/icons/plus.png" alt="plus" />
                </div>
                <div className="my-6 flex justify-center w-auto">
                    <img className="w-12" src="/static/icons/zip-folder.png" alt="single-link" />
                </div>
                <h1 className="font-source text-xl">Circular Linked-List</h1>
                <h2 className="font-source opacity-50 text-md">12 Maret 2022</h2>
            </button>
            <button onClick={DeleteListData} className="text-xs font-bold font-playfair py-3 px-7 bg-yellow-main hover:bg-yellow-second text-white-main hover:text-black-main transition duration-300">delete</button>
        </div>
    );
}